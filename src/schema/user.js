import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid email address",
      ],
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function saveUser(next) {
  const user = this;
  const saltRounds = 5;
  const SALT = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashPassword;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
