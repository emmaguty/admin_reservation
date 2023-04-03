import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import "./style/dark.scss";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>}
            />
            <Route path="users">
              <Route index element={<ProtectedRoutes>
                <List columns={userColumns}/>
              </ProtectedRoutes>} />
              <Route path=":userId" element={<ProtectedRoutes>
                <Single />
              </ProtectedRoutes>} />
              <Route
                path="new"
                element={<ProtectedRoutes>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={hotelColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewHotel  />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<ProtectedRoutes>
                <List columns={roomColumns}/>
              </ProtectedRoutes>} />
              <Route path=":productId" element={
                <ProtectedRoutes>
                  <Single />
                </ProtectedRoutes>
              } />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewRoom />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
