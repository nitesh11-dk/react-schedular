import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import TaskForm from './components/TaskForm';

const App = () => {
  const [view, setView] = useState('month');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formPosition, setFormPosition] = useState(null);

  const handleDateClick = (date, event) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setFormPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    } else {
      setFormPosition(null);
    }
    setSelectedDate(date);
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleTaskClick = (task, event) => {
    event.stopPropagation();
    setSelectedTask(task);
    setSelectedDate(new Date(task.date));
    setShowTaskForm(true);
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="space-x-2">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded ${
                  view === 'month'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded ${
                  view === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Week
              </button>
            </div>
          </div>

          {view === 'month' ? (
            <MonthView onDateClick={handleDateClick} onTaskClick={handleTaskClick} />
          ) : (
            <WeekView onSlotClick={handleDateClick} onTaskClick={handleTaskClick} />
          )}

          {showTaskForm && (
            <TaskForm
              selectedDate={selectedDate}
              task={selectedTask}
              position={formPosition}
              onClose={() => {
                setShowTaskForm(false);
                setSelectedTask(null);
                setSelectedDate(null);
                setFormPosition(null);
              }}
            />
          )}
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;
