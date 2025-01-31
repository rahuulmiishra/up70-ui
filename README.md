# up70-ui Component Library

installation

## npm install up70-ui@latest

This library provides a collection of reusable React components to accelerate your development process.

## Components

### 1. Toast

The `Toast` component displays non-intrusive notifications to the user.

**Props:**

| Prop          | Type              | Description                                                                    | Default     |
| ------------- | ----------------- | ------------------------------------------------------------------------------ | ----------- |
| `type`        | `string`          | Type of toast notification: `info`, `danger`, or `success`.                    | `info`      |
| `position`    | `string`          | Position of the toast: `top-right`, `top-left`, `bottom-right`, `bottom-left`. | `top-right` |
| `cta`         | `JSX` or `string` | Call-to-action element or text within the toast.                               | `null`      |
| `title`       | `string`          | Title of the toast notification.                                               | `null`      |
| `description` | `string`          | Description of the toast notification.                                         | `null`      |

**Usage:**

The `Toast` component utilizes a Context Provider for managing and displaying toasts. This allows for easy integration throughout your application. There are two ways to use the Toast: with the provider and without it.

#### Usage with Provider Context

1.  **Setup (Wrapping your application):**

    ```javascript
    import { Toast } from "up70-ui";

    function App() {
      return (
        <Toast.ToastProvider>
          <YourWholeApp />
        </Toast.ToastProvider>
      );
    }

    export default App;
    ```

2.  **Consumption (Adding a toast):**

    ```javascript
    import { Toast } from "up70-ui";

    function YourApp() {
      const addNotification = Toast.useNotification();

      return (
        <button
          onClick={() => {
            addNotification({
              title: "Test",
              type: "danger",
              description: "A test notification!",
            }); // Include description
          }}
        >
          Show Toast
        </button>
      );
    }

    export default YourApp;
    ```

#### Usage without Provider Context (Directly)

This usage is less recommended as it bypasses the context and can lead to less predictable behavior if multiple calls are made quickly.

```javascript
import { addToast, Toast } from "up70-ui";

function App() {
  return (
    <div>
      <button
        onClick={() => {
          addToast({
            title: "Test from Direct Call",
            description: "A direct notification!",
          }); // Include description
        }}
      >
        Show Toast Directly
      </button>

      <Toast.ToastProvider>
        <YourWholeApp />
      </Toast.ToastProvider>
    </div>
  );
}

export default App;
```
