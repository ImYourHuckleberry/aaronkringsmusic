import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Bio from './components/Bio';
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
        <Router>
          <Routes>
            <Route path="/" element={<Bio />} />
          </Routes>
          <BottomNav />
        </Router>
      </header>
    </div>
  );
}

export default App;