import "./style.css";

import Success from "../../../assets/toast/success.png";
import Alert from "../../../assets/toast/alert.png";
import Info from "../../../assets/toast/info.png";

const NotificationTypes = {
  info: Info,
  danger: Alert,
  success: Success,
};

function Notification({
  id = "",
  title = "",
  description = "",
  onRemove,
  cta = "",
  type = "success",
  updateToasts = () => {},
  exiting,
  progress,
  handlePauseNotification,
  handleResumeProgressNotification,
}) {
  function handleRemove() {
    updateToasts(id);
  }

  function handleMouseOver() {
    handlePauseNotification(id);
  }

  function handleMouseOut() {
    handleResumeProgressNotification(id);
  }

  function handleAnimationEnd() {
    onRemove(id);
  }

  let className = "toast";
  if (exiting) {
    className += " exiting-toast";
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onAnimationEnd={handleAnimationEnd}
      data-type={type}
      className={className}
      role="alert"
    >
      {!!onRemove && (
        <button onClick={handleRemove} className="toast-close">
          &times;
        </button>
      )}
      <div className="toast-content">
        <div className="toast-info">
          <img src={NotificationTypes[type]} height={"24px"} width={"24px"} />
          <div className="toast-title-desc">
            <span>{title}</span>
            {!!description && <span>{description}</span>}
          </div>
        </div>
        {!!cta && <div className="toast-cta">{cta}</div>}
      </div>
      <div style={{ width: `${progress}%` }} className="toast-progress"></div>
    </div>
  );
}

export default Notification;
