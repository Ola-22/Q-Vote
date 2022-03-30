import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./helpers/axios";
import { useEffect, useState } from "react";
import VoteMain from "./Pages/VoteMain";
import EndVote from "./Pages/EndVote";
import Modal from "./Components/Modal";
import ConfirmCode from "./Pages/ConfirmCode";
import Comments from "./Pages/Comments";

function App() {
  const [questions, setQuestions] = useState();
  const [showModal, setShowModal] = useState(false);
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
  const [nameComment, setNameComment] = useState("");
  const [comment, setComment] = useState("");
  const [quId, setQuId] = useState();
  const [options, setOptions] = useState();

  const [select, setSelect] = useState([]);

  function handleRemoveItem(itemId) {
    const items = select.filter((id) => id !== itemId);
    setSelect(items);
  }

  if (options === select.length) {
    alert(`لا يمكنك التصويت أكثر من ${select.length - 1} مرات`);
  }

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
      candidate_id: select,
      vote_id: questionId,
      phone: InputPhone,
      name: name,
    };
    await axiosInstance
      .post("/vote/add", data)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    postData();

    return () => setSelect([]);
  }, []);

  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10 })
      .then((res) => {
        setQuestions(res.data.items.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      candidate_id: select,
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

  async function sendComment() {
    const data = {
      mac_address: macAddress,
      vote_id: quId,
      name: nameComment,
      comment: comment,
    };
    await axiosInstance
      .post("/comment", data)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const allCategories = [
    "all",
    ...new Set(questions?.map((p) => p.category.title)),
  ];

  const allCategoriesIcon = [...new Set(questions?.map((p) => p.category))];

  const [menuItem, setMenuItem] = useState(questions);

  const filter = (button) => {
    if (button === "all") {
      setMenuItem(questions);
      return;
    }
    const filterdData = questions?.filter(
      (item) => item.category.title === button
    );

    setMenuItem(filterdData);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <VoteMain
                menuItem={menuItem}
                filter={filter}
                allCategories={allCategories}
                questions={questions}
                setMenuItem={setMenuItem}
                allCategoriesIcon={allCategoriesIcon}
              />
            }
          />
          <Route
            path="/vote-main/:slug"
            element={
              <EndVote
                handleRemoveItem={handleRemoveItem}
                select={select}
                setShowButton={setShowButton}
                setQuestionId={setQuestionId}
                setMessage={setMessage}
                showButton={showButton}
                show={show}
                openModal={openModal}
                isLoading={isLoading}
                handleClick={handleClick}
                setComment={setComment}
                setNameComment={setNameComment}
                sendComment={sendComment}
                setQuId={setQuId}
                setOptions={setOptions}
                setSelect={setSelect}
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
          <Route path="/comments" element={<Comments quId={quId} />} />
        </Routes>
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
