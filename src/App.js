import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };
  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      setTimeout(() => {}, timeout);
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper text-center container">
        <div className="row pt-5">
        <h2 className="pb-4">25 + 5 Clock</h2>
        </div>
        
        <div className="break-session-length row">
          
          <div className=" col-md-4 offset-md-2 col-sm-12 ">
            <h3 id="break-label">Break Length</h3>
            <div className="pb-3">
              <button
                className="fa-solid fa-arrow-down"
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              ></button>

              <strong id="break-length">{breakLength}</strong>
              <button
                className="fa-solid fa-arrow-up"
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              ></button>
            </div>
          </div>
         
          <div  className="col-md-4 col-sm-12">
            <h3 id="session-label">Session Length</h3>
            <div className="pb-2">
              <button
                className="fa-solid fa-arrow-down"
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              ></button>

              <strong id="session-length">{sessionLength}</strong>

              <button
                className="fa-solid fa-arrow-up"
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              ></button>
            </div>
          </div>
          <div className="col-2">

        </div>
        </div>
        <div className="timer-wrapper offset-md-4 col-md-4 col-sm-4 offset-sm-4" >
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <button
            className="fas fa-play "
          onClick={handlePlay} id="start_stop">
            <i className="fas fa-stop " ></i>
          </button>
          <button 
          className="fas fa-times "
          onClick={handleReset} id="reset">
            
          </button>
        </div>
        <div class="text-decoration-none L">
        Designed and Coded by <br></br>
        <a class="text-decoration-none text-danger" href="https://github.com/ossmazon" target="_blank" >ossmazon</a>
      </div>
      </div>
      
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
