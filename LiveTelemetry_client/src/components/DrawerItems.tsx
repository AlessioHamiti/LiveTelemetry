import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import VCUIcon from '@mui/icons-material/Memory';
import SearchIcon from '@mui/icons-material/Search';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useNavigate } from 'react-router-dom';



export const MainListItems = () => {
  const navigate = useNavigate();

  return (

  <React.Fragment>
    <ListItemButton onClick={() => navigate('/batteryPage')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/batteryPage')}>
      <ListItemIcon>
        <BatteryFullIcon />
      </ListItemIcon>
      <ListItemText primary="Battery" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/VCUpage')}>
      <ListItemIcon>
        <VCUIcon />
      </ListItemIcon>
      <ListItemText primary="VCU" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/searchPage')}>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/developerPage')}>
      <ListItemIcon>
        <TerminalIcon />
      </ListItemIcon>
      <ListItemText primary="Developer" />
    </ListItemButton>
  </React.Fragment>

  );
};