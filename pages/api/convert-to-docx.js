import HTMLtoDOCX from 'html-to-docx';
import {replaceDocument} from '../../firebase/storage';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // console.log("this is from api: ")
      // console.log(req.body);
      const docxBuffer = await HTMLtoDOCX(req.body, { filename: 'my-document.docx' });

      // console.log("this is from api: ")
      // console.log(docxBuffer);

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
