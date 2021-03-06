import Header from "../../Components/Header";
import QuestionCard from "../../Components/QuestionCard";
import "./style.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import SkeletonArticle from "../../Components/Skeletons/SkeletonArticle";
import ChoicesCard from "../../Components/ChoicesCard";
import { FaSpinner } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ProgressBar from "../../Components/Progress";

export default function EndVote({
  openModal,
  handleRemoveItem,
  select,
  setShowButton,
  setQuestionId,
  setMessage,
  show,
  showButton,
  isLoading,
  handleClick,
  setComment,
  setNameComment,
  sendComment,
  setQuId,
  setOptions,
  setSelect,
  check,
}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleClickBtn() {
    setTimeout(() => {
      setModalOpen(true);
    }, 100);
  }

  function handleClickLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        {new Date(results?.end_at) > new Date() && (
          <>
            <h6>متبقي لانتهاء التصويت</h6>
            {results && <QuestionCard countTimer date={results?.end_at} />}
          </>
        )}
      </div>
      {results && (
        <div>
          <QuestionCard
            endCard
            question={results.question}
            end_at={moment(results.end_at).format("LLL")}
            company={results?.company?.company}
            companyImg={results?.company?.company_image}
          />
          <h5 className="title-main">المرشحين</h5>
          <div className="choices">
            {results.candidates.map((can, i) =>
              new Date(results?.end_at) > new Date() ? (
                <div key={i} onClick={() => setShowButton(true)}>
                  <ChoicesCard
                    key={can.id}
                    src={can.photo}
                    voteNumber={can.total_votes}
                    RateVote={can.vote_precentage}
                    name={can.name}
                    onClick={(e) => {
                      setQuestionId(results.id);
                      setOptions(results?.candidates.length);
                      setMessage(false);

                      select.some((el) => el === can.id) === false
                        ? setSelect([...select, can.id])
                        : handleRemoveItem(can.id);
                    }}
                    className={
                      select.some((el) => el === can.id) === true
                        ? "choices-card active"
                        : "choices-card"
                    }
                    description={can.description}
                  />
                </div>
              ) : (
                <div className="main-card">
                  <ChoicesCard
                    className="choices-card result"
                    src={can.photo}
                    name={can.name}
                    progressBar
                    progress={
                      <ProgressBar
                        colour={
                          can.vote_precentage <= 20
                            ? "#FC2574"
                            : can.vote_precentage <= 40
                            ? "#FF8656"
                            : can.vote_precentage < 60
                            ? "#A646DB"
                            : can.vote_precentage >= 60
                            ? "#59FFC6"
                            : "#000"
                        }
                        percentage={can.vote_precentage}
                        total={can.total_votes}
                      />
                    }
                    total={can.total_votes}
                  />
                </div>
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
                setShowButton(false);
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
            <button
              onClick={() => {
                handleClickBtn();
                setQuId(results?.id);
              }}
            >
              <img src="/images/comment.png" alt="" />
              <h4>التعليق على التصويت</h4>
            </button>
            <button onClick={handleOnClick}>
              <img src="/images/ShareImg.png" alt="" />
            </button>
          </div>
          {/* {ErrorSelect && (
            <div className="background">
              <div className="modal-wrapper">
                <div className="modal-content">
                  لا يمكنك التصويت أكثر من مرتين
                </div>
              </div>
            </div>
          )} */}
          {modalOpen && (
            <div className="background">
              <div className="modal-wrapper">
                <div className="modal-content">
                  <form>
                    <div className="name-container">
                      <label>الاسم</label>
                      <input
                        onChange={(e) => setNameComment(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="name-container">
                      <label>أضف تعليقك</label>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        cols="50"
                      />
                    </div>

                    {!loading && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleClickLoading();
                          sendComment();
                          setTimeout(() => navigate("/comments"), 1500);
                        }}
                      >
                        ارسال
                      </button>
                    )}

                    {loading && (
                      <button
                        disabled
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        <FaSpinner icon="spinner" />
                        ارسال
                      </button>
                    )}
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
