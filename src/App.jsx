import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { Route,Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import CreateOrder from './Components/CreateOrder';
import ExecuteBuy from './Components/ExecuteBuy';
import ExecuteSell from './Components/ExecuteSell';

function App() {
  return (
    <div className='App'>
    <ToastContainer/>
      {/* <CreateOrder/>    
      <ExecuteBuy/> */}
      {/* <ExecuteSell/> */}

      <Navbar></Navbar>
    <Routes>
      <Route path='/buy-orders' element={<ExecuteBuy/>}/>
      <Route path='/create-order' element={<CreateOrder/>}/>
      <Route path='/sell-orders' element={<ExecuteSell/>}/>
    </Routes>


    </div>
  );
}

export default App;
