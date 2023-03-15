
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
function App() {
  const [darkMode,setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ?'dark':'light',
      background:{
        default:darkMode ?"#121212" : '#eaeaea'
      }
    }
  })
  function hundleThemeChange(){
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode ={darkMode} hundleThemeChange={hundleThemeChange}  />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
