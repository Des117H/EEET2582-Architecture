"use client";

import AppFooter from "../components/app.footer";
import { useRouter } from "next/router";
import {
	Button,
	CircularProgress,
	Container,
	Dialog,
	Typography,
} from "@mui/material";
import styles from "../styles/global.module.css";
import Head from "next/head";


import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'
import {getDownloadURL} from '../firebase/storage';


const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false
});

console.log(getDownloadURL());

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
