import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Statistics() {
  const [userCount, setUserCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://54.159.171.255:8800/api/users/count');
        setUserCount(response.data.count); 
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get('http://54.159.171.255:8800/api/users/monthly-count');
        setMonthlyData(response.data); 
      } catch (error) {
        console.error('Error fetching monthly user count:', error);
      }
    };

    fetchUserCount();
    fetchMonthlyData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%', p: 2, border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom>
            <LocalParkingIcon /> Users <span style={{ float: 'right' }}>{userCount}</span>
          </Typography>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 400, p: 2, mt: 3, border: '1px solid #ddd', borderRadius: 1, boxShadow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" gutterBottom align="center">
            Users Statistics
          </Typography>
          <Example data={monthlyData} />
        </Box>
      </Grid>
    </Grid>
  );
}

class Example extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#C8C8C8" fill="grey" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
