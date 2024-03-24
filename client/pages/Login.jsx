import axios from "axios";
import {useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";




const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
}

 const navigate =  useNavigate();
 const {setCurrentUser}= useContext(AuthContext);
 


const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`,formData);
    const {success,token,user} = response.data;
    if(success){
      toast.success("Login Successfully")
      setCurrentUser({
        user,
        token
      });
      localStorage.setItem('currentUser',JSON.stringify({user,token}))
      navigate('/')
    }
  } catch (error) {
    toast.error("Login failed. Please try again later.");
    console.error('Login failed', error);
  }
}



  return (
  <div className="bg-gray-100 h-[calc(100vh-40px)] ">
      <div className="flex justify-center items-center h-full ">
        <div className="w-[400px] bg-white px-8 py-8 flex flex-col  rounded-xl gap-4">
          <p className="text-lg text-center font-medium ">Login to your account</p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            
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
              <button type="submit" className="rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 w-full">Login</button>
            </div>

            <p className="text-center mt-4">Don't have an account? <span onClick={()=>navigate('/register')} className="text-blue-900 cursor-pointer">Register</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
