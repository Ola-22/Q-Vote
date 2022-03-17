import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({
  postData,
  showModal,
  setShowModal,
  message,
  setInput,
  Input,
  setName,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  function handleChange(e) {
    if (Input.length < 8) {
      setError("*حقل الهاتف مطلوب");
    } else {
      setError("");
    }

    if (Input.length === 8 && message?.status === true) {
      setTimeout(() => {
        setShowModal(false);
        navigate("/confirm-code");
      }, 1000);
    }
  }

  return (
    <>
      {showModal && (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <form onSubmit={handleChange}>
                <div className="name-container">
                  <label htmlFor="name"> الاسم:</label>
                  <input
                    type="text"
                    placeholder="ادخل الاسم"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="phone-container">
                  <label htmlFor="phone"> رقم الهاتف:</label>{" "}
                  <div
                    className={
                      error !== "" ? "input-phone borderError" : "input-phone"
                    }
                  >
                    <div className="logo-qatar">
                      <img
                        src="/images/Qatar.jpg"
                        width="15"
                        height="15"
                        alt=""
                      />
                    </div>
                    <h6>974</h6>
                    <input
                      name="phone"
                      className="phone-input"
                      type="tel"
                      maxLength="8"
                      onChange={(e) => setInput(e.target.value)}
                      value={Input}
                      required
                    />
                  </div>
                </div>
                <h4 className="error">{error}</h4>

                {!loading && (
                  <button
                    onClick={() => {
                      handleClick();
                      postData();
                      handleChange();
                    }}
                  >
                    تأكيد
                  </button>
                )}

                {loading && (
                  <button
                    disabled
                    onClick={() => {
                      handleClick();
                      postData();
                      handleChange();
                    }}
                  >
                    <FaSpinner icon="spinner" />
                    تأكيد
                  </button>
                )}

                {message?.status === false && (
                  <>
                    <h6 className="message-content">{message?.message}</h6>
                  </>
                )}
                {message?.status === true && (
                  <>
                    <h6 className="message-content">{message?.message}</h6>
                  </>
                )}
              </form>
            </div>

            <MdClose
              className="close-btn"
              aria-label="Close modal"
              onClick={() => {
                setShowModal((prev) => !prev);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
