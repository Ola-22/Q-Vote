import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./helpers/axios";
import { useEffect, useState } from "react";
import VoteMain from "./Pages/VoteMain";
import EndVote from "./Pages/EndVote";
import Modal from "./Components/Modal";
import ConfirmCode from "./Pages/ConfirmCode";

function App() {
  const [questions, setQuestions] = useState();
  const [showModal, setShowModal] = useState(false);
  const [choice, setChoice] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [showButton, setShowButton] = useState(false);
  const [message, setMessage] = useState();
  const [isLoading, setLoading] = useState(false);
  const [macAddress, setMacAddress] = useState(null);
  const [Input, setInput] = useState("");
  const [messageConfirm, setMessageConfirm] = useState();
  const [resendCode, setResendCode] = useState();
  const [codeInput, setCodeInput] = useState("");
  const [name, setName] = useState("");

  const [selected, setSelected] = useState(new Set());

  const selectItems = (select) => {
    setSelected((selected) => {
      if (!selected.has(select)) {
        selected = new Set(selected);
        selected.add(select);
      } else {
        selected = new Set(selected);
        selected.delete(select);
      }

      return selected;
    });
  };

  const choiceArr = choice.map((ch) => ch.id);

  const InputPhone = "974" + Input;

  const openModal = () => {
    setTimeout(() => {
      setShowModal((prev) => !prev);
    }, 2000);
  };

  const show = () => {
    setShowButton(!showButton);

    setMessage(false);
  };

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  async function postData() {
    const data = {
      mac_address: macAddress,
      candidate_id: choiceArr,
      vote_id: questionId,
      phone: InputPhone,
      name: name,
    };

    await axiosInstance
      .post("/vote", data)
      .then((res) => {
        setMessage(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10 })
      .then((res) => {
        setQuestions(res.data.items.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [choice]);

  useEffect(() => {
    const navigator_info = window.navigator;
    const screen_info = window.screen;
    const uid = navigator_info.mimeTypes.length;
    const uidd = uid + navigator_info.userAgent.replace(/\D+/g, "");
    const uuidd = uidd + navigator_info.plugins.length;
    const uuiddd = uuidd + screen_info.height || "";
    const uids = uuiddd + screen_info.width || "";
    const newidd = uids + screen_info.pixelDepth || "";
    setMacAddress(newidd);
  }, [macAddress]);

  async function confirmCode() {
    const data = {
      mac_address: macAddress,
      candidate_id: choiceArr,
      vote_id: questionId,
      phone: InputPhone,
      code: codeInput,
    };

    setLoading(true);

    await axiosInstance
      .post("/confirm-code", data)
      .then((res) => {
        setMessageConfirm(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

  async function sendCode() {
    const data = {
      mac_address: macAddress,
      phone: InputPhone,
    };
    setLoading(true);

    await axiosInstance
      .post("/send-code", data)
      .then((res) => {
        setResendCode(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<VoteMain questions={questions} />} />
          <Route
            path="/vote-main/:slug"
            element={
              <EndVote
                selectItems={selectItems}
                selected={selected}
                setShowButton={setShowButton}
                setQuestionId={setQuestionId}
                setMessage={setMessage}
                choice={choice}
                setChoice={setChoice}
                showButton={showButton}
                show={show}
                postData={postData}
                message={message}
                openModal={openModal}
                showModal={showModal}
                setShowModal={setShowModal}
                isLoading={isLoading}
                handleClick={handleClick}
              />
            }
          />
          <Route
            path="/confirm-code"
            element={
              <ConfirmCode
                confirmCode={confirmCode}
                messageConfirm={messageConfirm}
                setMessageConfirm={setMessageConfirm}
                sendCode={sendCode}
                resendCode={resendCode}
                setResendCode={setResendCode}
                InputPhone={InputPhone}
                setCodeInput={setCodeInput}
              />
            }
          />
        </Routes>
        {/* <CountdownTimer date={date} setDate={setDate} /> */}
        <Modal
          postData={postData}
          showModal={showModal}
          setShowModal={setShowModal}
          Input={Input}
          setInput={setInput}
          message={message}
          isLoading={isLoading}
          handleClick={handleClick}
          setName={setName}
          name={name}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
