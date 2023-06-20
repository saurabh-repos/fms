import Files from "../models/filesModel.js";
import users from "../models/userModel.js";

export const savefile = async (req, res) => {
  try {
    const { fileNumber, fileName, authorName, size, sharedBy, sharedTo } =
      req.body;

    // validation
    if (!fileNumber) {
      return res.send({ error: "File Number is required" });
    }
    if (!fileName) {
      return res.send({ error: "File Name is required" });
    }
    if (!authorName) {
      return res.send({ error: "Author Name is required" });
    }
    if (!size) {
      return res.send({ error: "size is required" });
    }
    if (!sharedBy) {
      return res.send({ error: "Shared by is required" });
    }
    if (!sharedTo) {
      return res.send({ error: "Shared to is required" });
    }

    // check file
    const existingFile = await Files.findOne({ fileNumber });

    // existing file
    if (existingFile) {
      return res.status(200).send({
        success: true,
        message: "File exist already",
      });
    }
    // get the author name



    // save user
    const file = await new Files({
      fileNumber,
      fileName,
      authorName,
      size,
      sharedBy,
      sharedTo,
    }).save();
    res.status(201).send({
      success: true,
      message: "File saved successfully",
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in file saving",
      error,
    });
  }
};

//get all files

export const getallfile = async (req, res) => {
  try {
    // Find all files
    const files = await Files.find();
    
    res.status(200).send({
      success: true,
      message: "Files retrieved successfully",
      files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving files",
      error,
    });
  }
};

//get single file
export const getsinglefile = async (req, res) => {
  try {
    const { fileNumber } = req.body;

    // Find the specific file by fileNumber
    const file = await Files.findOne({ fileNumber }).populate("documentList");

    // File not found
    if (!file) {
      return res.status(404).send({
        success: false,
        message: "File not found",
      });
    }
    // Extract document names, types, and sizes from the file's documentList
    const documents = file.documentList.map((document) => ({
      documentName: document.documentName,
      documentType: document.documentType,
      size: document.size,
      remarks:document.remarks,
      }));


    res.status(200).send({
      success: true,
      message: "File retrieved successfully",
      fileNumber: file.fileNumber,
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving file",
      error,
    });
  }
};

//files shared by me

export const getfilesharebyme = async (req, res) => {
  try {
    const { sharedBy } = req.body;
    // Find files shared by the specified user
    const files = await Files.find({ sharedBy });

    res.status(200).send({
      success: true,
      message: "Files retrieved successfully",
      files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving files",
      error,
    });
  }
};

export const getfilesharewithme = async (req, res) => {
  try {
    const { sharedTo } = req.body;
    // Find files shared by the specified user
    const files = await Files.find({ sharedTo });

    res.status(200).send({
      success: true,
      message: "Files retrieved successfully",
      files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving files",
      error,
    });
  }
};





