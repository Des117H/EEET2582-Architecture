import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from '../styles/css/documentRow.module.css';
import Link from 'next/link'
import { useRouter } from "next/router";

/* 
 Each row with document information
 
 props: 
  - document data:
	- id (doc id of document)
	- uid (user id of user who submitted the document)
	- date
	- documentUrl

  - onEdit emits to notify needing to update document
  - onDelete emits to notify needing to delete document
 */
export default function DocumentRow(props) {
	const document = props.document;
	const documentName = document.documentBucket.split('/').slice(-1)[0];
	const router = useRouter();

	const documentDate = () => {
		const date = document.date.split(' ');
		var month = "";
		switch (date[1]) {
			case 'Jan':
				month = "01";
				break;
			case 'Feb':
				month = "02";
				break;
			case 'Mar':
				month = "03";
				break;
			case 'Apr':
				month = "04";
				break;
			case 'May':
				month = "05";
				break;
			case 'June':
				month = "06";
				break;
			case 'July':
				month = "07";
				break;
			case 'Aug':
				month = "08";
				break;
			case 'Sept':
				month = "09";
				break;
			case 'Oct':
				month = 10;
				break;
			case 'Nov':
				month = 11;
				break;
			case 'Dec':
				month = 12;
				break;
		}
		return date[3] + '/' + month + '/' + date[2];
	}
	const passDocument = () => {
		props.onEdit;
		router.push({
			pathname: '/editDoc',
			query: { data: document.documentBucket },
		});
	}

	return (
		<div>
			<Stack direction="row" justifyContent="space-between" sx={{ margin: "1em 0" }}>
				<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
					<IconButton color="secondary">
						<DescriptionIcon />
					</IconButton>
					<Stack direction="row" className={styles.contentRow}>
						<Stack direction="column" sx={{ flexGrow: 1 }}>
							<Typography variant="h3">
								{documentName}
							</Typography>
							<Typography variant="h3">
								{documentDate()}
							</Typography>
						</Stack>
					</Stack>
				</Stack>

				<Stack direction="row" className={styles.actions}>
					<IconButton aria-label="edit" color="secondary" onClick={passDocument}>
						<EditIcon />
					</IconButton>
					<IconButton aria-label="delete" color="secondary" onClick={props.onDelete}>
						<DeleteIcon />
					</IconButton>
				</Stack>
			</Stack>
		</div>
	)
}