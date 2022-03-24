import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import axiosInstance from "../../helpers/axios";
import "./style.css";

export default function Comments({ quId, questions }) {
  const [comment, setComment] = useState();

  useEffect(() => {
    axiosInstance
      .post("/comments", { vote_id: quId })
      .then((res) => {
        setComment(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quId]);

  return (
    <div className="comments-main">
      <Header />
      <h3>التعليقات:</h3>
      {comment?.map((c) => (
        <div className="box-comments" key={c.id}>
          <img src="/images/user.png" alt="" />
          <div>
            <h3>{c.name}</h3>
            <p>{c.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
