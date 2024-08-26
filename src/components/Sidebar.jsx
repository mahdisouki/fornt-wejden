import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #CEC9F2;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 0;
  &:hover {
    background-color: #ABA6D6;
  }
`;

const LogoutLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 0;
  margin-top: auto;
  &:hover {
    background-color: #ABA6D6;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>Smart Parking</h2>
      <SidebarLink to="/dashboard">Dashboard</SidebarLink>
      <SidebarLink to="/register">Register</SidebarLink>
      <SidebarLink to="/login">Login</SidebarLink>
      <SidebarLink to="/parking">Parking</SidebarLink>
      {/* Add more links as needed */}
      <LogoutLink to="/logout">Logout</LogoutLink>
    </SidebarContainer>
  );
};

export default Sidebar;
