import './App.css'; import { ThemeProvider } from '@mui/material/styles'; import { createCustomTheme } from './components/MUITheme'; import LoginPage from './pages/LoginPage'; import { BrowserRouter } from 'react-router-dom'; import {Route, Routes} from 'react-router-dom'; import NormalUserLayout from "./layouts/NormalUserLayout"; import BatteryPage from "./components/BatteryPage";
import VCUpage from "./components/VCUpage";
import DeveloperPage from "./components/DeveloperPage";
import SearchPage from "./pages/SearchPage";
import { useEffect, useState } from 'react';

function App() {
  const [mode, setMode] = useState(true);

  useEffect(() => {
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
  
  return (
    <ThemeProvider theme={createCustomTheme(mode)}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<NormalUserLayout />} />
          <Route path="/VCUpage" element={<VCUpage />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route path="/batteryPage" element={<BatteryPage />} />
          <Route path="/developerPage" element={<DeveloperPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
