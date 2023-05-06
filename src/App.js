import logo from './logo.svg';
import './App.css';
import Rountercom from "./Component/All Rounter/Rountercom.jsx"
import ChatProvider from "./CreateContext"
function App() {

  return (
    <div className="App">
       < ChatProvider>
     <Rountercom/>
      </ChatProvider >
    </div>
  );
}

export default App;
