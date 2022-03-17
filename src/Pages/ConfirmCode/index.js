import Header from "../../Components/Header";
import { MdClose } from "react-icons/md";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import { FaSpinner } from "react-icons/fa";

export default function ConfirmCode({
  confirmCode,
  messageConfirm,
  sendCode,
  resendCode,
  InputPhone,
  setCodeInput,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSend, setModalSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function navigation() {
    messageConfirm?.status === true &&
      setTimeout(() => {
        navigate(-1);
      }, 1000);
  }

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(true);
    }, 1500);
  }
  return (
    <div className="confirm-code">
      <Header />

      <div className="code-container">
        <h2>التأكد من رقم هاتفك المحمول </h2>
        <p>
          أدخل كود التحقق الذي تم ارساله عبر الرسائل القصيرة على رقم الهاتف
          {InputPhone}
        </p>
        <div className="code-box">
          <ReactInputVerificationCode
            onChange={(newValue) => setCodeInput(newValue)}
          />
        </div>

        {!loading && (
          <button
            onClick={() => {
              handleClick();
              confirmCode();
              navigation();
            }}
          >
            ارسال
          </button>
        )}

        {loading && (
          <button
            disabled
            onClick={() => {
              handleClick();
              confirmCode();
              navigation();
            }}
          >
            <FaSpinner icon="spinner" />
            ارسال
          </button>
        )}
        <button
          className="send-again"
          onClick={() => {
            sendCode();
            setModalSend(true);
          }}
        >
          اعادة ارسال الكود
        </button>

        {messageConfirm?.status === true && (
          <>
            {modalOpen && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{messageConfirm?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {messageConfirm?.status === false && (
          <>
            {modalOpen && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{messageConfirm?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {resendCode?.status === false && (
          <>
            {modalSend && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{resendCode?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalSend(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {resendCode?.status === true && (
          <>
            {modalSend && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{resendCode?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalSend(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
