import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  color: white;
  text-align: center;
  font-size: 24px;
`;

const App = () => {
  return (
    <Router>
      <StyledLayout>
        <StyledHeader>Todo List Application</StyledHeader>
        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:taskId" element={<TaskDetail />} />
          </Routes>
        </Content>
      </StyledLayout>
    </Router>
  );
};

export default App;
