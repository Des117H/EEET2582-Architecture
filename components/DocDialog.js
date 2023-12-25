import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { addDocument, updateDocument } from '../firebase/firestore';
import { processDocument } from '../firebase/functions';
import { ocrFeatureFlag } from '../firebase/remoteConfig';
import { uploadDocument } from '../firebase/storage';
import { DOCUMENTS_ENUM } from '../pages/dashboard';
import styles from '../styles/css/expenseDialog.module.css';
import global from '../styles/global.module.css';


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
const EDIT_DOCUMENT_TITLE = "Edit Document";
const CONFIRM_DOCUMENT_TITLE = "Confirm Document";

export default function expenseDialog(props) {

    const isAdd = props.action === DOCUMENTS_ENUM.add;
    const isEdit = props.action === DOCUMENTS_ENUM.edit;

    const { authUser } = useAuth();
    const [formFields, setFormFields] = useState((isEdit) ? props.receipt : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set dialog title based on action
    let dialogTitle = ADD_DOCUMENT_TITLE;
    if (isEdit) {
        dialogTitle = EDIT_DOCUMENT_TITLE;
    }

    // If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog])

    // Check whether any of the form fields are unedited
    const isDisabled = () =>
        {
            // formFields.fileName === DEFAULT_FILE_NAME;
            console.log(formFields);
        }

    // Set the relevant fields for receipt document
    const setFileData = (target) => {
        const file = target.files[0];
        setFormFields(prevState => ({ ...prevState, fileName: file.name }));
        setFormFields(prevState => ({ ...prevState, file }));
    }

    const closeDialog = () => {
        setIsSubmitting(false);
        props.onCloseDialog();
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        updateTime();

        console.log('try');
        try {
            console.log('before upload');
            // Store document into Storage
            const bucket = await uploadDocument(formFields.file, authUser.uid);
            console.log('Upload');

            if (ocrFeatureFlag) {
                processDocument({ bucket, uid: authUser.uid });
                console.log('processDocument');
            } else {
                await addDocument(authUser.uid, formFields.date, bucket);
                console.log('addDocument');
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
            <Button onClick={updateTime}>check time</Button>
            <Dialog classes={{ paper: styles.dialog }}
                onClose={closeDialog}
                open={isEdit || isAdd}
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
                        {/* <Typography>{formFields.fileName}</Typography> */}
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