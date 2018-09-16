import React from 'react';
import utils from './utils';
import './App.css';

/* ================================
libs: reactjs, reactjs-dom
================================= */

// ==== functional components ====
function Footer() {
  return (
    <div className="row">
      <div className="col-sm created-by">
        Created by
        <a href="https://github.com/mkeeneth">Matt Keeneth</a>
      </div>
    </div>
  );
}

function Controls(props) {
  return (
    <div className="row">
      <div className="col-sm control-buttons">
        <button className="btn btn-primary" type="button" id="start_stop" onClick={props.start}>
          Start / Pause
        </button>
        <button className="btn btn-danger" type="button" id="reset" onClick={props.reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function Session(props) {
  return (
    <div className="row">
      <div className="col-sm">
        <h2 id="timer-label">{props.displayTitle}</h2>
        <div id="time-left" className="session-time">
          {props.time}
        </div>
      </div>
    </div>
  );
}

function BreakControl(props) {
  return (
    <div className="col-sm increment-buttons" id="break-label">
      <h3>Break Length</h3>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        id="break-decrement"
        onClick={props.decrementBreakTime}
      >
        (-)
      </button>
      <span id="break-length">{props.breakTimeLength}</span>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        id="break-increment"
        href=""
        onClick={props.incrementBreakTime}
      >
        (+)
      </button>
    </div>
  );
}

function SessionControl(props) {
  return (
    <div className="col-sm increment-buttons" id="session-label">
      <h3>Session Length</h3>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        id="session-decrement"
        href=""
        onClick={props.decrementSessionTime}
      >
        (-)
      </button>
      <span id="session-length">{props.sessionTimeLength}</span>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        id="session-increment"
        href=""
        onClick={props.incrementSessionTime}
      >
        (+)
      </button>
    </div>
  );
}

// ==== 'smart' components ====
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTimeLength: 5,
      sessionTimeLength: 25,
      time: 25 * 60, // seconds
      running: false,
      paused: false,
      displayTitle: 'Session',
    };

    // set this constructor scope
    this.decrementBreakTime = this.decrementBreakTime.bind(this);
    this.decrementSessionTime = this.decrementSessionTime.bind(this);
    this.incrementBreakTime = this.incrementBreakTime.bind(this);
    this.incrementSessionTime = this.incrementSessionTime.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Timer stop/pause & reset
  start() {
    if (!this.state.running) {
      // start or resume we arent running
      let currentTime;
      if (this.state.paused) {
        currentTime = this.state.time;
      } else if (this.state.displayTitle === 'Break') {
        currentTime = this.state.breakTimeLength * 60;
      } else {
        currentTime = this.state.sessionTimeLength * 60;
      }
      this.setState((prevState, props) => ({
        running: true,
        time: currentTime,
      }));

      this.decrementTime = this.decrementTime.bind(this);
      this.timer = setInterval(this.decrementTime, 1000);
    } else {
      // pause
      clearInterval(this.timer);
      this.setState({ running: false, paused: true });
    }
  }

  reset() {
    clearInterval(this.timer);

    this.beep.pause();
    this.beep.currentTime = 0;

    this.setState({
      breakTimeLength: 5,
      sessionTimeLength: 25,
      running: false,
      time: 25 * 60,
      displayTitle: 'Session',
    });
  }

  decrementTime() {
    if (this.state.time > 0) {
      this.setState((prevState, props) => ({
        time: prevState.time - 1,
      }));
    } else {
      // play sound! break time?
      this.beep.play();

      clearInterval(this.timer);

      this.setState((prevState, props) => ({
        time: prevState.breakTimeLength,
        running: false,
        paused: false,
        displayTitle: prevState.displayTitle === 'Session' ? 'Break' : 'Session',
      }));
      this.start();
    }
  }

  // Timer Controls +/-
  decrementBreakTime(e) {
    e.preventDefault();
    if (this.state.breakTimeLength > 1 && !this.state.running) {
      this.setState((prevState, props) => ({
        breakTimeLength: prevState.breakTimeLength - 1,
      }));
    }
  }

  decrementSessionTime(e) {
    e.preventDefault();
    if (this.state.sessionTimeLength > 1 && !this.state.running) {
      this.setState((prevState, props) => ({
        sessionTimeLength: prevState.sessionTimeLength - 1,
        time: (prevState.sessionTimeLength - 1) * 60,
      }));
    }
  }

  incrementBreakTime(e) {
    e.preventDefault();
    if (this.state.breakTimeLength < 60 && !this.state.running) {
      this.setState((prevState, props) => ({
        breakTimeLength: prevState.breakTimeLength + 1,
      }));
    }
  }

  incrementSessionTime(e) {
    e.preventDefault();
    if (this.state.sessionTimeLength < 60 && !this.state.running) {
      this.setState((prevState, props) => ({
        sessionTimeLength: prevState.sessionTimeLength + 1,
        time: (prevState.sessionTimeLength + 1) * 60,
      }));
    }
  }

  render() {
    return (
      <div className="jumbotron text-center">
        <h1>Pomodoro Clock</h1>
        <div className="row">
          <BreakControl
            breakTimeLength={this.state.breakTimeLength}
            decrementBreakTime={this.decrementBreakTime}
            incrementBreakTime={this.incrementBreakTime}
          />
          <SessionControl
            sessionTimeLength={this.state.sessionTimeLength}
            decrementSessionTime={this.decrementSessionTime}
            incrementSessionTime={this.incrementSessionTime}
          />
        </div>
        <Session
          time={utils.timeFormatter(this.state.time)}
          displayTitle={this.state.displayTitle}
        />
        <Controls start={this.start} reset={this.reset} />
        <Footer />
        <audio
          id="beep"
          src="./Morning_Circus.mp3"
          preload="auto"
          ref={(audio) => {
            this.beep = audio;
          }}
        />
      </div>
    );
  }
}

// use in codepen
// ReactDOM.render(<App />, document.getElementById('root'));

// dont use in codepen
export default App;
