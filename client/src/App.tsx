import "./App.css";
import CreateFeed from "./CreateFeed";
import Feed from "./Feed";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Feed />
              <CreateFeed />
            </>
          }
        />
      </Routes>
    </div>
  </div>
);

export default App;
