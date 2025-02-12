import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const WeekView = ({ onSlotClick, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getTasksByDate, deleteTask } = useTaskContext();
  const [hoveredTask, setHoveredTask] = useState(null);

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getTasksForDateAndHour = (date, hour) => {
    const tasks = getTasksByDate(date);
    return tasks.filter(task => {
      const taskHour = parseInt(task.time.split(':')[0]);
      return taskHour === hour;
    });
  };

  const handleTaskClick = (e, task) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {weekDays[0].toLocaleDateString('default', { month: 'long', day: 'numeric' })} - 
          {weekDays[6].toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
        </h2>
        <div className="space-x-2">
          <button
            onClick={handlePrevWeek}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            ←
          </button>
          <button
            onClick={handleNextWeek}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-20 flex-shrink-0">
          <div className="h-10"></div>
          {hours.map(hour => (
            <div key={hour} className="h-20 border-t border-gray-800 text-gray-400 text-sm pr-2 text-right">
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[700px]">
            {weekDays.map(day => (
              <div key={day.toISOString()} className="text-center">
                <div className={`h-10 px-2 py-2 text-sm font-medium ${
                  day.toDateString() === new Date().toDateString()
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}>
                  {day.toLocaleDateString('default', { weekday: 'short' })} {day.getDate()}
                </div>
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="h-20 border-t border-l border-gray-800 relative group"
                    onClick={(e) => {
                      const date = new Date(day);
                      date.setHours(hour);
                      onSlotClick(date, e);
                    }}
                  >
                    {getTasksForDateAndHour(day, hour).map(task => (
                      <div
                        key={task.id}
                        className={`relative group ${task.bgColor} text-white text-xs p-1 rounded overflow-hidden mx-1`}
                        onClick={(e) => handleTaskClick(e, task)}
                        onMouseEnter={() => setHoveredTask(task.id)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        <div className="truncate">
                          {task.title}
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
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView; 