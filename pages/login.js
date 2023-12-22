import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';


// Configure FirebaseUI
const REDIRECT_PAGE = "/dashboard";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: REDIRECT_PAGE,
  // able to log In with email and google
  SignInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function login() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  return (
    <div>
      <Head>
        <title>Log In to Grandmaly</title>
      </Head>
      <main>
        <Container>
          <h1>Hello, LogIn Page!</h1>
          {/* <button type="button" onClick={() => router.push("/")}>
            back
          </button> */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setLogin(true)}
          >
            Login / Regist
          </Button>
          <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Dialog>
        </Container>
      </main>
    </div>
  );
}
