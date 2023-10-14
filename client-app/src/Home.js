
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  

const Home = () => {
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios(`http://localhost:5000/users`, {
            method: 'GET',            
            headers:{
                'access-token': localStorage.getItem("token")
            }
        }).then(response => {
            //console.log(response);
            if(response.data.auth !== 'fail'){
                setPersons(response.data);
            }          
          })
    }, []);  

    const handleAuth = ()=>{
        axios(`http://localhost:5000/checkauth`, {
            method: 'GET',
            headers:{
                'access-token': localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            alert(response.data.text);
          });
    }

    const unAuth = ()=>{
        localStorage.clear();
        setPersons([])
    }
    const logout = ()=>{
        localStorage.clear();
        navigate('/');
    }

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-sm text-center p-1"><button className='btn btn-warning' onClick={handleAuth}>checkAuth</button></div>
            <div className="col-sm text-center p-1"><button className='btn btn-warning' onClick={unAuth}>unAuth</button></div>
            <div className="col-sm text-center p-1"><button className='btn btn-warning' onClick={logout}>logout</button>  </div>
        </div>    
        <h2 className='text-center'>Home page</h2>
        {persons.map((person) =><div key={person.id}>{person.username}</div>)}
        </div>
  );
};

export default Home;
