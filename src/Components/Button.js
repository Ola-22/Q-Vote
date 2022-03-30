import React, { useEffect, useState } from "react";

function Button({ button, filter, questions, setMenuItem, allCategoriesIcon }) {
  const [active, setActive] = useState(0);

  function someFunct(index) {
    setActive(index);
  }

  useEffect(() => {
    if (active === 0) {
      setMenuItem(questions);
    }
  });

  const CategoriesData = Array.from(
    new Set(allCategoriesIcon.map((a) => a.id))
  ).map((id) => allCategoriesIcon.find((a) => a.id === id));

  return (
    <div className="buttons">
      {button?.map((cat, i) => {
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              filter(cat);
              someFunct(i);
            }}
            onChange={() => filter(cat)}
            className={active === i ? "btn active" : "btn"}
          >
            {CategoriesData?.map(
              (x) => x.title === cat && <img key={x.id} src={x.icon} alt="" />
            )}
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default Button;
