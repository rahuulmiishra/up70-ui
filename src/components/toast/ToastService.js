class ToastService {
  _sendNotification = null;

  registerNotification = (fn) => {
    this._sendNotification = fn;
  };

  sendToast = (data) => {
    if (this._sendNotification) {
      this._sendNotification(data);
    } else {
      console.error("No Add Toast Function");
    }
  };
}

const toastService = new ToastService();

export default toastService;
