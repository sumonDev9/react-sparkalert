# 🎉 React SparkAlert
**@srkm/react-sparkalert** is a simple, lightweight, and fully customizable toast notification library built for React.

## ✨ Features

### 🎨 **Visual Excellence**
- 🌈 **3 Beautiful Themes** - Light, Dark, and Colored modes
- 🎭 **4 Smooth Animations** - Slide, Bounce, Zoom, and Flip transitions
- 📱 **Fully Responsive** - Perfect display on all screen sizes
- 🎯 **6 Position Options** - Place toasts anywhere on the screen
- 💫 **Smooth Animations** - Professional enter/exit animations

### 🚀 **Developer Experience**
- 📦 **Lightweight** - Minimal bundle size (~15KB minified + gzipped)
- 🔷 **TypeScript Support** - Fully typed for better DX
- ⚡ **Zero Dependencies** - Only requires React
- 🎯 **Easy Integration** - Simple API, quick setup
- 📚 **Comprehensive Documentation** - Detailed guides and examples

### 🎯 **Functionality**
- 🔔 **5 Toast Types** - Success, Error, Warning, Info, Loading
- ⏱️ **Auto-Dismiss** - Configurable auto-close timing
- 🖱️ **Interactive Controls** - Pause on hover, drag to dismiss
- 📊 **Progress Bar** - Visual countdown indicator
- 🎨 **Custom Styling** - Easy to customize with CSS
- 🔄 **Promise Support** - Handle async operations elegantly
- 🎯 **Multi-Position** - Display toasts at multiple positions simultaneously

### ♿ **Accessibility**
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support
- ✅ Proper contrast ratios
- ✅ Semantic HTML structure

---

## 📦 Installation

```bash
# Using npm
npm install @srkm/react-sparkalert

# Using yarn
yarn add @srkm/react-sparkalert

# Using pnpm
pnpm add @srkm/react-sparkalert
```

---

## 🚀 Quick Start

### Import CSS: Import the CSS file in your main entry file (like App.tsx/app.jsx, main.tsx/main.jsx, or layout.tsx/jsx for Next.js).

```tsx
import '@srkm/react-sparkalert/dist/index.css'
```

### 2 Add ToastContainer to your app

```tsx
import { ToastContainer } from '@srkm/react-sparkalert';

function App() {
  return (
    <>
      <YourApp />
      <ToastContainer />
    </>
  );
}

export default App;
```

### 3 Use toast anywhere in your app

```tsx
import { toast } from '@srkm/react-sparkalert';

function MyComponent() {
  const showToast = () => {
    toast.success('Operation successful!');
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

---

## 📖 Documentation

### Toast Types

```tsx
import { toast } from '@srkm/react-sparkalert';

// Success notification
toast.success('Profile updated successfully!');

// Error notification
toast.error('Failed to save changes');

// Warning notification
toast.warning('Please verify your email');

// Info notification
toast.info('New features available');

// Loading notification
toast.loading('Processing your request...');
```

### Position Options

Place toasts at 6 different positions:

```tsx
toast.success('Top Right!', { position: 'top-right' });
toast.success('Top Left!', { position: 'top-left' });
toast.success('Top Center!', { position: 'top-center' });
toast.success('Bottom Right!', { position: 'bottom-right' });
toast.success('Bottom Left!', { position: 'bottom-left' });
toast.success('Bottom Center!', { position: 'bottom-center' });
```

### Themes

Choose from 3 beautiful themes:

```tsx
// Light theme (default)
toast.success('Light theme', { theme: 'light' });

// Dark theme
toast.success('Dark theme', { theme: 'dark' });

// Colored theme
toast.success('Colored theme', { theme: 'colored' });
```

### Transition Effects

Apply smooth animations:

```tsx
toast.success('Slide transition', { transition: 'slide' });
toast.success('Bounce transition', { transition: 'bounce' });
toast.success('Zoom transition', { transition: 'zoom' });
toast.success('Flip transition', { transition: 'flip' });
```

### Auto Close

Control when toasts disappear:

```tsx
// Auto close after 5 seconds
toast.success('Will close in 5s', { autoClose: 5000 });

// Disable auto close
toast.info('Will not auto close', { autoClose: false });

// Default is 5000ms (5 seconds)
toast.success('Default timing');
```

### Interactive Features

```tsx
// Pause on hover (default: true)
toast.success('Hover to pause', { pauseOnHover: true });

// Disable pause on hover
toast.info('Cannot pause', { pauseOnHover: false });

// Enable dragging (default: true)
toast.success('Drag to dismiss', { draggable: true });

