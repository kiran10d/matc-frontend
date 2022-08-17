import { Routes, Route } from "react-router-dom";
import Router from "./Routes/Routes";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        {Router.map((route, key) => {
          return <Route key={key} path={route.path} element={route.element} />;
        })}
      </Routes>
    </>
  );
}

export default App;
