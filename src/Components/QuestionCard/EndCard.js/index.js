export default function EndCard({ end_at }) {
  return (
    <div className="end-vote">
      <img src="/images/calender.png" alt="" />
      <h5 style={{ color: "#b6b6b6" }} className="date-vote">
        ينتهي التصويت في
        <span>{end_at}</span>
      </h5>
    </div>
  );
}
