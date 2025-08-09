import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utitlities/axiosInstance";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login successfull!");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, password, gender, avatar }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("gender", gender);
      if (avatar) formData.append("avatar", avatar); // avatar is a File object

      const response = await axiosInstance.post("/user/register", formData);
       console.log(response.data.responseData.avatar)
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.errMessage )
      return rejectWithValue(error.response?.data?.errMessage);
    }
  }
);



export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/logout");
      toast.success("Logout successfull!!");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
       toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
       toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
