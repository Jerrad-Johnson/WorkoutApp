import './App.css';
import Home from './Home'
import Nav from './Nav'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Playground from "./Playground";
let cc = console.log;

let stuff: number[] = [5, 4, 3];
let entries: JSX.Element[] = stuff.map((e) => {
    return (
        <>
            {e}
        </>
    );
});

function App() {

  return (
    <div className="container">
      <header className="App-header">
          <BrowserRouter>
              <Nav />
              <Routes>
                  <Route path={""} element={<Home />} />
                  {/*<Route path={"Playground"} element={<Playground />} />*/}
                  {/*<Route path={"Test"} element={<Test />} />*/}
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
