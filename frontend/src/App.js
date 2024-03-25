import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUP from './screens/SignUP';
import { CartProvider } from './components/contextreducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
       <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route exact path='/login' element={<Login/>}/>
         <Route exact path='/createuser' element={<SignUP/>}/>
         <Route exact path='/myorder' element={<MyOrder/>}/>
       </Routes>

      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
