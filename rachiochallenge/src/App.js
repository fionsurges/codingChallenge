import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import GetUserData from './components/GetUserData';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <GetUserData />
      </div>
    ) 
  }
}

export default App
