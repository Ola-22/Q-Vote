import "./style.css";

export default function ChoicesCard({
  src,
  name,
  onClick,
  className,
  progress,
  voteNumber,
  RateVote,
  openModal,
}) {
  return (
    <div className={className} onClick={onClick}>
      <img className="exclamation" src="/images/exclamation.png" alt="" />
      <img src={src} alt="" />
      <div className="name-content">
        <h4>{name}</h4>
        <div>{progress}</div>
      </div>
    </div>
  );
}
