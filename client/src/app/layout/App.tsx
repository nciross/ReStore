
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode ={darkMode} hundleThemeChange={hundleThemeChange}  />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
