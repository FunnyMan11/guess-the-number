// App.js
import { useState } from 'react';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('Start guessing');
  const [userGuess, setUserGuess] = useState('');
  const [gameWon, setGameWon] = useState(false);
  
  function generateRandomNumber() {
    return Math.trunc(Math.random() * 20) + 1;
  }

  function handleCheck() {
    const guess = parseInt(userGuess);
    if (!guess) {
      setMessage('No number selected');
    } else if (guess === secretNumber) {
      setMessage('You got the number!');
      setGameWon(true);
      // Update high score if necessary
      if (score > highScore) {
        setHighScore(score);
      }
      // Change background color to green
      document.body.classList.add('won');
    } else if (guess > secretNumber) {
      setMessage('Too high');
      setScore(prevScore => prevScore - 1);
    } else if (guess < secretNumber) {
      setMessage('Too low');
      setScore(prevScore => prevScore - 1);
    }
  }

  function handleAgain() {
    setSecretNumber(generateRandomNumber());
    setScore(20);
    setMessage('Start guessing');
    setUserGuess('');
    setGameWon(false);
    // Remove background color class
    document.body.classList.remove('won');
  }

  return (
    <div className="App">
      <header>
        <h1 className="h1">Guess the number</h1>
        <p className="between">(from 1 to 20)</p>
        <button className="btn again" onClick={handleAgain}>Again!</button>
        <div className="number">{gameWon ? secretNumber : '?'}</div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" value={userGuess} onChange={e => setUserGuess(e.target.value)} />
          <button className="btn check" onClick={handleCheck}>Check!</button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">💯 Score: <span className="score">{score}</span></p>
          <p className="label-highscore">🥇 Highscore: <span className="highscore">{highScore}</span></p>
        </section>
      </main>
    </div>
  );
}

export default App;
