import htmlToDocx from 'html-to-docx';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { htmlContent } = req.body;
			const docxBuffer = await htmlToDocx(htmlContent, { filename: 'my-document.docx' });

			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
			res.setHeader('Content-Disposition', 'attachment; filename="my-document.docx"');
			res.send(docxBuffer);
		} catch (error) {
			console.error("Error converting HTML to DOCX:", error);
			res.status(500).send('Error converting document');
		}
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
