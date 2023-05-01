import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Amplify from '@aws-amplify/core'
import config from '../src/aws-exports'

Amplify.configure(config)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="video-container">
          <video autoPlay muted loop id="myVideo">
            <source src="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/aaronbackground.mp4" type="video/mp4" />
          </video>
        </div>
        <ResponsiveAppBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;