import React, {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import AddEdit from './components/AddEdit';
import ShowDetails from './components/ShowDetails';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} /> {}
          <Route path="/showDetails/:id" element={<ShowDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;