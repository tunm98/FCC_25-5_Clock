import "./App.css"
import { useState, useRef, useEffect } from "react"

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [isPlay, setIsPlay] = useState(false)
  const [minutes, setMinutes] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isTimeout, setIsTimeout] = useState(false)
  const [isUnder1minute, setIsUnder1minute] = useState(false)
  const minutesRef = useRef(minutes)
  const secondsRef = useRef(secondsLeft)

  const handleIncreaseSession = () => {
    if (sessionLength <= 59 && minutesRef.current <= 59) {
      setSessionLength((prev) => prev + 1)
      setMinutes((prev) => prev + 1)
      minutesRef.current = minutesRef.current + 1
    }
  }

  const handleDecreaseSession = () => {
    if (sessionLength > 1 && minutesRef.current > 1) {
      setSessionLength((prev) => prev - 1)
      setMinutes((prev) => prev - 1)
      minutesRef.current = minutesRef.current - 1
    }
  }
  const handleIncreaseBreak = () => {
    sessionLength <= 59 && setBreakLength((prev) => prev + 1)
  }
  const handleDecreaseBreak = () => {
    breakLength > 1 && setBreakLength((prev) => prev - 1)
  }
  const handleReset = () => {
    setBreakLength(5)
    setSessionLength(25)
    setMinutes(25)
    minutesRef.current = 25
    secondsRef.current = 0
    setSecondsLeft(0)
    setIsPlay(false)
    clearInterval(countDownRef.current)
  }
  useEffect(() => {
    if (isTimeout) {
      const audio = new Audio(
        "http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
      )
      audio.play()
    }
    setTimeout(() => {
      setIsTimeout(false)
    }, 1000)
  }, [isTimeout])

  const countDownRef = useRef(null)

  const startTimer = () => {
    if (minutesRef.current > 0) {
      countDownRef.current = setInterval(() => {
        if (secondsRef.current === 0) {
          minutesRef.current--
          secondsRef.current = 59
          setMinutes(minutesRef.current)
          setSecondsLeft(secondsRef.current)
        } else {
          secondsRef.current--
          setSecondsLeft(secondsRef.current)
        }
        if (minutesRef.current === 0 && secondsRef.current === 0) {
          clearInterval(countDownRef.current)
          setIsTimeout(true)
          setTimeout(() => {
            setMinutes(5)
            minutesRef.current = 5
            startTimer()
          }, 4000)
        }
        if (minutesRef.current <= 1 && secondsRef.current <= 59) {
          setIsUnder1minute(true)
        } else {
          setIsUnder1minute(false)
        }
      }, 1000)
    } else if (minutesRef.current === 0) {
      if (secondsRef.current === 0) {
        minutesRef.current = breakLength
        secondsRef.current = 0
        setMinutes(minutesRef.current)
        setSecondsLeft(secondsRef.current)
      } else {
        secondsRef.current = secondsRef.current - 1
        setSecondsLeft(secondsRef.current)
      }
    }
  }
  return (
    <div className="App">
      <h1>25+5 Clock</h1>
      <div className="length-part">
        <div className="break-length part">
          <h2 id="break-label">Break Length</h2>
          <div>
            <i
              id="break-decrement"
              className="fa-solid fa-arrow-down"
              onClick={isPlay === false ? handleDecreaseBreak : null}
            ></i>
            <span id="break-length">{breakLength}</span>
            <i
              id="break-increment"
              className="fa-solid fa-arrow-up"
              onClick={isPlay === false ? handleIncreaseBreak : null}
            ></i>
          </div>
        </div>
        <div className="session-length part">
          <h2 id="session-label">Session Length</h2>
          <div>
            <i
              id="session-decrement"
              className="fa-solid fa-arrow-down"
              onClick={isPlay === false ? handleDecreaseSession : null}
            ></i>
            <span id="session-length">{sessionLength}</span>
            <i
              id="session-increment"
              className="fa-solid fa-arrow-up"
              onClick={isPlay === false ? handleIncreaseSession : null}
            ></i>
          </div>
        </div>
      </div>
      <div className="timer-part">
        <h1 id="timer-label">Session</h1>
        <div className={`timer ${isUnder1minute ? "timer-warning" : null}`}>
          <span id="time-left">{`${minutes}:${
            secondsLeft < 10
              ? "0" + secondsLeft.toString()
              : secondsLeft.toString()
          }`}</span>
        </div>
      </div>
      <div className="control-part">
        <i
          id="start_stop"
          className={`${!isPlay ? "fa-solid fa-play" : "fa-solid fa-pause"}`}
          onClick={() => {
            setIsPlay(!isPlay)
            !isPlay ? startTimer() : clearInterval(countDownRef.current)
          }}
        ></i>
        <i
          id="reset"
          className="fa-sharp fa-solid fa-reply"
          onClick={handleReset}
        ></i>
      </div>
    </div>
  )
}
export default App
