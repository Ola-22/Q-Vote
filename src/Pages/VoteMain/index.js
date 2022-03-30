import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";

export default function VoteMain({
  questions,
  allCategories,
  filter,
  menuItem,
  setMenuItem,
  allCategoriesIcon,
}) {
  const navigate = useNavigate();

  return (
    <div className="vote-main">
      <div className="headerPage">
        <button onClick={() => navigate(-1)}>
          <img src="/images/btnBack.png" alt="" />
        </button>

        <Link to="/" className="logo-container">
          <img src="/images/LogoQ.PNG" alt="" />
        </Link>
      </div>

      <>
        <Button
          button={allCategories}
          filter={filter}
          questions={questions}
          setMenuItem={setMenuItem}
          menuItem={menuItem}
          allCategoriesIcon={allCategoriesIcon}
        />

        <Menu menuItem={menuItem} questions={questions} />
      </>
    </div>
  );
}
