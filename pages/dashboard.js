"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '../firebase/auth';
import AddIcon from '@mui/icons-material/Add';
import DocumentRow from '../components/DocumentRow';
import DocumentDialog from '../components/documentDialog';
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	deleteDocumentFirestore as deleteFromDb,
	getDocumentsMvp,
	getDocumentsOcr,
} from "../firebase/firestore";
import { deleteDocumentBucket } from '../firebase/storage';
import {
	AppBar,
	Box,
	Button,
	Container,
	Stack,
	Toolbar,
	Typography,
	CircularProgress,
	Dialog,
	Alert,
	DialogContent,
	DialogActions,
	Divider,
	IconButton,
	Snackbar,
} from "@mui/material";
import { ocrFeatureFlag } from "../firebase/remoteConfig";
import styles from "../styles/css/dashboard.module.css";
import global from "../styles/global.module.css";
import dash from "../styles/dash.module.css";
import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
import Link from 'next/link'

const ADD_SUCCESS_MVP = "Document was successfully added!";
const ADD_SUCCESS_OCR =
	"Document was successfully added, check back later to confirm document info!";
const ADD_ERROR = "Document was not successfully added!";
const EDIT_SUCCESS = "Document was successfully updated!";
const EDIT_ERROR = "Document was not successfully updated!";
const DELETE_SUCCESS = "Document successfully deleted!";
const DELETE_ERROR = "Document not successfully deleted!";

export const DOCUMENTS_ENUM = Object.freeze({
	none: 0,
	add: 1,
	edit: 2,
	delete: 3,
	confirm: 4,
});

const SUCCESS_MAP = {
	[DOCUMENTS_ENUM.add]: ocrFeatureFlag ? ADD_SUCCESS_OCR : ADD_SUCCESS_MVP,
	[DOCUMENTS_ENUM.edit]: EDIT_SUCCESS,
	[DOCUMENTS_ENUM.delete]: DELETE_SUCCESS,
};

const ERROR_MAP = {
	[DOCUMENTS_ENUM.add]: ADD_ERROR,
	[DOCUMENTS_ENUM.edit]: EDIT_ERROR,
	[DOCUMENTS_ENUM.delete]: DELETE_ERROR,
};

