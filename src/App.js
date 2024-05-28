import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  
  render() {
    return (
      <div>
        <NavBar/>
        <Router>
          <Routes exact path="/general" element={<News key="general" pageSize={12} country="in" category="general" />} />
          <Routes exact path="/business" element={<News key="business" pageSize={12} country="in" category="business" />} />
          <Routes exact path="/entertainment" element={<News key="entertainment" pageSize={12} country="in" category="entertainment" />} />
          <Routes exact path="/general" element={<News key="general" pageSize={12} country="in" category="general" />} />
          <Routes exact path="/health" element={<News key="health" pageSize={12} country="in" category="health" />} />
          <Routes exact path="/science" element={<News key="science" pageSize={12} country="in" category="science" />} />
          <Routes exact path="/sports" element={<News key="sports" pageSize={12} country="in" category="sports" />} />
          <Routes exact path="/technology" element={<News key="technology" pageSize={12} country="in" category="technology" />} />
        </Router>
      </div>
    )
  }
}
// no_routing