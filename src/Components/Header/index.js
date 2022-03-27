import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <button>
          <img src="/images/vote.png" alt="" />
          تصويتات عامة
        </button>
      </Link>
      <Link to="/" className="logo-container">
        <img src="/images/LogoQ.PNG" alt="" />
      </Link>
    </div>
  );
}
