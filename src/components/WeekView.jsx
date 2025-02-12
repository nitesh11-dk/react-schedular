import React, { useState, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';

const WeekView = ({ onSlotClick, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getTasksByDate, deleteTask } = useTaskContext();
  const [hoveredTask, setHoveredTask] = useState(null);
  const calendarRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const getWeekDays = (date) => {
    const start = new Date(date);
    // Ensure we start from Sunday and maintain the exact time
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

  const formatTime = (hour, minute = 0) => {
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: minute ? 'numeric' : undefined,
      hour12: true
    }).replace(/\s/g, '');
  };

  const getTasksForDateAndHour = (date, hour) => {
    const tasks = getTasksByDate(date);
    return tasks.filter(task => {
      const taskTime = task.time.split(':');
      const taskHour = parseInt(taskTime[0]);
      return taskHour === hour;
    });
  };

  const handleTimeSlotClick = (date, hour, e) => {
    const selectedDate = new Date(date.getTime());
    selectedDate.setHours(hour);
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    onSlotClick(selectedDate, e);
  };

  const handleTaskHover = (e, task, isEnter) => {
    e.stopPropagation();
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (isEnter) {
      const taskElement = e.currentTarget;
      const rect = taskElement.getBoundingClientRect();
      const tooltipWidth = 192; // w-48 = 12rem = 192px
      
      // Position the tooltip relative to the task element
      let left = rect.left;
      let top = rect.bottom + 4; // 4px gap
      
      // Check if tooltip would go off the right edge of the screen
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 16; // 16px padding
      }
      
      // Check if tooltip would go off the bottom of the screen
      const tooltipHeight = 150; // Approximate height of tooltip
      if (top + tooltipHeight > window.innerHeight) {
        top = rect.top - tooltipHeight - 4; // Position above the task
      }
      
      taskElement.style.zIndex = '50';
      setHoveredTask({
        id: task.id,
        position: { left, top }
      });
    } else {
      // Add a small delay before hiding the tooltip
      hoverTimeoutRef.current = setTimeout(() => {
        e.currentTarget.style.zIndex = '';
        setHoveredTask(null);
      }, 50); // 300ms delay
    }
  };

  const handleTooltipHover = (isEnter) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (!isEnter) {
      // Only hide after a delay when leaving the tooltip
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredTask(null);
          }, 50);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
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

      <div className="flex h-[calc(100vh-200px)] overflow-y-auto" ref={calendarRef}>
        <div className="w-20 flex-shrink-0 bg-gray-900 sticky left-0 z-20">
          <div className="h-10 bg-gray-900"></div>
          {hours.map(hour => (
            <div key={hour} className="h-20 border-t border-gray-800 text-gray-400 text-sm pr-2 text-right">
              {formatTime(hour)}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-7 min-w-[700px]">
            {weekDays.map(day => (
              <div key={day.toISOString()} className="text-center">
                <div className={`h-10 px-2 py-2 text-sm font-medium sticky top-0 bg-gray-900 z-10 ${
                  day.toDateString() === new Date().toDateString()
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}>
                  {day.toLocaleDateString('default', { weekday: 'short' })} {day.getDate()}
                </div>
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="h-20 border-t border-l border-gray-800 relative group hover:bg-gray-800/30"
                    onClick={(e) => handleTimeSlotClick(day, hour, e)}
                  >
                    {getTasksForDateAndHour(day, hour).map(task => (
                      <div
                        key={task.id}
                        className={`relative group cursor-pointer ${task.bgColor} text-white text-xs p-1 rounded overflow-hidden mx-1 hover:ring-2 hover:ring-white hover:shadow-lg transition-all duration-150`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskClick(task, e);
                        }}
                        onMouseEnter={(e) => handleTaskHover(e, task, true)}
                        onMouseLeave={(e) => handleTaskHover(e, task, false)}
                      >
                        <div className="truncate">
                          {formatTime(parseInt(task.time.split(':')[0]))} {task.title}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip Portal */}
      {hoveredTask && (
        <div 
          className="fixed bg-gray-800 text-white p-2 rounded shadow-lg z-[100] w-48"
          style={{
            left: `${hoveredTask.position.left}px`,
            top: `${hoveredTask.position.top}px`
          }}
          onMouseEnter={() => handleTooltipHover(true)}
          onMouseLeave={() => handleTooltipHover(false)}
        >
          {(() => {
            const task = getTasksByDate(weekDays[0]).find(t => t.id === hoveredTask.id) ||
                        weekDays.slice(1).reduce((found, day) => 
                          found || getTasksByDate(day).find(t => t.id === hoveredTask.id), null);
            
            return task ? (
              <>
                <div className="font-medium mb-1">{task.title}</div>
                <div className="text-gray-300 text-xs mb-2">{task.description}</div>
                <div className="text-gray-300 text-xs">{formatTime(parseInt(task.time.split(':')[0]))}</div>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task, e);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this task?')) {
                        deleteTask(task.id);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : null
          })()}
        </div>
      )}
    </div>
  );
};

export default WeekView; 