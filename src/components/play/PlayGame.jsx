import React, { useState, useEffect, useCallback } from "react";
import "./play-game.scss";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import questions from "../../questions.json";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import correctSound from "../../assets/audio files/correct-answer.mp3";
import wrongSound from "../../assets/audio files/wrong-answer.mp3";
import buttonSound from "../../assets/audio files/button-sound.mp3";
import { useNavigate } from "react-router-dom";
function PlayGame(props) {
  const navigate = useNavigate();
  const [ques, setQues] = useState(questions);
  const [curQues, setCurQues] = useState({});
  const [nextQ, setNextQ] = useState({});
  const [prevQ, setPrevQ] = useState({});
  const [ans, setAns] = useState("");
  const [numberofQues, setNumberofQues] = useState(0);
  const [numberofAns, setNumberofAns] = useState(0);
  const [currentQuesIndex, setcurrentQuesIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [hints, setHints] = useState(5);
  const [fiftyFifty, setFiftyFifty] = useState(2);
  const [useFifty, setUseFifty] = useState(false);
  const [time, setTime] = useState({});
  let interval = null
  const [disable1, setDisable1] = useState(true);
  const [disable2, setDisable2] = useState(false);
  const [prevRandomNumber, setPrevRandomNumber] = useState([]);

  //   console.log("currentQuesIndex", currentQuesIndex);
  //   console.log("numberofAns", numberofAns);
  console.log("fiftyFifty", fiftyFifty);
  console.log(score);

  useEffect(() => {
    displayQuestions();
  }, [currentQuesIndex]);
  useEffect(()=>{
    StartTimer()

  },[])

  const displayQuestions = () => {
    setCurQues(ques[currentQuesIndex]);
    setNextQ(ques[currentQuesIndex + 1]);
    setPrevQ(ques[currentQuesIndex - 1]);
    setNumberofQues(ques.length);
    setAns(ques[currentQuesIndex].answer);
    setDisable1(false);
    setPrevRandomNumber([]);
    setUseFifty(false);
    showOption();
  };

  const handleOnclick = (e) => {
    if (currentQuesIndex < numberofQues - 1) {
      if (e.target.innerHTML[0].toLowerCase() === ans.toLowerCase()) {
        setTimeout(() => {
          document.getElementById("correct_sound").play();
        }, 300);
        correct();
      } else {
        setTimeout(() => {
          document.getElementById("wrong_sound").play();
        }, 300);
        wrong();
      }
    }
  };
  const nextQues = () => {
    if (currentQuesIndex < 14) {
      setcurrentQuesIndex((prev) => prev + 1);
      setDisable1(false);
    } else if (currentQuesIndex === 14) {
      setDisable2(true);
    }
  };
  const prevQues = () => {
    if (currentQuesIndex >= 1) {
      setcurrentQuesIndex((prev) => prev - 1);
      setDisable2(false);
    } else if (currentQuesIndex === 0) {
      setDisable1(true);
    }
  };
  const quitQues = () => {
    if (window.confirm("are you sure quit game !")) {
      navigate("/");
    }
  };
  const handleButton = (e) => {
    switch (e.target.id) {
      case "next":
        nextQues();
        break;
      case "prev":
        prevQues();
        break;
      case "quit":
        quitQues();
        break;
      default:
        break;
    }
    soundButton();
  };
  const soundButton = () => {
    document.getElementById("button_sound").play();
  };
  const correct = () => {
    toast.success("Correct!");
    setScore((prev) => prev + 1);
    setCorrectAns((prev) => prev + 1);
    setcurrentQuesIndex((prev) => prev + 1);
    setNumberofAns((prev) => prev + 1);
  };
  const wrong = () => {
    toast.error("Error!");
    setWrongAns((prev) => prev + 1);
    setcurrentQuesIndex((prev) => prev + 1);
    setNumberofAns((prev) => prev + 1);
  };
  const showOption = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });
  };
  const handleHints = () => {
    if (hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      console.log("options:", options);
      let indexofAns;
      options.forEach((option, index) => {
        if (option.innerHTML[0].toLowerCase() === ans.toLowerCase()) {
          indexofAns = index;
        }
      });
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexofAns &&
          !prevRandomNumber.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              setHints((prev) => prev - 1);
              setPrevRandomNumber(prevRandomNumber.concat(randomNumber));
            }
          });
          break;
        }
        if (prevRandomNumber.length >= 3) {
          break;
        }
      }
    }
  };
  const handleFiftyFifty = () => {
    if (fiftyFifty > 0 && useFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAns;
      options.forEach((option, index) => {
        if (option.innerHTML[0].toLowerCase() === ans.toLowerCase()) {
          indexOfAns = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAns) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAns)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                !randomNumbers.includes(indexOfAns)
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          console.log("dadasdas");
          option.style.visibility = "hidden";
          setUseFifty(true);
          setFiftyFifty((prev) => prev - 1);
        }
      });
    }
  };
  const StartTimer = useCallback(()=> {
    const countDowTime = Date.now() + 360000;
    interval = setInterval(() => {
      const now = new Date();
      const distane = countDowTime - now;
      const minutes = Math.floor((distane % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distane % (1000 * 60)) / 1000);
      if (distane < 0) {
        clearInterval(interval);
        setTime({ minutes: 0, seconds: 0 });
        alert("Qizz has end !")
        navigate('/')
      }else{
        setTime({minutes , seconds})
      }
    }, 1000);
  },[]);
  return (
    <>
      <Helmet>
        <title>Play Game</title>
      </Helmet>
      <audio id="correct_sound" src={correctSound}></audio>
      <audio id="wrong_sound" src={wrongSound}></audio>
      <audio id="button_sound" src={buttonSound}></audio>
      <div className="qizz-container">
        <h2>Free Quizz Mode</h2>
        <div className="qizz-main container py-3 rounded mt-5">
          <div className="qizz-icon d-flex justify-content-between">
            <ul className="qizz-icon__item">
              <li>
                <AutorenewOutlinedIcon
                  onClick={handleFiftyFifty}
                  className="qizz-icon__item__o"
                />{" "}
                {fiftyFifty}
              </li>
              <li>
                {currentQuesIndex + 1} of {numberofQues}
              </li>
            </ul>
            <ul className="qizz-icon__item">
              <li>
                <TipsAndUpdatesOutlinedIcon
                  className="qizz-icon__item__o"
                  onClick={handleHints}
                />{" "}
                {hints}
              </li>
              <li>
                <AlarmOutlinedIcon />{time.minutes}:{time.seconds}
              </li>
            </ul>
          </div>
          <div className="qizz-test mt-3">
            <h4 className="qizz-title mb-4">{curQues.question}</h4>
            <div className="qizz__item d-flex">
              <button
                onClick={handleOnclick}
                className=" option bg-primary text-white"
              >
                A: {curQues.A}
              </button>
              <button
                onClick={handleOnclick}
                className=" option bg-primary text-white"
              >
                B: {curQues.B}
              </button>
            </div>
            <div className="qizz__item d-flex">
              <button
                onClick={handleOnclick}
                className=" option bg-primary text-white"
              >
                C: {curQues.C}
              </button>
              <button
                onClick={handleOnclick}
                className=" option bg-primary text-white"
              >
                D: {curQues.D}
              </button>
            </div>
          </div>
          <div className="qizz-btn mt-5 d-flex">
            <button
              id="prev"
              onClick={handleButton}
              disabled={disable1}
              className="rounded bg-secondary text-white px-3 "
            >
              <ArrowBackIosOutlinedIcon className="qizz-btn__item" />
              Prevrious
            </button>
            <button
              id="next"
              onClick={handleButton}
              disabled={disable2}
              className="rounded bg-success text-white px-3 "
            >
              Next
              <ArrowForwardIosOutlinedIcon className="qizz-btn__item" />
            </button>
            <button
              id="quit"
              onClick={handleButton}
              className="rounded bg-danger text-white px-3 "
            >
              Quit
              <CloseOutlinedIcon className="qizz-btn__item" />
            </button>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default PlayGame;
