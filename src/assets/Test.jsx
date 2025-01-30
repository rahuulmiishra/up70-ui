import { Toast } from "frontend-c-1";

let idx = 0;

const Data = [
  {
    type: "success",
    title: "Learning React is Fun",
  },
  {
    type: "danger",
    title: "Learning React is Hard",
  },
  {
    type: "info",
    title: "Being Frontend Master",
    description: "One step closer, day by day",
  },
];

function Test2() {
  const { addNotification } = Toast.useNotification();

  return (
    <button
      onClick={() => {
        addNotification(Data[idx++]);

        if (idx === 3) {
          idx = 0;
        }
      }}
    >
      Test from Library
    </button>
  );
}

export default Test2;
