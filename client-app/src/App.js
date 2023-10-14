import './App.css';

import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';


function App() {
 
  
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/home' element={<Home />} />
        </Routes> 
        </BrowserRouter>
  );
}

export default App;