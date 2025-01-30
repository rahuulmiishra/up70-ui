import Notification from "./notification/notification";

function ToastContainer({
  toasts = [],
  onRemove,
  updateToasts,
  handlePauseNotification,
  handleResumeProgressNotification,
}) {
  const position = toasts?.[0]?.position || "top-right";

  return (
    <div data-position={position} className="toast-container">
      {toasts.map((toast) => {
        return (
          <Notification
            updateToasts={updateToasts}
            onRemove={onRemove}
            handlePauseNotification={handlePauseNotification}
            handleResumeProgressNotification={handleResumeProgressNotification}
            {...toast}
            key={toast.id}
          />
        );
      })}
    </div>
  );
}

export default ToastContainer;
