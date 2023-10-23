import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    if (username.trim() !== '' && password.trim() !== '') {
        console.log('Login successful!');
        navigate('/dashboard'); // Navigate to the other page
    } else {
        console.log('Invalid credentials');
    }
  };

  return (
    <Box elevation={3} sx={{ p: 2, maxWidth: '400px', margin: '0 auto', marginTop: '200px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Swayam Admin Login
      </Typography>
      <Box my={2}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box my={2}>
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
