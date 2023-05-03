import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Admin from "./components/Admin"
import { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

// >>New - Configuring Auth Module
Auth.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="video-container">
          <video autoPlay muted loop id="myVideo" playsInline>
            <source src="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/aaronbackground.mp4" type="video/mp4" />
          </video>
        </div>
        <ResponsiveAppBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;