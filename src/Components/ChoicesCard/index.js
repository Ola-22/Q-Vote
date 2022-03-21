import "./style.css";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function ChoicesCard({
  src,
  name,
  onClick,
  className,
  description,
  progressBar,
  progress,
  total,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClickBtn() {
    setTimeout(() => {
      setModalOpen(true);
    }, 100);
  }

  return (
    <div className={className} onClick={onClick}>
      <img
        className="exclamation"
        src="/images/exclamation.png"
        alt=""
        onClick={handleClickBtn}
      />
      <img src={src} alt="" />
      <div className="name-content">
        <h4>{name}</h4>
      </div>

      {/* <div className="main-card"> */}
      {progressBar && (
        <>
          {progress}
          <span className="total">{total}صوت</span>
        </>
      )}
      {/* </div> */}
      {/* </div> */}

      {modalOpen && (
        <div className="background">
          <div className="modal-wrapper">
            <div className="modal-content card-desc">
              <div className="box">
                <h1>معلومات عن المرشح</h1>
                <MdClose
                  className="close-btn"
                  aria-label="Close modal"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                />
              </div>
              <div className="desc-content">{description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
