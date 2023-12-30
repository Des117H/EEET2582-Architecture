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

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

export default function EditDocument() {
	const router = useRouter();

	const [docxContent, setDocxContent] = useState("");

	const docName = router.query.data;
	const uid = auth.uid;

	// , {
	// 	cache: 'force-cache',
	// 	next: {
	// 		tags: ['document'],
	// 		revalidate: 365 * 3600
	// 	}
	// }

	useEffect(() => {
		getDownloadURL(docName)
			.then(async (url) => {
				// Fetch the content or convert the .docx to a readable format (e.g., HTML)
				const response = await fetch(url);

				const data = await res.json()
				const docxBuffer = await response.arrayBuffer();
				const result = await mammoth.convertToHtml({ arrayBuffer: docxBuffer });
 
				setDocxContent(result.value);
			})
			.catch((error) => {
				console.error("Error fetching the .docx file:", error);
			});
	}, []);

	const handleSave = async () => {
		const htmlContent = docxContent;


		try {
			const response = await fetch('/api/convert-to-docx', {
				method: 'POST',
				body: JSON.stringify({ htmlContent }),
			});

			if (response.ok) {
				const docxBlob = await response.blob();
				const url = window.URL.createObjectURL(docxBlob);
				window.open(url, '_blank');
			} else {
				// Handle error
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
				<Button onClick={handleSave}>Save here</Button>
				<ReactQuill
					// ref={quillRef}
					theme="snow"
					value={docxContent}
					onChange={setDocxContent}
				/>
			</main>
			<AppFooter />
		</div>
	);
};

// EditDocument;

