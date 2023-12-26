"use client";

import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
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
import Head from "next/head";
import documentEdit from "../components/editQuill";


import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false
});


const EditDocument = () => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const quillRef = useRef();

  useEffect(() => {
    console.log(quillRef.current);
  }, [quillRef]);

  return (
    <div>
      <Head>
        <title>Document Edit</title>
      </Head>

      <main className={styles.mainBody} style={{ padding: '20px' }} >
      <ReactQuill ref={quillRef} theme="snow" value={value} onChange={setValue} />
      </main>
      <AppFooter/>
    </div>
  );
};

export default EditDocument;
