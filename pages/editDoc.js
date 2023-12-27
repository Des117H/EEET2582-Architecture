"use client";

import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from "react-bootstrap";

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
import "react-quill/dist/quill.snow.css";
import { getDownloadURL } from "../firebase/storage";
import { auth } from "../firebase/firebase";
import mammoth from "mammoth";
// import HTMLtoDOCX from 'html-to-docx';

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const EditDocument = () => {
  const router = useRouter();

  const [docxContent, setDocxContent] = useState("");
  const quillRef = useRef();

  // useEffect(() => {
  // 	console.log(quillRef.current);
  // }, [quillRef]);

  const docName = router.query.data;
  const uid = auth.uid;
  useEffect(() => {
    getDownloadURL(docName)
      .then(async (url) => {
        // Fetch the content or convert the .docx to a readable format (e.g., HTML)
        const response = await fetch(url);
        const docxBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: docxBuffer });

        setDocxContent(result.value);
      })
      .catch((error) => {
        console.error("Error fetching the .docx file:", error);
      });
  }, []);

  // const handleSave = async () => {
  //   try {
  //     // const docxContent = await htmlToDocx(editorContent);
  //     // const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  //     console.log(docxContent);

  //     // const fileBuffer = await HTMLtoDOCX(docxContent, null, {
  //     //   table: { row: { cantSplit: true } },
  //     //   footer: true,
  //     //   pageNumber: true,
  //     // });

  //     const { value } = await mammoth.extractRawText({ arrayBuffer: Buffer.from(docxContent) });
    
  //     console.log("this is value");

  //     console.log(value);

  //     // const storageRef = ref(storage, 'path_to_your_file.docx');
  //     // await uploadBytes(storageRef, blob);
  //   } catch (error) {
  //     console.error("Error converting or saving the document:", error);
  //   }
  // };

  return (
    <div>
      <Head>
        <title>Document Edit</title>
      </Head>

      <main className={styles.mainBody} style={{ padding: "20px" }}>
        <Button onClick={handleSave}>Save here</Button>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={docxContent}
          onChange={setDocxContent}
        />
      </main>
      <AppFooter />
    </div>
  );
};

export default EditDocument;

