import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage', err);
  }
};

const initialState = loadState() || {
  tasks: [],
  filter: {
    category: 'All',
    priority: 'All',
    status: 'All',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveState(state);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = action.payload;
      saveState(state);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveState(state);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      saveState(state);
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      saveState(state);
    }
  },
});

export const { addTask, editTask, deleteTask, setFilter, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
