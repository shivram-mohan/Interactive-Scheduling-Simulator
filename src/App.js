import './App.css';
import Navbar from './navbar';
import Main from './main';
function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column"}}>
      <Navbar/>
      <Main/>
      <footer style={{display:"flex", flexDirection:"column", height:"100vh", fontFamily:"cursive"}}>@ Made by Shivram, Tapan, Renesh</footer>
    </div>
  );
}

export default App;
