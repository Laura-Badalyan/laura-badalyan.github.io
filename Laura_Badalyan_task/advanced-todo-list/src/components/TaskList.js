import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, reorderTasks } from '../features/tasks/tasksSlice';
import TaskForm from './TaskForm';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import './TaskList.css';

const StyledList = styled(List)`
  margin-top: 20px;
`;

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const dispatch = useDispatch();
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = tasks.filter(task => {
    return (
      (filter.category === 'All' || task.category === filter.category) &&
      (filter.priority === 'All' || task.priority === filter.priority) &&
      (filter.status === 'All' || task.status === filter.status)
    );
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <div>
      <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <TransitionGroup>
                {filteredTasks.map((task, index) => (
                  <CSSTransition key={task.id} timeout={500} classNames="task">
                    <Draggable draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <StyledList.Item
                            actions={[
                              <Button type="link" onClick={() => setTaskToEdit(task)}>Edit</Button>,
                              <Button type="link" danger onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>,
                              <Button type="link">
                                <Link to={`/task/${task.id}`}>View</Link>
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              title={task.title}
                              description={`${task.description} - ${task.category} - ${task.priority} - ${task.status}`}
                            />
                          </StyledList.Item>
                        </div>
                      )}
                    </Draggable>
                  </CSSTransition>
                ))}
                {provided.placeholder}
              </TransitionGroup>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
