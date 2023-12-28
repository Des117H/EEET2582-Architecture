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
import WebViewer from '@pdftron/webviewer'

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

export default EditDocument = () => {
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

	const viewer = useRef(null);

	useEffect(() => {
		import('@pdftron/webviewer').then(() => {
			WebViewer(
				{
					path: '/webviewer/lib',
					initialDoc: '../public/demo-annotated.pdf',
					licenseKey: 'demo:1703695491128:7c802e3e03000000000c606c4d96767204dd2d1ace102c39222b9bda27'  // sign up to get a free trial key at https://dev.apryse.com
				},
				viewer.current
			).then((instance) => {
				const { docViewer } = instance;
				// you can now call WebViewer APIs here...
			});
		});
	}, []);

	// const handleSave = async () => {
	// 	try {
	// 		const docxContent = await htmlToDocx(editorContent);
	// 		const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

	// 		console.log(docxContent);

	// 		const fileBuffer = await HTMLtoDOCX(docxContent, null, {
	// 			table: { row: { cantSplit: true } },
	// 			footer: true,
	// 			pageNumber: true,
	// 		});

	// 		const { value } = await mammoth.extractRawText({ arrayBuffer: Buffer.from(docxContent) });

	// 		console.log("this is value");

	// 		console.log(value);

	// 		// const storageRef = ref(storage, 'path_to_your_file.docx');
	// 		// await uploadBytes(storageRef, blob);
	// 	} catch (error) {
	// 		console.error("Error converting or saving the document:", error);
	// 	}
	// };

	const handleSave = async () => {
		const fileBuffer = await HTMLtoDOCX(htmlString, null, {
			table: { row: { cantSplit: true } },
			footer: true,
			pageNumber: true,
		});

		fs.writeFile(filePath, fileBuffer, (error) => {
			if (error) {
				console.log('Docx file creation failed');
				return;
			}
			console.log('Docx file created successfully');
		});
	}

	return (
		<div>
			<Head>
				<title>Document Edit</title>
			</Head>

			<main className={styles.mainBody} style={{ padding: "20px" }}>
				<div className='MyComponent'>
					<div className='webviewer' ref={viewer} style={{ height: '100vh' }}></div>
				</div>
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

// export default EditDocument;

