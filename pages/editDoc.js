"use client";

import AppFooter from "../components/app.footer";
import { useRouter } from "next/router";
import {
	CircularProgress,
	Button
} from "@mui/material";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from 'react-bootstrap/Modal';
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "../styles/global.module.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL } from "../firebase/storage";
import { auth } from "../firebase/firebase";
import mammoth from "mammoth";
import { replaceDocument } from "../firebase/storage";
import TextCorrectionForm from "../components/TextCorrectionForm";
import edit from "../styles/edit.module.css";
import global from "../styles/global.module.css";
import { ModalBody } from "react-bootstrap";

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

export default function EditDocument() {
	const router = useRouter();

	const [docxContent, setDocxContent] = useState("");
	const [correctedText, setCorrectedText] = useState("");

	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);

	const [isSaved, setIsSaved] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const handleClose1 = () => setShow1(false);
	const handleShow1 = () => setShow1(true);

	const bucket = router.query.data;
	const docName = bucket;
	const parts = docName.split("/");
	const documentName = parts[parts.length - 1];

	const uid = auth.uid;
	useEffect(() => {
		getDownloadURL(bucket)
			.then(async (url) => {
				// Fetch the content or convert the .docx to a readable format (e.g., HTML)
				const response = await fetch(url);
				const docxBuffer = await response.arrayBuffer();
				const result = await mammoth.convertToHtml({
					arrayBuffer: docxBuffer,
				});
				const htmlWithoutImages = result.value.replace(
					/<img[^>]*>/g,
					""
				);

				setDocxContent(htmlWithoutImages);
				setIsLoading(false);
				setIsSaved(false);
			})
			.catch((error) => {
				console.error(
					"Error fetching the .docx file:",
					error
				);
			});
	}, []);

	const handleSave = async () => {
		console.log(docxContent);
		try {
			const response = await fetch(
				"/api/convert-to-docx",
				{
					method: "POST",
					body: JSON.stringify(docxContent),
				}
			);

			if (response.ok) {
				const docxBlob = await response.blob();
				replaceDocument(docxBlob, bucket);
				console.log("worked");
				setIsSaved(false);

				//   const url = window.URL.createObjectURL(docxBlob);
				//   window.open(url, '_blank');
			}
		} catch (error) {
			console.error(
				"Error converting or rendering DOCX:",
				error
			);
			// Handle error
		}
	};

	const handleDownload = async () => {
		console.log(docxContent);
		try {
			const response = await fetch(
				"/api/convert-to-docx",
				{
					method: "POST",
					body: JSON.stringify(docxContent),
				}
			);

			if (response.ok) {
				const docxBlob = await response.blob();
				const url = window.URL.createObjectURL(docxBlob);
				window.open(url, '_blank');
				// setIsLoading(false);
			}
		} catch (error) {
			console.error(
				"Error converting or rendering DOCX:",
				error
			);
			// Handle error
		}
	};

	const handleSubmit = async (inputText) => {
		// Make API request with the inputText
		inputText =
			"Correct english of this text:" +
			inputText +
			". Here is the corrected version";
		const response = await fetch(
			`https://polite-horribly-cub.ngrok-free.app/generate_code?prompts=Correct%20English:${encodeURIComponent(
				inputText
			)}`,
			{
				method: "GET",
				headers: new Headers({
					"Content-Type": "application/json",
					// "ngrok-skip-browser-warning": "69420",
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


	const handleSaveAndLeave = async () => {
		handleSave();
		router.push("/dashboard");
	};


	return isOpen ? (
		<div>
		
			<Button
				color="secondary"
				onClick={() => setIsOpen(false)}
			>
				Close
			</Button>
		
			<Button color="primary" onClick={handleNotSaveAndLeave}>
				Don't Save and Leave
			</Button>
		</div>
	) : (
		<div>
			<Head>
				<title>Document Edit</title>
        <link rel="icon" href="../logo/circle.png" sizes="32x32" type="image/png" />
			</Head>

			<main
				className={styles.mainBody}
				style={{ padding: "30px" }}
			>
				<div style={{ margin: "10px" }}>
					<div
						className={`fixed-top ${edit.fixedHeader}`}
					>
						<div>
							<Container
								className={
									global.headerContainer
								}
							>
								<Image
									className={
										global.circleLogo
									}
									src="../logo/circle.png"
								></Image>
								<Image
									className={
										global.nameLogo
									}
									src="../logo/name.png"
								></Image>
							</Container>
						</div>
						<div
							className={
								edit.btnContainer
							}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={
									handleShow1
								}
							>
								Home
							</Button>
							<Button
								variant="contained"
								className="primary"
								onClick={
									handleSave
								}
							>
								Save here
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={
									handleDownload
								}
							>
								Download
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={
									toggleShow
								}
								className="me-2"
							>
								Text Correction
							</Button>
						</div>
					</div>
				</div>
				<div style={{ marginTop: "130px" }}>
					<div>
						<Modal
							show={show1}
							onHide={handleClose1}
						>
							<Modal.Header
								closeButton
							>
								<Modal.Title className={edit.offCanvasTitle}>
                Make sure to save what you're working on!
								</Modal.Title>
							</Modal.Header>
              <ModalBody className={
										edit.image1
									}>
              <Image
									
									src="../Image1.png"
								></Image>
              </ModalBody>
							<Modal.Footer>
								<Button
									variant="contained"
                  color="secondary"
									onClick={
										handleClose1
									}
								>
									Close
								</Button>
								<Button
									variant="contained"
                  color="primary"
									onClick={
										handleSaveAndLeave
									}
								>
									Save
									Changes
								</Button>
							</Modal.Footer>
						</Modal>
					</div>
					<div>
						<h1
							className={
								edit.documentName
							}
						>
							{documentName}
						</h1>
					</div>

					{(isLoading) &&
						<CircularProgress
							color="inherit"
							sx={{ marginLeft: "50%", marginTop: "25%" }}
						/>
					}
					{(!isLoading) &&
						<div>
							<ReactQuill
								// ref={quillRef}
								theme="snow"
								value={docxContent}
								onChange={setDocxContent}
							/>
						</div>
					}

					<>
						<Offcanvas
							show={show}
							onHide={handleClose}
							scroll={true}
							backdrop={false}
							placement="bottom"
						>
							<Offcanvas.Body>
								<div>
									<TextCorrectionForm
										onSubmit={
											handleSubmit
										}
									/>
									{correctedText && (
										<div>
											<h2>
												Corrected:
											</h2>
											<p>
												{
													correctedText
												}
											</p>
										</div>
									)}
								</div>
							</Offcanvas.Body>
						</Offcanvas>
					</>
				</div>
			</main>
			<AppFooter />
		</div>
	);
}
