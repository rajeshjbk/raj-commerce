import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./Router/AllRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "90vh" }}>
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
