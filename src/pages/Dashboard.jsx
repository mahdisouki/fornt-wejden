import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
`;

const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(()=> {
      const  user = JSON.parse(localStorage.getItem('user'))
      if(user.role.name !== "admin")
        navigate('/login')
    },)

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <h1>Dashboard</h1>
        {/* Add your main dashboard content here */}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