export default function dashboard() {
	const { authUser, isLoading } = useAuth();
	const router = useRouter();
	const [action, setAction] = useState(DOCUMENTS_ENUM.none);

	// State involved in loading, setting, deleting, and updating documents
	const [allDocuments, setAllDocuments] = useState([]);
	const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
	const [deleteDocumentId, setDeleteDocumentId] = useState("");
	const [deleteDocumentFirestoreBucket, setDeleteDocumentFirestoreBucket] = useState("");
	const [pastDocuments, setPastDocuments] = useState([]);
	const [updateDocument, setUpdateDocument] = useState({});

	// State involved in snackbar
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [showSuccessSnackbar, setSuccessSnackbar] = useState(false);
	const [showErrorSnackbar, setErrorSnackbar] = useState(false);

	const getAndSetDocuments = async () => {
		if (ocrFeatureFlag) {
			setPastDocuments(await getDocumentsOcr(authUser.uid, true));
		} else {
			setAllDocuments(await getDocumentsMvp(authUser.uid));
		}
	};

	useEffect(() => {
		if (!isLoading && !authUser) {
			router.push("/");
		}
	}, [authUser, isLoading]);

	useEffect(() => {
		if (authUser) {
			async function fetchData() {
				await getAndSetDocuments();
			}
			setIsLoadingDocuments(true);
			fetchData();
		}
	}, [authUser, ocrFeatureFlag]);

	// Sets appropriate snackbar message on whether @isSuccess and updates shown documents if necessary
	const onResult = async (documentEnum, isSuccess) => {
		setSnackbarMessage(
			isSuccess ? SUCCESS_MAP[documentEnum] : ERROR_MAP[documentEnum]
		);

		isSuccess ? setSuccessSnackbar(true) : setErrorSnackbar(true);

		setAction(DOCUMENTS_ENUM.none);

		if (isSuccess) {
			setIsLoadingDocuments(false);
			getAndSetDocuments();
		}
	};

	const onClickDelete = (id, documentBucket) => {
		setAction(DOCUMENTS_ENUM.delete);
		setDeleteDocumentId(id);
		setDeleteDocumentFirestoreBucket(documentBucket);
	};

	const onCloseDocumentDialog = () => {
		setAction(DOCUMENTS_ENUM.none);
		setUpdateDocument({});
	};

	const onUpdate = (document, action) => {
		setUpdateDocument(document);
		console.log(document);
		setAction(action);
	};

	const resetDelete = () => {
		setAction(DOCUMENTS_ENUM.none);
		setDeleteDocumentId("");
	};

	// Delete document image from Storage
	const onDelete = async () => {
		let isSucceed = true;
		try {
			await deleteFromDb(deleteDocumentId);
			await deleteDocumentBucket(deleteDocumentFirestoreBucket);
		} catch (error) {
			console.log(error);
			isSucceed = false;
		}
		resetDelete();
		onResult(DOCUMENTS_ENUM.delete, isSucceed);
	};

	const getDocumentRows = (documents) => {
		const zeroStateText = "No past documents";
		const actionEnum = DOCUMENTS_ENUM.edit;

		return documents.length > 0 ? (
			documents.map((document) => (
				<div key={document.id}>
					<Divider light />
					<DocumentRow
						document={document}
						onEdit={() => onUpdate(document, actionEnum)}
						onDelete={() => onClickDelete(document.id, document.documentBucket)}
					/>
				</div>
			))
		) : (
			<Typography variant="h5">{zeroStateText}</Typography>
		);
	};

	return !authUser ? (
		<CircularProgress
			color="inherit"
			sx={{ marginLeft: "50%", marginTop: "25%" }}
		/>
	) : (
		<div>
			<Head>
				<title>Dashboard</title>
				<link rel="icon" href="../logo/circle.png" sizes="32x32" type="image/png" />
			</Head>

			<div>
				<AppHeader />
			</div>

			<main className={global.mainBody}  >
				<Container className={dash.mainBody}>
					<Snackbar
						open={showSuccessSnackbar}
						autoHideDuration={1500}
						onClose={() => setSuccessSnackbar(false)}
						anchorOrigin={{ horizontal: "center", vertical: "top" }}
					>
						<Alert onClose={() => setSuccessSnackbar(false)} severity="success">
							{snackbarMessage}
						</Alert>
					</Snackbar>
					<Snackbar
						open={showErrorSnackbar}
						autoHideDuration={1500}
						onClose={() => setErrorSnackbar(false)}
						anchorOrigin={{ horizontal: "center", vertical: "top" }}
					>
						<Alert onClose={() => setErrorSnackbar(false)} severity="error">
							{snackbarMessage}
						</Alert>
					</Snackbar>
					<Stack direction="row" onClick={() => setAction(DOCUMENTS_ENUM.add)}>
						<p className={dash.addDocument} variant="h4">
							ADD DOCUMENT
						</p>
						<IconButton
							aria-label="edit"
							color="secondary"
							className={styles.addButton}
						>
							<AddIcon />
						</IconButton>
					</Stack>
					{getDocumentRows(ocrFeatureFlag ? pastDocuments : allDocuments)}
				</Container>

				<Dialog open={action === DOCUMENTS_ENUM.delete} onClose={resetDelete}>
					<Typography variant="h4" className={styles.title}>
						DELETE DOCUMENT
					</Typography>
					<DialogContent>
						<Alert severity="error">
							This will permanently delete your document!
						</Alert>
					</DialogContent>
					<DialogActions sx={{ padding: "0 24px 24px" }}>
						<Button color="secondary" variant="outlined" onClick={resetDelete}>
							Cancel
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={onDelete}
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</main>
			<div>
				<AppFooter />
			</div>
		</div>
	);
}
