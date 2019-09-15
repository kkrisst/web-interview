import React, { Component } from 'react'

import Header from './components/header/header.component.jsx'
import NewAppointmentPage from './pages/new-appointment-page/new-appointment-page.component.jsx'

import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <NewAppointmentPage />
      </div>
    )
  }
}

export default App
