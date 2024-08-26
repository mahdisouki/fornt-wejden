import React, { useEffect, useRef, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import GroupIcon from '@mui/icons-material/Group';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ApexCharts from 'apexcharts';

const data = [
  { name: 'Mai', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Juin', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Juillet', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Aout', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'september', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'October', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'November', uv: 3490, pv: 4300, amt: 2100 },
];

export default function Statistics() {
  const [parkingsCount, setParkingsCount] = useState(0);
  const [reservationsCount, setReservationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0); // State for users count
  const [reservationStats, setReservationStats] = useState([]); 
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('http://54.159.171.255:8800/api/parks/count')
      .then(response => {
        setParkingsCount(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the parking count!', error);
      });

    axios.get('http://54.159.171.255:8800/api/reservations/count')
      .then(response => {
        setReservationsCount(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the reservations count!', error);
      });

    axios.get('http://54.159.171.255:8800/api/reservations/monthly-count')
      .then(response => {
        setReservationStats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the reservation stats!', error);
      });

    axios.get('http://54.159.171.255:8800/api/users/count')
      .then(response => {
        setUsersCount(response.data.count);
      })
      .catch(error => {
        console.error('There was an error fetching the users count!', error);
      });

    const options = {
      series: [44, 55, 41],
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%', p: 2, border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom>
            <GroupIcon /> Users <span style={{ float: 'right' }}>{usersCount}</span>
          </Typography>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%', p: 2, border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom>
            <LocalParkingIcon /> Parkings <span style={{ float: 'right' }}>{parkingsCount}</span>
          </Typography>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ height: '100%', p: 2, border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            <LoyaltyIcon /> Reservations
          </Typography>
          <Typography variant="h3">{reservationsCount}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ height: 400, p: 2, mt: 3, border: '1px solid #ddd', borderRadius: 1, boxShadow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" gutterBottom align="center">
            Reservations Stat
          </Typography>
          <Example data={reservationStats} /> 
        </Box>
      </Grid>
      <Grid item xs={7} md={4}>
        <Box sx={{ height: 400, p: 2, mt: 3, border: '1px solid #ddd', borderRadius: 1, boxShadow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" gutterBottom align="center">
            User's monthly
          </Typography>
          <div ref={chartRef} style={{ height: '100%' }}></div>
        </Box>
      </Grid>
    </Grid>
  );
}

class Example extends React.PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/area-chart-in-responsive-container-y5m29r';

  render() {
    const { data } = this.props; // Receive data as a prop

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
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#C8C8C8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
