import "./style.css";

export default function CardChoice({
  src,
  name,
  progress,
  voteNumber,
  RateVote,
}) {
  return (
    <div className="choices-card result">
      <img className="exclamation" src="/images/exclamation.png" alt="" />
      <img src={src} alt="" />
      <div className="name-content">
        <h4>{name}</h4>
      </div>
      {progress}
    </div>
  );
}
