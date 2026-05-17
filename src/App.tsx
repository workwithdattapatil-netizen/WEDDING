import Header from './components/Header'
import SaveTheDate from './components/SaveTheDate'
import Gallery from './components/Gallery'
import Ceremonies from './components/Ceremonies'
import RSVPForm from './components/RSVPForm'
import Footer from './components/Footer'
import FallingFlowers from './components/FallingFlowers'
import BackgroundMusic from './components/BackgroundMusic'
import './App.css'

function App() {
  return (
    <div className="invitation">
      <FallingFlowers />
      <BackgroundMusic />
      <Header />
      <SaveTheDate />
      <Gallery />
      <Ceremonies />
      <RSVPForm />
      <Footer />
    </div>
  )
}

export default App
