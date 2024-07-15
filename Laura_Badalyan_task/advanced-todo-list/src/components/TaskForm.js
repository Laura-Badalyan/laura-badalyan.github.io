import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Select } from 'antd';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (taskToEdit) {
      form.setFieldsValue(taskToEdit);
    } else {
      form.resetFields();
    }
  }, [taskToEdit, form]);

  const onFinish = (values) => {
    if (taskToEdit) {
      dispatch(editTask({ ...values, id: taskToEdit.id }));
      setTaskToEdit(null);
    } else {
      dispatch(addTask({ ...values, id: uuidv4() }));
    }
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setTaskToEdit(null);
  };

  return (
    <StyledForm form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
        <Select>
          <Select.Option value="Work">Work</Select.Option>
          <Select.Option value="Personal">Personal</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="priority" label="Priority">
        <Select>
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select>
          <Select.Option value="Incomplete">Incomplete</Select.Option>
          <Select.Option value="Complete">Complete</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </Button>
        {taskToEdit && (
          <Button type="default" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </StyledForm>
  );
};

export default TaskForm;
