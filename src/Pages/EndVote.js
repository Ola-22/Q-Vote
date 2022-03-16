import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import "./style.css";
import moment from "moment";
import { Link } from "react-router-dom";

export default function EndVote({ questions }) {
  console.log("R", questions);
  return (
    <div className="end-vote">
      <Header />
      <div className="timer-vote">
        <h6>متبقي لانتهاء التصويت</h6>
      </div>
      {questions?.map((qu) => (
        <>
          <Link to={`/vote-main/${qu.slug}`} key={qu.id}>
            <QuestionCard
              question={qu.question}
              end_at={moment(qu.end_at).format("LLL")}
              companyImg="/images/company.png"
              company={qu.company}
            />
          </Link>
        </>
      ))}
    </div>
  );
}
