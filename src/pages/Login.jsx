import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #CEC9F2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #CEC9F2;
  }
`;

const RegisterLink = styled(Link)`
  margin-top: 15px;
  color: #CEC9F2;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://54.158.208.20:8800/api/auth/login/proprietere', {
        email: email,
        password: password,
      });
      localStorage.setItem('user',JSON.stringify(response.data.user))


      if(response.data.user.role.name === "admin")  navigate('/dashboard'); 
      else {
        navigate('/proprietaire')
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('Failed to login.');
    }
  };

  return (
    <LoginContainer>
      <Title>Login </Title>
      <Form onSubmit={handleLogin}>
        <FormField>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>
        <Button type="submit">Login</Button>
      </Form>
      <RegisterLink to="/register">Don't have an account? Register here</RegisterLink>
    </LoginContainer>
  );
}

export default Login;
