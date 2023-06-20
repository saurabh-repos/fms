import mongoose from "mongoose";
import Document from "./documentsModel.js";
import users from './userModel.js'

const filesSchema = new mongoose.Schema({
  fileNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  fileName: {
    type: String,
    required: true,
    unique: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  documentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Document,
    },
  ],
  size: {
    type: String,
    required: true,
  },
  sharedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:users,
  },
  sharedTo:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:users,
    }
  ]

}, { timestamps: true });

export default mongoose.model("Files", filesSchema);
