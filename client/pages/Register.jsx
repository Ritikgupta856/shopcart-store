import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/register`,
        formData
      );
      const { success, token } = response.data;
      if (success) {
        localStorage.setItem("token", token);
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="bg-gray-100 h-[calc(100vh-40px)]">
      <div className="flex justify-center items-center h-full">
        <div className="w-[400px] bg-white px-8 py-8 flex flex-col rounded-xl gap-4">
          <p className="text-lg text-center font-medium">Create an account</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mt-2">
              <div>Full Name</div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                className="border-2 w-full mt-1 p-1"
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="mt-2">
              <div>Email</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="border-2 w-full mt-1 p-1"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-2">
              <div>Password</div>
              <input
                type="password"
                name="password"
                className="border-2 w-full mt-1 py-1"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 w-full"
              >
                Register
              </button>
            </div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-900  cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
