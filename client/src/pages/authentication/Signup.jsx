import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSignupData((prev) => {
      const updated = { ...prev, avatar: file };
      console.log("Updated signupData inside setState:", updated);
      return updated;
    });
    setAvatarPreview(URL.createObjectURL(file));
  }
};






const handleSignup = async (e) => {
  e.preventDefault();

  if (signupData.password !== signupData.confirmPassword) {
    return toast.error("Password and confirm password do not match");
  }

  // Pass signupData (plain object) to thunk, thunk builds FormData
  const response = await dispatch(registerUserThunk(signupData));
  console.log(response?.payload?.success);
  if (response?.payload?.success) {
    navigate("/");
  }
};

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Signup..!!</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-5 " encType="multipart/form-data" >
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs"
              name="avatar"
            />
          </div>

          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              name="fullName"
              className="grow"
              placeholder="Full Name"
              onChange={handleInputChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <IoKeySharp />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="grow"
              onChange={handleInputChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <IoKeySharp />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="grow"
              onChange={handleInputChange}
            />
          </label>

          <div className="input input-bordered flex items-center gap-5">
            <label htmlFor="male" className="flex gap-3 items-center">
              <input
                id="male"
                type="radio"
                name="gender"
                value="male"
                className="radio radio-primary"
                onChange={handleInputChange}
                defaultChecked
              />
              male
            </label>

            <label htmlFor="female" className="flex gap-3 items-center">
              <input
                id="female"
                type="radio"
                name="gender"
                value="female"
                className="radio radio-primary"
                onChange={handleInputChange}
              />
              female
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Signup
          </button>

          <p>
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
