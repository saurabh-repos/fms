import Document from '../models/documentsModel.js';
import Remarks from '../models/remarksModel.js';

export const remarksController = async (req, res) => {
  try {
    const { userName, documentId, remarks } = req.body;

    // Validation
    if (!userName) {
      return res.send({ error: 'userName Type is required' });
    }
    if (!documentId) {
      return res.send({ error: 'documentId is required' });
    }
    if (!remarks) {
      return res.send({ error: 'Remarks is required' });
    }

    // Find the document by documentId
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).send({ error: 'Document not found' });
    }

    // Save the remark
    const remark = await new Remarks({ userName, documentID: document._id, remarks }).save();

    // Update the document's remarks array
    document.remarks.push(remark._id);
    await document.save();

    res.status(200).send({
      success: true,
      message: 'Remarks added successfully',
      remarks
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in remarks adding',
      error
    });
  }
};
