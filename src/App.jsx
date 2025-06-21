import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar/>
      <div className='min-h-[87vh] mb-3'>
      <Manager/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
