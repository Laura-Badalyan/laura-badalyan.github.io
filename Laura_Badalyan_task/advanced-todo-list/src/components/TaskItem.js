import React from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/tasksSlice';
import styled from 'styled-components';

const TaskCard = styled(Card)`
  margin: 10px 0;
`;

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <TaskCard>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <Button onClick={handleDelete}>Delete</Button>
    </TaskCard>
  );
};

export default TaskItem;
