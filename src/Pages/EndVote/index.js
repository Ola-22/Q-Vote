import Header from "../../Components/Header";
import QuestionCard from "../../Components/QuestionCard";
import "./style.css";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import SkeletonArticle from "../../Components/Skeletons/SkeletonArticle";
import ChoicesCard from "../../Components/ChoicesCard";

export default function EndVote({ openModal }) {
  const { slug } = useParams();

  const [results, setResults] = useState();

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
            {results.candidates.map((can) => (
              <div key={can.id} onClick={openModal}>
                <ChoicesCard
                  src={can.photo}
                  voteNumber={can.total_votes}
                  RateVote={can.vote_precentage}
                  name={can.name}
                />
              </div>
            ))}
          </div>

          <div className="share-container">
            <button>
              <img src="/images/comment.png" alt="" />
              <h4>التعليق على التصويت</h4>
            </button>
            <button onClick={handleOnClick}>
              <img src="/images/ShareImg.png" alt="" />
            </button>
          </div>
        </div>
      )}
      {!results && [1, 2, 3].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}
