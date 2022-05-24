import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      
      <Routes>
        <Route path='/' exact element={
        <>
        <Banner/>
        <Movies />
        </>
        }/>
        <Route path='/fav' exact element={<Favourites name='vishal'/>}/>
      </Routes>
    </Router>
    
    </>
    
  );
}

export default App;
