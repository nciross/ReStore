
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider, useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLaoding] = useState(false)
  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      setLaoding(true);
      agent.Basket.get().then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLaoding(false))
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? "#121212" : '#eaeaea'
      }
    }
  })
  function hundleThemeChange() {
    setDarkMode(!darkMode)
  }
  if(loading) return <LoadingComponent message='Initilization App ...'/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} hundleThemeChange={hundleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
