import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { addDocument, updateDocument } from '../firebase/firestore';
import { processDocument } from '../firebase/functions';
import { ocrFeatureFlag } from '../firebase/remoteConfig';
import { uploadDocument } from '../firebase/storage';
import { DOCUMENTS_ENUM } from '../pages/dashboard';
import styles from '../styles/css/documentDialog.module.css';
import { useRouter } from "next/router";


const DEFAULT_FILE_NAME = "No file selected";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
	date: null,
	fileName: DEFAULT_FILE_NAME,
	file: null,
	documentBucket: "",
	documentUrl: ""
};

const ADD_DOCUMENT_TITLE = "Add Document";

/* 
 Dialog to input receipt information
 
 props:
  - receipt is the receipt to edit if the dialog is being opened to edit, otherwise {}
  - action is the action for which this dialog was opened
  - onError emits to notify error occurred
  - onSuccess emits to notify successfully saving receipt
  - onCloseDialog emits to close dialog
 */
export default function documentDialog(props) {

	const isAdd = props.action === DOCUMENTS_ENUM.add;
	const isEdit = props.action === DOCUMENTS_ENUM.edit;

	const router = useRouter();
	const { authUser } = useAuth();
	const [formFields, setFormFields] = useState((isEdit) ? props.receipt : DEFAULT_FORM_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);

	let documentName = "";

	if (formFields != undefined)
		documentName = formFields.fileName;

	// Set dialog title based on action
	let dialogTitle = ADD_DOCUMENT_TITLE;
	if (isEdit) {
		router.push("/editDoc");
	}

	// If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
	useEffect(() => {
		if (props.showDialog) {
			setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
		}
	}, [props.edit, props.showDialog])

	// Check whether any of the form fields are unedited
	const isDisabled = () => {
		if (formFields != undefined)
			formFields.fileName === DEFAULT_FILE_NAME;
		// console.log(formFields);
	}

	// Set the relevant fields for receipt document
	const setFileData = (target) => {
		const file = target.files[0];
		const documentExtensions = file.name.split('.').slice(-1)[0];
		
		if (documentExtensions == "doc" || documentExtensions == "docx") {
			setFormFields(prevState => ({ ...prevState, fileName: file.name }));
			setFormFields(prevState => ({ ...prevState, file }));
		}
	}

	const closeDialog = () => {
		setIsSubmitting(false);
		props.onCloseDialog();
	}

	const handleSubmit = async () => {
		setIsSubmitting(true);
		updateTime();

		try {
			// Store document into Storage
			const bucket = await uploadDocument(formFields.file, authUser.uid);

			if (ocrFeatureFlag) {
				processDocument({ bucket, uid: authUser.uid });
			} else {
				await addDocument(authUser.uid, formFields.date, bucket);
			}
			props.onSuccess(props.action);
		} catch (error) {
			props.onError(props.action);
			console.log(error);
		}

		// Clear all form data
		closeDialog();
	};

	const updateTime = () => {
		const hour = ("" + (new Date().getHours()));
		const minutes = ("" + new Date().getMinutes());
		const seconds = ("" + new Date().getSeconds());
		const year = ("" + new Date().getFullYear());
		const month = ("" + (new Date().getMonth() + 1));
		const day = ("" + (new Date().getDate()));
		formFields.date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
	}

	return (
		<div>
			<Dialog classes={{ paper: styles.dialog }}
				onClose={closeDialog}
				open={isAdd}
				component="form">
				<Typography variant="h4" className={styles.title}>{dialogTitle}</Typography>
				<DialogContent className={styles.pickDocument}>
					{<Stack direction="row" spacing={2} className={styles.receiptDocument}>
						{/* {!formFields.fileName &&
                            <Link href={formFields.documentUrl} target="_blank">
                                <Avatar alt="document" src={formFields.documentUrl} />
                            </Link>
                        } */}
						{(isAdd || (isEdit && !ocrFeatureFlag)) &&
							<Button variant="outlined" component="label" color="secondary">
								Upload Document
								<input type="file" hidden onInput={(event) => { setFileData(event.target) }} />
							</Button>
						}
						<Typography>{documentName}</Typography>
					</Stack>
					}
					{(isEdit || !ocrFeatureFlag) ?
						<Stack className={styles.fields}>
						</Stack> : <div></div>
					}
				</DialogContent>
				<DialogActions>
					{isSubmitting ?
						<Button color="secondary" variant="contained" disabled={true}>
							{'Submitting...'}
						</Button> :
						<Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
							{'Submit'}
						</Button>
					}
				</DialogActions>
			</Dialog>
		</div>
	)
}