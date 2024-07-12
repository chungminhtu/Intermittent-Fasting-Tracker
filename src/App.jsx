import React, { useState, useEffect } from 'react';
import { Clock, Play, Info, History, StopCircle, Trash2 } from 'lucide-react';
import { translations } from './translations';

const FastingTracker = () => {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [duration, setDuration] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState('en');
  const [history, setHistory] = useState([]);
  const [loadedFromHistory, setLoadedFromHistory] = useState(false);

  useEffect(() => {
    let timer;
    if (isTracking) {
      updateDuration();
      timer = setInterval(updateDuration, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, startDateTime, endDateTime]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('fastingHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const updateDuration = () => {
    if (!startDateTime) return;
    const start = new Date(startDateTime);
    const end = endDateTime ? new Date(endDateTime) : new Date();
    const diff = end - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setDuration({ days, hours, minutes, seconds });
  };

  const handleStartTimeChange = (e) => {
    setStartDateTime(e.target.value);
    setIsTracking(false);
    setDuration(null);
  };

  const handleEndTimeChange = (e) => {
    setEndDateTime(e.target.value);
    setIsTracking(false);
    setDuration(null);
  };

  const handleCalculateClick = () => {
    if (!startDateTime) {
      const now = new Date().toISOString().slice(0, 16);
      setStartDateTime(now);
    }
    setIsTracking(true);
    setEndDateTime('');
  };

  const handleStopTracking = () => {
    const end = new Date().toISOString().slice(0, 16);
    setEndDateTime(end);
    const session = { start: startDateTime, end };
    const updatedHistory = [...history, session];
    localStorage.setItem('fastingHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setIsTracking(false);
  };

  const formatDuration = () => {
    if (!duration) return '';
    const { days, hours, minutes, seconds } = duration;
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const getTotalHours = () => {
    if (!duration) return 0;
    return duration.days * 24 + duration.hours + duration.minutes / 60 + duration.seconds / 3600;
  };

  const getCurrentState = (hours) => {
    const states = translations[language].states;
    for (let i = states.length - 1; i >= 0; i--) {
      if (hours >= states[i].hours) {
        return states[i].state;
      }
    }
    return 'Fasting started';
  };

  const handleEdit = (index, newStart, newEnd) => {
    const updatedHistory = history.map((session, i) => (
      i === index ? { start: newStart, end: newEnd } : session
    ));
    setHistory(updatedHistory);
    localStorage.setItem('fastingHistory', JSON.stringify(updatedHistory));
  };

  const loadFastingSession = (session) => {
    setStartDateTime(session.start);
    setEndDateTime(session.end);
    const start = new Date(session.start);
    const end = new Date(session.end);
    const diff = end - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setDuration({ days, hours, minutes, seconds });
    setIsTracking(false);
    setLoadedFromHistory(true);
  };

  const clearLoadedSession = () => {
    setStartDateTime('');
    setEndDateTime('');
    setDuration(null);
    setLoadedFromHistory(false);
  };

  const deleteSession = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('fastingHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-300 text-green-800 p-4">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-6xl">
        <div className="flex justify-end mb-4">
          <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded ${language === 'en' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>English</button>
          <button onClick={() => setLanguage('vi')} className={`ml-2 px-4 py-2 rounded ${language === 'vi' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Tiếng Việt</button>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-center">{translations[language].title}</h1>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Clock className="mr-2 flex-shrink-0" />
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={handleStartTimeChange}
              className="p-2 border rounded flex-grow text-lg"
            />
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={handleEndTimeChange}
              className="p-2 border rounded flex-grow text-lg ml-4"
              disabled={!isTracking}
            />
          </div>
          {!loadedFromHistory && (
            <button
              onClick={isTracking ? handleStopTracking : handleCalculateClick}
              className={`w-full text-white font-bold py-3 px-4 rounded-full flex items-center justify-center text-xl ${isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isTracking ? <StopCircle className="mr-2" /> : <Play className="mr-2" />}
              {isTracking ? translations[language].stopTracking : translations[language].startTracking}
            </button>
          )}
          {loadedFromHistory && (
            <button
              onClick={clearLoadedSession}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center text-xl"
            >
              Clear Loaded Session
            </button>
          )}
        </div>

        {duration && (
          <div className="text-center mb-6">
            <p className="text-xl mb-2">{translations[language].fastingFor}</p>
            <p className="text-3xl font-bold mb-2">{formatDuration()}</p>
            <p className="text-2xl font-semibold">{translations[language].currentState}: {getCurrentState(getTotalHours())}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-200">
                <th className="p-2 border">{translations[language].hours}</th>
                <th className="p-2 border">{translations[language].fastingState}</th>
                <th className="p-2 border">{translations[language].benefit}</th>
                <th className="p-2 border">{translations[language].details}</th>
                <th className="p-2 border">{translations[language].percentage}</th>
              </tr>
            </thead>
            <tbody>
              {translations[language].states.map((state, index) => (
                <tr key={index} className={getCurrentState(getTotalHours()) === state.state ? 'bg-yellow-200' : ''}>
                  <td className="p-2 border">{state.hours}</td>
                  <td className="p-2 border">{state.state}</td>
                  <td className="p-2 border">{state.benefit}</td>
                  <td className="p-2 border">{state.details}</td>
                  <td className="p-2 border">{state.fatBurnPercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <Info className="inline mr-2" />
            {translations[language].fastingTips}
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <History className="inline mr-2" />
            View History
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{translations[language].fastingTips}</h2>
            <ul className="list-disc list-inside mb-4">
              {translations[language].tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {translations[language].close}
            </button>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Fasting History</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-200">
                  <th className="p-2 border">Start Time</th>
                  <th className="p-2 border">End Time</th>
                  <th className="p-2 border">Duration</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((session, index) => {
                  const start = new Date(session.start);
                  const end = new Date(session.end);
                  const durationHours = (end - start) / (1000 * 60 * 60);
                  const formattedDuration = `${Math.floor(durationHours)} hours, ${Math.floor((durationHours % 1) * 60)} minutes`;

                  return (
                    <tr key={index}>
                      <td className="p-2 border">
                        <input
                          type="datetime-local"
                          value={new Date(session.start).toISOString().slice(0, 16)}
                          onChange={(e) => handleEdit(index, e.target.value, session.end)}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="datetime-local"
                          value={new Date(session.end).toISOString().slice(0, 16)}
                          onChange={(e) => handleEdit(index, session.start, e.target.value)}
                          className="p-2 border rounded w-full"
                        />
                      </td>
                      <td className="p-2 border">{formattedDuration}</td>
                      <td className="p-2 border flex">
                        <button
                          onClick={() => loadFastingSession(session)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteSession(index)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                          <Trash2 className="inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={() => setShowHistory(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {translations[language].close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FastingTracker;
