import CountdownTimer from "../Timer/CountdownTimer.js";
import EndCard from "./EndCard.js";
import "./style.css";

export default function QuestionCard({
  end_at,
  question,
  company,
  numberVote,
  img,
  companyImg,
  numberTitle,
  voteContent,
  endCard,
  verifyUser,
  date,
  countTimer,
}) {
  return (
    <div>
      <div className="question-container" style={{ height: "121px" }}>
        {endCard && <EndCard end_at={end_at} />}

        {countTimer && <CountdownTimer date={date} />}

        <h4>{question}</h4>
        <div className="company-container">
          <img src={companyImg} alt="" />
          <h5>{company}</h5>
        </div>

        <div
          className="vote-number"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {verifyUser && (
            <div className="background-container">
              <img src="/images/verify-user.png" alt="" />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h6>{numberTitle}</h6>
            <h5>
              {numberVote} {voteContent}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
