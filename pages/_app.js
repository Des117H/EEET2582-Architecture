import { AuthUserProvider } from '../firebase/auth';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme.js';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <AuthUserProvider>
        
      <ThemeProvider theme={theme}>
        
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserProvider>
    // </LocalizationProvider>);
  );
}