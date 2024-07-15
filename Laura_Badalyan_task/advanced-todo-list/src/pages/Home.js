import React from 'react';
import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import PriorityFilter from '../components/PriorityFilter';
import StatusFilter from '../components/StatusFilter';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header>Todo List</Header>
      <Content>
        <CategoryFilter />
        <PriorityFilter />
        <StatusFilter />
        <TaskList />
      </Content>
    </Layout>
  );
};

export default Home;
