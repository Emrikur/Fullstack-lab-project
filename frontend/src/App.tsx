import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Contact from "./pages/Contact/Contact"
import TravelRoutes from "./pages/TravelRoutes/TravelRoutes"
import BookTrip from "./pages/BookTrip/BookTrip";

function App() {

return(
  <>
    <Router>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="booktrip" element={<BookTrip/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="travelroutes" element={<TravelRoutes/>}/>
      </Routes>

      <Footer/>
    </Router>
  </>
    )
}
export default App
