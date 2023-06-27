import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={<Home/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

