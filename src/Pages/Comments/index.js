import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import axiosInstance from "../../helpers/axios";

export default function Comments({ quId, questions }) {
  // console.log("rds", quId);
  const [comment, setComment] = useState();

  useEffect(() => {
    axiosInstance
      .post("/comments", { vote_id: quId })
      .then((res) => {
        // console.log(res.data.items);
        setComment(res.data.items);
        // console.log(comment?.map((c) => c.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header />
      {comment?.map((c) => c.name)}
    </div>
  );
}
