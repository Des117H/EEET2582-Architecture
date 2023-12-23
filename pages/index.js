"use client";

import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';
import styles from '../styles/global.module.css';



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

const Welcome = () => {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();
  const [login, setLogin] = useState(false);

  return (
    <div>
      <header>
        <AppHeader />
      </header>
      <main>
        <Stack direction='horizontal' gap={10}>
          <div className='p-2'></div>
          <Container className="description p-2">
            <div className="text-box" >

              <h1>
                Text with love,
                <br />
                like your <span className={styles.title}> <b>Grandma</b></span>
              </h1>
              <p className={styles.description}>
              <b>Grandmaly is an AI system designed to correct English manuscript errors, including grammar, typos, and punctuation. </b>
                <br/>
                <i> Simply upload a doc or docx file, and download the corrected version. Create an account for subscription options, including a 2-week trial.</i>
              </p>
              <Button 
                variant="contained"
                color="primary"
                style={
                  { float: "right", }
                }
                className={styles.button}
                onClick={() => setLogin(true)}
              >
                Log In / Sign Up
              </Button>
              <Dialog onClose={() => setLogin(false)} open={login}>
                <Typography variant="h4"> Log In</Typography>
                <hr />
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
              </Dialog>
            </div>
          </Container>
          <Container className='p-2'>
            <Image src="grandma.png" alt='Image of grandma' fluid>

            </Image>
          </Container>
        </Stack>
      </main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  );
};

export default Welcome;
