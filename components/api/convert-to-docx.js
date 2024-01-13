import HTMLtoDOCX from 'html-to-docx';
import { replaceDocument } from '../../firebase/storage';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			console.log("this is from api: ")
			const htmlContentWithoutQuotes = req.body.slice(1, -1);
			console.log(htmlContentWithoutQuotes);
			const docxBuffer = await HTMLtoDOCX(htmlContentWithoutQuotes, { filename: 'my-document.docx' });

			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
			res.setHeader('Content-Disposition', 'attachment; filename="my-document.docx"');
			res.send(docxBuffer);

		} catch (error) {
			console.error("Error converting HTML to DOCX:", error);
			res.status(500).send('Error converting document');
		}
	}
	else {
		res.status(405).send('Method Not Allowed');
	}
}
