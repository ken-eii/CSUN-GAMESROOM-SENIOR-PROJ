import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Computers from './pages/computers'
import Consoles from './pages/consoles'
import PoolTables from './pages/poolTables'
import ContactUs from './pages/contact'

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/consoles" element={<Consoles/>}/>
          <Route path="/computers" element={<Computers/>}/>
          <Route path="/pooltables" element={<PoolTables/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
        </Routes>

      </BrowserRouter>

    </div>
  )

}

export default App;
