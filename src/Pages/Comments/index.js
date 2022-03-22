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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="comments-main">
      <Header />
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
