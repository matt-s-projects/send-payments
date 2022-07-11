import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import History from './components/History';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Home />
        <History />
      </div>
      <Footer />



    </div>
  );
}

export default App;
