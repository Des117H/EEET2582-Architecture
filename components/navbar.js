import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import styles from '../styles/css/navbar.module.css';

export default function NavBar() {
	const { authUser, signOut } = useAuth();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className={styles.appbar}>
				<Toolbar className={styles.toolbar}>
					<Container className={styles.container}>
						<Typography variant="h3" sx={{ flexGrow: 1, alignSelf: "center" }}>
							EXPENSE TRACKER
						</Typography>
						<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
							<Typography variant="h6" sx={{ flexGrow: 1 }}>
								{authUser?.email}
							</Typography>
							<Button variant="text" color="secondary" onClick={signOut}>
								Logout
							</Button>
						</Stack>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
}