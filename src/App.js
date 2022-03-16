import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EndVote from "./Pages/EndVote";
import axiosInstance from "./helpers/axios";
import { useEffect, useState } from "react";
import VoteMain from "./Pages/VoteMain";

function App() {
  const [questions, setQuestions] = useState();

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
