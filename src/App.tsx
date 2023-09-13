import './App.css'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/layout';

function App() { 
  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>  
            </Route>            
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default App
