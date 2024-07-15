import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';
import { Select } from 'antd';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.tasks.filter.category);

  const handleChange = (value) => {
    dispatch(setFilter({ category: value }));
  };

  return (
    <Select value={category} onChange={handleChange}>
      <Select.Option value="All">All</Select.Option>
      <Select.Option value="General">General</Select.Option>
      <Select.Option value="Work">Work</Select.Option>
      <Select.Option value="Personal">Personal</Select.Option>
    </Select>
  );
};

export default CategoryFilter;
