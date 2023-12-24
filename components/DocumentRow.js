import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import styles from '../styles/css/documentRow.module.css';

/* 
 Each row with document information
 
 props: 
  - document data:
    - id (doc id of document)
    - uid (user id of user who submitted the document)
    - date
    - documentUrl
    - isConfirmed
  - toConfirm: boolean for whether the row is to be confirmed

  - onEdit emits to notify needing to update document
  - onDelete emits to notify needing to delete document
 */
export default function DocumentRow(props) {
    const document = props.document;
    const documentName = document.documentBucket.split('/')[4];
    return (
        <div>
            <Stack direction="row" justifyContent="space-between" sx={{ margin: "1em 0" }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Avatar alt="document" src={document.documentUrl} />
                    <Stack direction="row" className={styles.contentRow}>
                        <Stack direction="column" sx={{ flexGrow: 1 }}>
                            <Typography variant="h3">
                                {documentName}
                            </Typography>
                            <Typography variant="h3">
                                {format(document.date, "yyyy/MM/dd HH:mm:ss")}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                {props.toConfirm ?
                    <Stack direction="row" className={styles.actions}>
                        <IconButton aria-label="edit" color="secondary" onClick={props.onEdit}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                    :
                    <Stack direction="row" className={styles.actions}>
                        <IconButton aria-label="edit" color="secondary" onClick={props.onEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>}
            </Stack>
        </div>
    )
}