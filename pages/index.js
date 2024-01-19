"use client";

import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
} from "@mui/material";
import { useAuth } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import styles from "../styles/global.module.css";

// Configure FirebaseUI
const REDIRECT_PAGE = "/dashboard";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: REDIRECT_PAGE,
  // able to log In with email and google
  SignInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
  ],
};

const emailProvider = new EmailAuthProvider();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

var credential = "";
var user = "";
var token = "";

async function SignInOptions(options) {
  if (options == "Email") {
    try {
      const result = await signInWithPopup(auth, emailProvider);

      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await auth.currentUser.delete();
        throw new Error(`${email} is not registered.`);
      } else navigate(`/${auth.currentUser.tenantId}/projects`);

      user = result.user;
      credential = provider.credentialFromResult(auth, result);
      token = credential.accessToken;
    } catch (error) {
      console.error("Error signing in with Email", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        const test = OAuthProvider.credentialFromError(error);
        console.log("test", test);
      } else throw error;
    }
  } else if (options == "Google") {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await auth.currentUser.delete();
        throw new Error(`${email} is not registered.`);
      } else navigate(`/${auth.currentUser.tenantId}/projects`);

      user = result.user;
      credential = provider.credentialFromResult(auth, result);
      token = credential.accessToken;
    } catch (error) {
      console.error("Error signing in with Google", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        const test = OAuthProvider.credentialFromError(error);
        console.log("test", test);
      } else throw error;
    }
  } else if (options == "Github") {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        await auth.currentUser.delete();
        throw new Error(`${email} is not registered.`);
      } else navigate(`/${auth.currentUser.tenantId}/projects`);

      user = result.user;
      credential = provider.credentialFromResult(auth, result);
      token = credential.accessToken;
    } catch (error) {
      console.error("Error signing in with Github", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        const test = OAuthProvider.credentialFromError(error);
        console.log("test", test);
      } else throw error;
    }
  }
}

function LoginModal(props) {

	const [showLoginForm, setShowLoginForm] = useState(true);
	
  function toggleSignup() {
	
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome Back Child !
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form" style={{ display: showLoginForm ? "block" : "none" }}>
          <h1 class="text-center mb-4 title">LOGIN</h1>
          <form id="loginForm">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="loginEmail"
                required
              />
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="loginPassword"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
          <div className="signup-form" style={{ display: showLoginForm ? "none" : "block" }}>
            <h2 class="text-center mb-4 title">SIGN UP</h2>

            <form>
              <div class="mb-3">
                <label for="signupEmail" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="signupEmail"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="signupPassword" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="signupPassword"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success btn_secondary">
                Sign Up
              </button>
            </form>
          </div>

          <p class="text-center mt-3">
            Don't have an account?
            <button onclick = {()=> toggleSignup()}>
              Sign Up
            </button>
          </p>
        </div>
        <Button onClick={() => SignInOptions("Google")}>
          Sign in with Google
        </Button>
        <Button onClick={() => SignInOptions("Github")}>
          Sign in with Github
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Welcome = () => {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();
  const [login, setLogin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  if (authUser) {
    router.push("/dashboard");
  }

  return authUser ? (
    <CircularProgress
      color="inherit"
      sx={{ marginLeft: "50%", marginTop: "25%" }}
    />
  ) : (
    <div>
      <header>
        <AppHeader />
        <link
          rel="icon"
          href="../logo/circle.png"
          sizes="32x32"
          type="image/png"
        />
      </header>
      <main className={styles.mainBody}>
        <Stack direction="horizontal" gap={10}>
          <div className="p-2"></div>
          <Container className="description p-2">
            <div className="text-box">
              <h1>
                Text with love,
                <br />
                like your
                <br />
                <span className={styles.title}>
                  <b>Grandma</b>
                </span>
              </h1>
              <p className={styles.description}>
                <b>
                  Grandmaly is an AI system designed to correct English
                  manuscript errors, including grammar, typos, and punctuation.
                </b>
                <br />
                <i>
                  Simply upload a doc or docx file, and download the corrected
                  version. Create an account for subscription options, including
                  a 2-week trial.
                </i>
              </p>
              <Button
                variant="contained"
                color="primary"
                style={{ float: "right" }}
                onClick={() => setLogin(true)}
              >
                Log in here !
              </Button>

              <LoginModal show={login} onHide={() => setLogin(false)} />
            </div>
          </Container>
          <Container className="p-2">
            <Image src="grandma.png" alt="Image of grandma" fluid></Image>
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
