import React from "react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import moment from "moment";

function Menu({ menuItem }) {
  const menuItemNew = menuItem?.filter((qu) => qu.type === "public");

  return (
    <div className="item">
      {menuItemNew?.map((qu) => (
        <Link to={`/vote-main/${qu.slug}`} key={qu.id}>
          <QuestionCard
            verifyUser
            countTimer
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/Group.png"
            numberTitle="عدد المصوتين"
            numberVote={qu.total_votes}
            voteContent="صوت"
            date={qu.end_at}
            src="/images/timer.png"
          />
        </Link>
      ))}
    </div>
  );
}

export default Menu;
