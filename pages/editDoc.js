import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from "react-bootstrap";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
} from "@mui/material";
import styles from "../styles/global.module.css";

const EditDocument = () => {
  const router = useRouter();

  return (
    <div>
      <header>
        <AppHeader />
      </header>
      <main>
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
            </div>
          </Container>
          <Container className="p-2">
            <Image src="grandma.png" alt="Image of grandma" fluid></Image>
          </Container>
        </Stack>
      </main>
    </div>
  );
};

export default EditDocument;
