import { AuthUserProvider } from '../firebase/auth';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme.js';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/global.css';

export default function App({ Component, pageProps }) {
	return (
		<AuthUserProvider>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthUserProvider>
	);
}