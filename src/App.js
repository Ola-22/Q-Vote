import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./helpers/axios";
import { useEffect, useState } from "react";
import VoteMain from "./Pages/VoteMain";
import EndVote from "./Pages/EndVote";
import Modal from "./Components/Modal";
import CountdownTimer from "./Components/Timer/CountdownTimer";

function App() {
  const [questions, setQuestions] = useState();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

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

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<VoteMain questions={questions} />} />
          <Route
            path="/vote-main/:slug"
            element={<EndVote questions={questions} />}
          />
        </Routes>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </BrowserRouter>
  );
}

export default App;
