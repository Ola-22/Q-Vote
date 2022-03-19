import Header from "../../Components/Header";
import QuestionCard from "../../Components/QuestionCard";
import "./style.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import SkeletonArticle from "../../Components/Skeletons/SkeletonArticle";
import ChoicesCard from "../../Components/ChoicesCard";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import CardChoice from "./CardChoice";
import ProgressBar from "../../Components/Progress";

export default function EndVote({
  openModal,
  selectItems,
  selected,
  setShowButton,
  setQuestionId,
  setMessage,
  choice,
  show,
  showButton,
  isLoading,
  handleClick,
}) {
  const { slug } = useParams();

  const [results, setResults] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  function handleClickBtn() {
    setTimeout(() => {
      setModalOpen(true);
    }, 100);
  }

  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "مشاركة التصويت",
          text: `Qvote`,
          url: document.location.href,
        })
        .then(() => {
          // console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/vote/${slug}`)
      .then((res) => {
        setResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <div className="end-vote">
      <Header />
      <div className="timer-vote">
        <h6>متبقي لانتهاء التصويت</h6>
        {results && <QuestionCard countTimer date={results?.end_at} />}
      </div>
      {results && (
        <div>
          <QuestionCard
            endCard
            question={results.question}
            end_at={moment(results.end_at).format("LLL")}
            company={results.company}
            companyImg="/images/company.png"
          />
          <h5 className="title-main">المرشحين</h5>

          <div className="choices">
            {results.candidates.map((can) =>
              new Date(results?.end_at) > new Date() ? (
                <div key={can.id} onClick={() => setShowButton(true)}>
                  <ChoicesCard
                    src={can.photo}
                    voteNumber={can.total_votes}
                    RateVote={can.vote_precentage}
                    name={can.name}
                    onClick={() => {
                      selectItems(can);
                      setQuestionId(results.id);
                      setMessage(false);
                      !selected.has(can) && choice.push(can);
                      selected.has(can) && choice.pop();
                    }}
                    className={
                      selected.has(can) ? "choices-card active" : "choices-card"
                    }
                  />
                </div>
              ) : (
                <CardChoice
                  className="choices-card result"
                  src={can.photo}
                  name={can.name}
                  progress={
                    <ProgressBar
                      colour={
                        can.vote_precentage > 50
                          ? "#FC2574"
                          : can.vote_precentage <= 50
                          ? "#59FFC6"
                          : can.vote_precentage < 8
                          ? "#FF8656"
                          : can.vote_precentage < 10
                          ? "#A646DB"
                          : "#000"
                      }
                      percentage={can.vote_precentage}
                      total={can.total_votes}
                    />
                  }
                  total={can.total_votes}
                />
              )
            )}
          </div>

          {showButton && (
            <button
              className="btn-vote"
              onClick={() => {
                show();
                handleClick();
                openModal();
              }}
              style={{ backgroundColor: "#75153B" }}
            >
              تأكيد
            </button>
          )}

          {isLoading && (
            <button
              disabled
              className="btn-vote disabled"
              onClick={() => {
                show();
                handleClick();
                openModal();
              }}
              style={{ backgroundColor: "#75153B" }}
            >
              <FaSpinner icon="spinner" />
              تأكيد
            </button>
          )}

          <div className="share-container">
            <button onClick={handleClickBtn}>
              <img src="/images/comment.png" alt="" />
              <h4>التعليق على التصويت</h4>
            </button>
            <button onClick={handleOnClick}>
              <img src="/images/ShareImg.png" alt="" />
            </button>
          </div>

          {modalOpen && (
            <div className="background">
              <div className="modal-wrapper">
                <div className="modal-content">
                  <form>
                    <label>الاسم</label>
                    <input type="text" />
                    <label>أضف تعليقك</label>
                    <textarea rows="4" cols="50" />
                    <button style={{ backgroundColor: "#75153B" }}>
                      ارسال
                    </button>
                  </form>

                  <MdClose
                    className="close-btn"
                    aria-label="Close modal"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!results && [1, 2, 3].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}
