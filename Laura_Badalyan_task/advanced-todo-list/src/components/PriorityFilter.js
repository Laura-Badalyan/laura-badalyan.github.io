import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';
import { Select } from 'antd';

const PriorityFilter = () => {
  const dispatch = useDispatch();
  const priority = useSelector(state => state.tasks.filter.priority);

  const handleChange = (value) => {
    dispatch(setFilter({ priority: value }));
  };

  return (
    <Select value={priority} onChange={handleChange}>
      <Select.Option value="All">All</Select.Option>
      <Select.Option value="High">High</Select.Option>
      <Select.Option value="Medium">Medium</Select.Option>
      <Select.Option value="Low">Low</Select.Option>
    </Select>
  );
};

export default PriorityFilter;
