import { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Link, Stack, TextField, Typography } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth } from '../firebase/auth';
import { addDocument, updateDocument } from '../firebase/firestore';
import { processDocument } from '../firebase/functions';
import { ocrFeatureFlag } from '../firebase/remoteConfig';
import { uploadDocument } from '../firebase/storage';
import { DOCUMENTS_ENUM } from '../pages/dashboard';
import styles from '../styles/css/expenseDialog.module.css';

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

/* 
 Dialog to input receipt information
 
 props:
  - receipt is the receipt to edit if the dialog is being opened to edit, otherwise {}
  - action is the action for which this dialog was opened
  - onError emits to notify error occurred
  - onSuccess emits to notify successfully saving receipt
  - onCloseDialog emits to close dialog
 */
export default function expenseDialog(props) {
    const isAdd = props.action === DOCUMENTS_ENUM.add;
    const isEdit = props.action === DOCUMENTS_ENUM.edit;
    const isConfirm = props.action === DOCUMENTS_ENUM.confirm;

    const { authUser } = useAuth();
    const [formFields, setFormFields] = useState((isEdit || isConfirm) ? props.receipt : DEFAULT_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentTime, setCurrentTime] = useState(() => {
        const hour = ("0" + (new Date().getUTCHours() + 7)).slice(-2);
        const minutes = ("0" + new Date().getUTCMinutes()).slice(-2);
        const seconds = ("0" + new Date().getUTCSeconds()).slice(-2);
        const year = ("0" + new Date().getUTCFullYear()).slice(-2);
        const month = ("0" + new Date().getUTCMonth()).slice(-2);
        const day = ("0" + new Date().getUTCDate()).slice(-2);

        return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    });

    // Set dialog title based on action
    let dialogTitle = ADD_DOCUMENT_TITLE;
    if (isEdit) {
        dialogTitle = EDIT_DOCUMENT_TITLE;
    } else if (isConfirm) {
        dialogTitle = CONFIRM_DOCUMENT_TITLE;
    }

    // If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
    useEffect(() => {
        if (props.showDialog) {
            setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
        }
    }, [props.edit, props.showDialog])

    // Check whether any of the form fields are unedited
    const isDisabled = () =>
        !isAdd ?
            formFields.fileName === DEFAULT_FILE_NAME || !formFields.date :
            formFields.fileName === DEFAULT_FILE_NAME;

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

        try {
            if (isAdd) {
                // Adding receipt
                // Store document into Storage
                const bucket = await uploadDocument(formFields.file, authUser.uid);

                if (ocrFeatureFlag) {
                    processDocument({ bucket, uid: authUser.uid });
                } else {
                    await addDocument(authUser.uid, formFields.date, bucket);
                }
            } else {
                // Confirming or updating receipt (not allowing re-upload of documents)
                if (!ocrFeatureFlag && formFields.fileName) {
                    // Store document into Storage
                    await replaceDocument(formFields.file, formFields.documentBucket);
                }
                // Update receipt in Firestore
                await updateDocument(formFields.id, authUser.uid, formFields.date, formFields.documentBucket, true);
            }
            props.onSuccess(props.action);
        } catch (error) {
            props.onError(props.action);
        }

        // Clear all form data
        closeDialog();
    };

    return (
        <div>
            {currentTime}
            <Dialog classes={{ paper: styles.dialog }}
                onClose={closeDialog}
                open={isEdit || isConfirm || isAdd}
                component="form">
                <Typography variant="h4" className={styles.title}>{dialogTitle}</Typography>
                <DialogContent className={styles.pickDocument}>
                    {<Stack direction="row" spacing={2} className={styles.receiptDocument}>
                        {!formFields.fileName &&
                            <Link href={formFields.documentUrl} target="_blank">
                                <Avatar alt="document" src={formFields.documentUrl} />
                            </Link>
                        }
                        {(isAdd || (isEdit && !ocrFeatureFlag)) &&
                            <Button variant="outlined" component="label" color="secondary">
                                Upload Document
                                <input type="file" hidden onInput={(event) => { setFileData(event.target) }} />
                            </Button>
                        }
                        <Typography>{formFields.fileName}</Typography>
                    </Stack>
                    }
                    {(isEdit || isConfirm || !ocrFeatureFlag) ?
                        <Stack className={styles.fields}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={formFields.date}
                                    onChange={(newDate) => {
                                        setFormFields(prevState => ({ ...prevState, date: newDate }));
                                    }}
                                    maxDate={new Date()}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Stack> : <div></div>
                    }
                </DialogContent>
                <DialogActions>
                    {isSubmitting ?
                        <Button color="secondary" variant="contained" disabled={true}>
                            {isConfirm ? 'Confirming...' : 'Submitting...'}
                        </Button> :
                        <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
                            {isConfirm ? 'Confirm' : 'Submit'}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}