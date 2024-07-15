import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';
import { Select } from 'antd';

const StatusFilter = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.tasks.filter.status);

  const handleChange = (value) => {
    dispatch(setFilter({ status: value }));
  };

  return (
    <Select value={status} onChange={handleChange}>
      <Select.Option value="All">All</Select.Option>
      <Select.Option value="Incomplete">Incomplete</Select.Option>
      <Select.Option value="Complete">Complete</Select.Option>
    </Select>
  );
};

export default StatusFilter;
