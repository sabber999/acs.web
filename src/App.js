import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <div>
      <Header/>
      <SearchComponent/>
      <Footer/>
    </div>
  );
}

export default App;
