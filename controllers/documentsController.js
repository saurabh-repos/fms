import Document from "../models/documentsModel.js"
import Files from "../models/filesModel.js";

export const savedocument = async(req,res) => {
    try{
        const {fileNumber,documentType,documentName,authorName,remarks,size}=req.body

        // validation
        if (!documentType){
            return res.send({error:'Document Type is required'})
        }
        if (!documentName){
            return res.send({error:'Document Name is required'})
        }
        if (!authorName){
            return res.send({error:'Author Name is required'})
        }



        // save document
        const document = await new Document({fileNumber,documentType,documentName,authorName,remarks,size}).save()
        
        // Find the file by fileNumber and update the documentList with the new document's object id
        const file = await Files.findOneAndUpdate(
          { fileNumber },
          { $push: { documentList: document._id } },
          { new: true }
        );
    
        if (!file) {
          return res.status(404).send({ error: "File not found" });
        }
        
        res.status(201).send({
            success:true,
            message:'File saved successfully',
            document
        })

    }
    
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in file saving',
            error
        })
    }

}

// get all the documents of specific file
export const getalldocuments = async (req, res) => {
    try {
    const { fileNumber } = req.body;
      // Find all documents in a specific file
      const documents = await Document.find({ fileNumber });
      res.status(200).send({
        success: true,
        message: 'Documents retrieved successfully',
        documents,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error in retrieving files',
        error,
      });
    }
  };