// Disable dragging
toast.info('Cannot drag', { draggable: false });
```

### Dismiss Toasts

```tsx
// Get toast ID
const toastId = toast.info('This can be dismissed');

// Dismiss specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismissAll();
```

### Update Existing Toast

```tsx
const toastId = toast.loading('Uploading file...');

// Update after some time
setTimeout(() => {
  toast.update(toastId, {
    type: 'success',
    message: 'File uploaded successfully!',
    autoClose: 3000,
  });
}, 2000);
```

### Promise Support

Handle async operations elegantly:

```tsx
const myPromise = fetch('/api/data');

toast.promise(
  myPromise,
  {
    loading: 'Loading data...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data',
  }
);

// With dynamic messages
toast.promise(
  fetchUsers(),
  {
    loading: 'Fetching users...',
    success: (data) => `Loaded ${data.length} users`,
    error: (err) => `Error: ${err.message}`,
  }
);
```

### Custom JSX Content

```tsx
toast.success(
  <div>
    <strong>Success!</strong>
    <p>Your changes have been saved.</p>
  </div>
);

toast.error(
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span>❌</span>
    <div>
      <strong>Error occurred</strong>
      <p>Please try again later</p>
    </div>
  </div>
);
```

### Custom Styling

```tsx
// Custom CSS class
toast.success('Custom styled', {
  className: 'my-custom-toast',
  bodyClassName: 'my-custom-body',
  progressClassName: 'my-custom-progress'
});

// Inline styles
toast.info('Inline styled', {
  style: {
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: 'white',
  }
});
```

### Callbacks

```tsx
toast.success('With callbacks', {
  onOpen: () => console.log('Toast opened'),
  onClose: () => console.log('Toast closed'),
});
```

---

## ⚙️ ToastContainer Props

Configure the container with these props:

```tsx
<ToastContainer
  position="top-right"        // Default position
  autoClose={5000}            // Default auto close time
  pauseOnHover={true}         // Pause on hover
  draggable={true}            // Enable dragging
  closeButton={true}          // Show close button
  progressBar={true}          // Show progress bar
  theme="colored"             // Theme: light | dark | colored
  transition="flip"           // Animation: slide | bounce | zoom | flip
  limit={5}                   // Max toasts visible
  newestOnTop={true}          // Stack order
  className="custom-container" // Custom CSS class
  style={{}}                  // Inline styles
/>
```

### Props Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'top-right'` | Default position for toasts |
| `autoClose` | `number \| false` | `5000` | Auto close time in ms (false to disable) |
| `pauseOnHover` | `boolean` | `true` | Pause timer on hover |
| `draggable` | `boolean` | `true` | Enable drag to dismiss |
| `closeButton` | `boolean` | `true` | Show close button |
| `progressBar` | `boolean` | `true` | Show progress bar |
| `theme` | `'light' \| 'dark' \| 'colored'` | `'colored'` | Toast theme |
| `transition` | `'bounce' \| 'slide' \| 'zoom' \| 'flip'` | `'flip'` | Animation type |
| `limit` | `number` | `5` | Max number of toasts |
| `newestOnTop` | `boolean` | `true` | Stack order |
| `className` | `string` | `''` | Custom CSS class |
| `style` | `React.CSSProperties` | `{}` | Inline styles |

---

## 🎯 Toast Options

Per-toast configuration:

```tsx
toast.success('Message', {
  position: 'top-right',      // Position
  autoClose: 5000,            // Auto close time
  pauseOnHover: true,         // Pause on hover
  draggable: true,            // Draggable
  closeButton: true,          // Close button
  progressBar: true,          // Progress bar
  theme: 'colored',           // Theme
  transition: 'flip',         // Transition
  icon: <CustomIcon />,       // Custom icon (or false to hide)
  className: 'custom-toast',  // Custom class
  bodyClassName: 'body',      // Body class
  progressClassName: 'prog',  // Progress class
  style: {},                  // Inline styles
  onOpen: () => {},          // Open callback
  onClose: () => {},         // Close callback
});
```

