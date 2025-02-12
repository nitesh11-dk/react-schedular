import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = ({ selectedDate, task, onClose, position }) => {
  const { addTask, updateTask } = useTaskContext();
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
  }, [task, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const formStyle = position ? {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    transform: 'translate(-50%, -50%)',
    zIndex: 50
  } : {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
        style={formStyle}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          {task ? 'Edit Task' : 'Add Task'}
        </h3>
        
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
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            {task ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 