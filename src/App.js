import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
  return (
    <div className="App d-flex flex-column vh-100">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
