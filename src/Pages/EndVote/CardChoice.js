import "./style.css";

export default function CardChoice({
  src,
  name,
  progress,
  voteNumber,
  RateVote,
  className,
  total,
}) {
  return (
    <div className="main-card">
      <div className={className}>
        <img className="exclamation" src="/images/exclamation.png" alt="" />
        <img src={src} alt="" />
        <div className="name-content">
          <h4>{name}</h4>
        </div>
        {progress}
        <span className="total">{total}صوت</span>
      </div>
    </div>
  );
}
