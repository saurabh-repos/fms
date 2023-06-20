import { ObjectId } from "bson";
import mongoose from "mongoose";

const remarksSchema = new mongoose.Schema({
  userName: {
        type: String,
        required: true,
      },
  documentID: {
    type: ObjectId,
    required: true,
  },
  remarks: {
    type: Array,
    required: true,
  },


  
}, { timestamps: true });



export default mongoose.model('Remarks', remarksSchema);
