import mongoose from "mongoose";
import Remarks from "./remarksModel.js";

const documentsSchema = new mongoose.Schema({
  fileNumber: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['Note', 'Document'],
    default: 'Note',
  },
  documentName: {
    type: String,
    required: true,
    unique: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  remarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Remarks,
    },
  ],
  size: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export default mongoose.model('Document', documentsSchema);