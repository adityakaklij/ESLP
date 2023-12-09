import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateOrder from './Components/CreateOrder';
import ExecuteBuy from './Components/ExecuteBuy';
import ExecuteSell from './Components/ExecuteSell';

function App() {
  return (
    <div className='App'>
    <ToastContainer/>
      <CreateOrder/>    
      <ExecuteBuy/>
      {/* <ExecuteSell/> */}
    </div>
  );
}

export default App;
