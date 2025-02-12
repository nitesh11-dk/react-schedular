import React, { useState, useEffect, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = ({ selectedDate, task, onClose, position }) => {
  const { addTask, updateTask } = useTaskContext();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '10:00',
    bgColor: 'bg-blue-500'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        date: new Date(task.date).toISOString().split('T')[0],
        time: task.time,
        bgColor: task.bgColor
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: new Date(selectedDate).toISOString().split('T')[0],
        time: new Date(selectedDate).getHours().toString().padStart(2, '0') + ':00'
      }));
    }

    // Add event listener for clicking outside
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [task, selectedDate, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const taskData = {
      ...formData,
      date: new Date(formData.date + 'T' + formData.time).toISOString()
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500'
  ];

  // Calculate form position
  let formStyle = {
    position: 'fixed',
    zIndex: 1000,
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
  };

  if (position) {
    // If position is provided, position the form near the clicked location
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const formHeight = 420; // Approximate form height
    const formWidth = 384; // w-96 = 24rem = 384px

    let top = position.y;
    let left = position.x;

    // Adjust vertical position if form would go off screen
    if (top + formHeight > viewportHeight) {
      top = Math.max(20, viewportHeight - formHeight - 20);
    }

    // Adjust horizontal position if form would go off screen
    if (left + formWidth > viewportWidth) {
      left = Math.max(20, viewportWidth - formWidth - 20);
    }

    formStyle = {
      ...formStyle,
      top: `${top}px`,
      left: `${left}px`,
      transform: 'translate(-50%, -50%)'
    };
  } else {
    // Center the form if no position is provided
    formStyle = {
      ...formStyle,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
  }

  return (
    <form
      ref={formRef}
      className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto"
      style={formStyle}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {task ? 'Edit Task' : 'Add Task'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Color</label>
          <div className="flex space-x-2">
            {colors.map(color => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full ${color} ${
                  formData.bgColor === color ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => setFormData({ ...formData, bgColor: color })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
        >
          {task ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 