import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
export const signUpService = async (user) => {
  try {
    const newUser = await userRepository.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
    if (error.code === 11000 || error.name === "MongoServerError") {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: "User already exists",
      };
    }
    throw error;
  }
};

export const signInService = async (userDetail) => {
  try {
    const user = await userRepository.getByStudentId(userDetail.studentId);
    if (!user) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
      };
    }
    const isPasswordValid = bcrypt.compareSync(
      userDetail.password,
      user.password
    );
    if (!isPasswordValid) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid password",
      };
    }
    const token = generateToken({
      _id: user._id,
      studentId: user.studentId,
      email: user.email,
    });

    return {
      _id: user._id,
      studentId: user.studentId,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      token: token,
      role: user.role || "user",
    };
  } catch (error) {
    console.log("user service error", error);
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const user = await userRepository.getById(id);
    if (!user) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Get user by ID service error", error);
    throw error;
  }
};