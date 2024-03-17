import mongoose, { Schema, Document } from "mongoose";

interface UserModel extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpire: Date;
  verifyToken: string;
  verifyTokenExpire: Date;
}

const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: [true, "Please Enter Your Username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});

const User =
  mongoose.models.User || mongoose.model<UserModel>("User", userSchema);
export default User;