### Options Table

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'loading'` | - | Toast type |
| `position` | `ToastPosition` | `'top-right'` | Toast position |
| `autoClose` | `number \| false` | `5000` | Auto close time |
| `pauseOnHover` | `boolean` | `true` | Pause on hover |
| `draggable` | `boolean` | `true` | Enable dragging |
| `closeButton` | `boolean` | `true` | Show close button |
| `progressBar` | `boolean` | `true` | Show progress bar |
| `theme` | `'light' \| 'dark' \| 'colored'` | `'colored'` | Theme |
| `transition` | `'bounce' \| 'slide' \| 'zoom' \| 'flip'` | `'flip'` | Animation |
| `icon` | `ReactNode \| false` | - | Custom icon |
| `className` | `string` | - | Custom CSS class |
| `bodyClassName` | `string` | - | Body CSS class |
| `progressClassName` | `string` | - | Progress CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `onOpen` | `() => void` | - | Open callback |
| `onClose` | `() => void` | - | Close callback |

---

## 💡 Usage Examples

### Basic Example

###  Import CSS: Import the CSS file in your main entry file (like App.tsx/jsx, main.tsx/jsx, or layout.tsx/jsx for Next.js).
```tsx
import '@srkm/react-sparkalert/dist/index.css'
```
```tsx
import { toast, ToastContainer } from '@srkm/react-sparkalert';

function App() {
  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <ToastContainer />
    </div>
  );
}
```

### Form Submission

```tsx
const handleSubmit = async (data) => {
  const submitPromise = api.submitForm(data);
  
  toast.promise(
    submitPromise,
    {
      loading: 'Submitting form...',
      success: 'Form submitted successfully!',
      error: 'Failed to submit form',
    }
  );
};
```

### Multi-Step Process

```tsx
const processData = async () => {
  const step1 = toast.loading('Step 1: Validating...');
  
  await validate();
  toast.update(step1, {
    type: 'success',
    message: 'Step 1: Validated ✓',
    autoClose: 2000
  });
  
  const step2 = toast.loading('Step 2: Processing...');
  await process();
  toast.update(step2, {
    type: 'success',
    message: 'Step 2: Processed ✓',
    autoClose: 2000
  });
  
  toast.success('All steps completed!');
};
```

### Notification System

```tsx
const NotificationButton = () => {
  const notify = () => {
    toast.info('You have 3 new messages', {
      position: 'top-right',
      autoClose: 5000,
      icon: <BellIcon />,
    });
  };

  return <button onClick={notify}>Check Notifications</button>;
};
```

---

## 🎨 Custom Styling

### Using CSS Classes

```css
/* styles.css */
.my-custom-toast {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.my-custom-body {
  font-weight: 600;
  font-size: 16px;
}
```

```tsx
toast.success('Custom styled!', {
  className: 'my-custom-toast',
  bodyClassName: 'my-custom-body',
});
```

### Using Inline Styles

```tsx
toast.success('Inline styled!', {
  style: {
    background: '#1e293b',
    color: '#f1f5f9',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '16px',
  }
});
```

---

## 🔧 Advanced Usage

### Context-Based Notifications

```tsx
import { createContext, useContext } from 'react';
import { toast } from '@srkm/react-sparkalert';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notify = {
    success: (msg) => toast.success(msg, { position: 'top-right' }),
    error: (msg) => toast.error(msg, { position: 'top-right' }),
    info: (msg) => toast.info(msg, { position: 'bottom-left' }),
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
```

### Global Error Handler

```tsx
useEffect(() => {
  const handleError = (error) => {
    toast.error(error.message, {
      position: 'top-center',
      autoClose: false,
    });
  };

  window.addEventListener('error', handleError);
  return () => window.removeEventListener('error', handleError);
}, []);
```

---

## 📱 Responsive Design

React SparkAlert is fully responsive and works perfectly on all devices:

- ✅ **Desktop** - Full-width toasts with all features
- ✅ **Tablet** - Optimized layout and spacing
- ✅ **Mobile** - Touch-friendly, swipe to dismiss

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

---

## 📚 API Reference

### `toast` Methods

```tsx
toast.success(message, options?)   // Show success toast
toast.error(message, options?)     // Show error toast
toast.warning(message, options?)   // Show warning toast
toast.info(message, options?)      // Show info toast
toast.loading(message, options?)   // Show loading toast
toast.dismiss(id)                  // Dismiss specific toast
toast.dismissAll()                 // Dismiss all toasts
toast.update(id, options)          // Update existing toast
toast.promise(promise, messages, options?) // Handle promise
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
---

## 📝 License
MIT © Sumon Mitra (SRKM)
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by popular toast libraries
- Built with ❤️ for the React community
- Thanks to all contributors

---

## 📧 Support

- 📧 Email: sumonmit678@gmail.com

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@srkm/react-sparkalert)
- [GitHub Repository](https://github.com/sumonDev9/react-sparkalert)


---

<div align="center">

**Made with ❤️ by [Sumon Mitra](https://github.com/sumonDev9)**

⭐ Star us on [GitHub](https://github.com/sumonDev9/react-sparkalert) if you like this project!

</div>