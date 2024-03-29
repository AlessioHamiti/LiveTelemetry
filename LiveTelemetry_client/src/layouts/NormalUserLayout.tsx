import * as React from 'react';
import { styled, createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { MainListItems } from '../components/DrawerItems';
import {AccountCircle, CenterFocusStrong, Dashboard} from "@mui/icons-material";
import Button from "@mui/material/Button";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardPage from '../pages/DashboardPage';
import SearchPage from '../pages/SearchPage';
import { Console } from 'console';
import { createCustomTheme } from '../components/MUITheme';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import VCUIcon from '@mui/icons-material/Memory';
import SearchIcon from '@mui/icons-material/Search';
import TerminalIcon from '@mui/icons-material/Terminal';



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open = false }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

let isLightMode:boolean = true;

export default function NormalUserLayout() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState(true);
  const [page, setPage] = React.useState(<DashboardPage/>);
  const [icon, setIcon] = React.useState(<LightModeIcon/>);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const theme2 = createCustomTheme(isDarkMode);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const updateMode = (event: { matches: any; }) => {
      const colorScheme = event.matches ? 'dark' : 'light';
      setMode(colorScheme === 'dark');
    };

    mediaQueryList.addEventListener('change', updateMode);

    // Set the initial mode based on the user's system preference
    setMode(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', updateMode);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    isLightMode = !isLightMode;
    if(isLightMode)
    {
      setIcon(<LightModeIcon/>);
    }
    else {
      setIcon(<DarkModeIcon/>);
    }
  };

  const handlePageChange = (event: React.MouseEvent<HTMLElement>, pg: any) => {
    setPage(pg);
  };

  const hanfleLogOut = (event: React.MouseEvent<HTMLElement>) => {
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={mode}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </div>
            <SearchBar setPage={setPage}/>
          <div>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {icon}
            </IconButton>
            <IconButton onClick={hanfleLogOut} color="inherit">
              <LogoutIcon/>
            </IconButton>
          </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            
          <ListItemButton onClick={(event) => handlePageChange(event, <DashboardPage/>)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handlePageChange(event, <DashboardPage/>)}>
            <ListItemIcon>
              <BatteryFullIcon />
            </ListItemIcon>
            <ListItemText primary="Battery" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handlePageChange(event, <DashboardPage/>)}>
            <ListItemIcon>
              <VCUIcon />
            </ListItemIcon>
            <ListItemText primary="VCU" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handlePageChange(event, <SearchPage/>)}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handlePageChange(event, <DashboardPage/>)}>
            <ListItemIcon>
              <TerminalIcon />
            </ListItemIcon>
            <ListItemText primary="Developer" />
          </ListItemButton>

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[800],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
                {page}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
