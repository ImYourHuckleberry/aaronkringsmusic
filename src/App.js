import aaronbackground from './aaronbackground.mp4';
import aaronbackgroundWebM from './aaronbackgroundweb.webm';
import aaronpng from './aaronpng.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <video autoPlay muted loop id="myVideo">
          <source src={aaronbackground} type="video/mp4"/>
          <source src={aaronbackgroundWebM} type="video/webm"/>
        </video> */}
        <img src = {aaronpng} id="myVideo"/>
        <div className='intro'>
          <p>Aaron Krings is a jazz artist, currently featured in the play Million Dollar Quartet.</p>
          <p>Opening April 20th, Wick Theater, Boca Raton, FL</p> </div>
        <div className='signup'>Sign up for classes now</div>
      </header>
    </div>
  );
}

export default App;
