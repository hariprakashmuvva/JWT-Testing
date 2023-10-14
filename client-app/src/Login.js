import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        method: 'post',
        url: 'http://localhost:5000/login',
        data: formData,
        headers: {
            'Access-Control-Allow-Credentials': true
          }
    }).then(function (res) {
        if(res != null)
            if(res.data !== "Login Failed"){
                console.log(res)
                localStorage.setItem("token", res.data.token);
                navigate('/home');
            }
            else
                alert(res.data);
      });
    
  };

  return (
    
    <div className="container mt-5">
      <div className='row'>
        <div className="col-sm"></div>
        <div className="col-sm">
            
        <h2 className='text-center'>Login</h2>
         <form onSubmit={handleSubmit}>
       <div className="mb-3 mt-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className='btn btn-warning'>Login</button>
    </form>
    </div>
        <div className="col-sm"></div>
      </div>
   
    </div>
  );
};

export default LoginForm;
