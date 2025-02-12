import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const MonthView = ({ onDateClick, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getTasksByDate, deleteTask } = useTaskContext();
  const [hoveredTask, setHoveredTask] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleTaskClick = (e, task) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="space-x-2">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center py-2 text-gray-400 font-medium">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-gray-800 ${
              day ? 'cursor-pointer hover:bg-gray-800' : 'bg-gray-900'
            }`}
            onClick={(e) => day && onDateClick(day, e)}
          >
            {day && (
              <>
                <div className={`text-sm ${
                  day.toDateString() === new Date().toDateString()
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-400'
                }`}>
                  {day.getDate()}
                </div>
                <div className="mt-1">
                  {getTasksByDate(day).map(task => (
                    <div
                      key={task.id}
                      className={`relative group ${task.bgColor} text-white text-xs p-1 mb-1 rounded`}
                      onClick={(e) => handleTaskClick(e, task)}
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <div className="truncate">
                        {task.time} {task.title}
                      </div>
                      
                      {/* Task Details Tooltip */}
                      {hoveredTask === task.id && (
                        <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white p-2 rounded shadow-lg z-50 w-48">
                          <div className="font-medium mb-1">{task.title}</div>
                          <div className="text-gray-300 text-xs mb-2">{task.description}</div>
                          <div className="text-gray-300 text-xs">{task.time}</div>
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskClick(task, e);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView; 