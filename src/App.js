import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Timer from './components/Timer';
import Login from './components/Login';

function App() {

  return (
    <div className="App w-full h-screen flex justify-center items-center bg-indigo-950">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
