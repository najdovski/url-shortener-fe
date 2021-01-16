import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

axios({
  method: 'get',
  url: `${process.env.REACT_APP_API_URL}${window.location.pathname}`,
})
.then(response => {
  window.location = response.data['original-url'];
})
.catch(() => {
  document.title = process.env.REACT_APP_NAME;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
