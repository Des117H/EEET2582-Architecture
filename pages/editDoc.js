"use client";

import AppFooter from "../components/app.footer";
import { Stack, Modal, Image } from "react-bootstrap";

import { useRouter } from "next/router";
import {
	Button,
	Form
} from "@mui/material";
import styles from "../styles/global.module.css";
import Head from "next/head";
import { Download } from "react-bootstrap-icons";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL } from "../firebase/storage";
import { auth } from "../firebase/firebase";
import mammoth from "mammoth";
import {replaceDocument} from '../firebase/storage';
import { doc } from "firebase/firestore";

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

export default function EditDocument (){
	const router = useRouter();

	const [docxContent, setDocxContent] = useState("");

	const bucket = router.query.data;
	const uid = auth.uid;
	useEffect(() => {
		getDownloadURL(bucket)
			.then(async (url) => {
				// Fetch the content or convert the .docx to a readable format (e.g., HTML)
				const response = await fetch(url);
				const docxBuffer = await response.arrayBuffer();
				const result = await mammoth.convertToHtml({ arrayBuffer: docxBuffer });
				const htmlWithoutImages = result.value.replace(/<img[^>]*>/g, '');

				setDocxContent(htmlWithoutImages);
			})
			.catch((error) => {
				console.error("Error fetching the .docx file:", error);
			});
	}, []);

  const handleSave = async () => {
	console.log(docxContent);
      try {
        const response = await fetch('/api/convert-to-docx', {
          method: 'POST',
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
  const Download = async () => {
	console.log(docxContent);
      try {
        const response = await fetch('/api/convert-to-docx', {
          method: 'POST',
          body: JSON.stringify(docxContent),
        });

        if (response.ok) {
          const docxBlob = await response.blob();
          const url = window.URL.createObjectURL(docxBlob);
          window.open(url, '_blank');
        }
      } catch (error) {
        console.error("Error converting or rendering DOCX:", error);
        // Handle error
      }
  };

	return (
		<div>
			<Head>
				<title>Document Edit</title>
			</Head>

			<main className={styles.mainBody} style={{ padding: "20px" }}>
				<div >
					<Button variant="contained" className="primary" onClick={handleSave}>
					
						Save here</Button>
					<Button variant="contained" color="secondary" onClick={Download}>Download</Button>
				</div>
				<div>
				<ReactQuill
					// ref={quillRef}
					theme="snow"
					value={docxContent}
					onChange={setDocxContent}
				/>
				<form method="get" action="https://trusting-inherently-feline.ngrok-free.app/generate_code">
				<textarea placeholder="example here"> </textarea>
				<button variant="primary" color="primary" type="submit">Submit</button>
				</form>
				</div>

			</main>
			<AppFooter />
		</div>
	);
};

// EditDocument;

