"use client";

import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from "react-bootstrap";

import { useRouter } from "next/router";
import { Button, Form } from "@mui/material";
import styles from "../styles/global.module.css";
import Head from "next/head";
import { Download } from "react-bootstrap-icons";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL } from "../firebase/storage";
import { auth } from "../firebase/firebase";
import mammoth from "mammoth";
import { replaceDocument } from "../firebase/storage";
import { doc } from "firebase/firestore";
import TextCorrectionForm from "../components/TextCorrectionForm";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function EditDocument() {
  const router = useRouter();

  const [docxContent, setDocxContent] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  const bucket = router.query.data;
  const uid = auth.uid;
  useEffect(() => {
    getDownloadURL(bucket)
      .then(async (url) => {
        // Fetch the content or convert the .docx to a readable format (e.g., HTML)
        const response = await fetch(url);
        const docxBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: docxBuffer });
        const htmlWithoutImages = result.value.replace(/<img[^>]*>/g, "");

        setDocxContent(htmlWithoutImages);
      })
      .catch((error) => {
        console.error("Error fetching the .docx file:", error);
      });
  }, []);

  const handleSave = async () => {
    console.log(docxContent);
    try {
      const response = await fetch("/api/convert-to-docx", {
        method: "POST",
        body: JSON.stringify(docxContent),
      });

      if (response.ok) {
        const docxBlob = await response.blob();
        replaceDocument(docxBlob, bucket);
        console.log("worked");

        //   const url = window.URL.createObjectURL(docxBlob);
        //   window.open(url, '_blank');
      }
    } catch (error) {
      console.error("Error converting or rendering DOCX:", error);
      // Handle error
    }
  };
  const handleDownload = async () => {
    console.log(docxContent);
    try {
      const response = await fetch("/api/convert-to-docx", {
        method: "POST",
        body: JSON.stringify(docxContent),
      });

      if (response.ok) {
        const docxBlob = await response.blob();
        const url = window.URL.createObjectURL(docxBlob);
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error converting or rendering DOCX:", error);
      // Handle error
    }
  };

  const handleSubmit = async (inputText) => {
    // Make API request with the inputText
    inputText = "Correct english of this text:" + inputText +". Here is the corrected version";
    const response = await fetch(
      `https://polite-horribly-cub.ngrok-free.app/generate_code?prompts=Correct%20English:${encodeURIComponent(
        inputText
      )}`,
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      }),
    }
    );
    
    if (response.ok) {
      const data = await response.json();
      // Assuming the API response is an array of corrected text
      setCorrectedText(data);
    } else {
      // Handle error
      console.error("Failed to fetch data");
    }
  };

  return (
    <div>
      <Head>
        <title>Document Edit</title>
      </Head>

      <main className={styles.mainBody} style={{ padding: "20px" }}>
        <div>
          <Button variant="contained" className="primary" onClick={handleSave}>
            Save here
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDownload}>
            Download
          </Button>
        </div>
        <div>
          <ReactQuill
            // ref={quillRef}
            theme="snow"
            value={docxContent}
            onChange={setDocxContent}
          />
        </div>
        <div>
          <h1>Text Correction App</h1>
          <TextCorrectionForm onSubmit={handleSubmit}  />
          {correctedText && (
            <div>
              <h2>Corrected:</h2>
              <p>{correctedText}</p>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

// EditDocument;
