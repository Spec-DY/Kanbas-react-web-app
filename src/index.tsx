import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 如果 `App` 是你的顶层组件，你可以继续使用它
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'; // 导入 Provider
import store from './Kanbas/store'; // 导入 Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* 用 Provider 包裹 App 组件 */}
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
