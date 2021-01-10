import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  document.title = process.env.REACT_APP_NAME;
  return (
    <div className="App d-flex flex-column vh-100">
      <BrowserRouter>
        <Navbar />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
