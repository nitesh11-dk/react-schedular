import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialTasks = [
  {
    id: uuidv4(),
    title: 'Team Meeting-45',
    description: 'Weekly sync with the development team',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: '11:00',
    bgColor: 'bg-green-500'
  },
  {
    id: uuidv4(),
    title: 'Team Meeting',
    description: 'Weekly sync with the development team',
    date: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    time: '11:00',
    bgColor: 'bg-blue-500'
  },
  {
    id: uuidv4(),
    title: 'Project Review',
    description: 'Review Q1 project milestones',
    date: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    time: '14:00',
    bgColor: 'bg-purple-500'
  },
  {
    id: uuidv4(),
    title: 'Client Call',
    description: 'Product demo with client',
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    time: '11:00',
    bgColor: 'bg-green-500'
  },
  {
    id: uuidv4(),
    title: 'Planning Session',
    description: 'Sprint planning for next week',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: '09:00',
    bgColor: 'bg-yellow-500'
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: uuidv4() }]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date).toDateString();
      const compareDate = new Date(date).toDateString();
      return taskDate === compareDate;
    });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTasksByDate
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 