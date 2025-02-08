import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignUpPage";
import { VideoPlayer } from "./pages/VideoPlayer";
import Header from "./components/Header";
import { useEffect } from "react";
import { setAuth } from "./redux/slices/configsSlice";
import { useDispatch } from "react-redux";
import { Channels } from "./pages/Channels";
import { ChannelPage } from "./pages/ChannelPage";

const checkAuth = (dispatch) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    dispatch(setAuth(JSON.parse(auth)));
  }
};
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/watch/:videoId"
        element={
          <>
            <Header />
            <VideoPlayer />
          </>
        }
      />
      <Route
        path="/channels"
        element={
          <>
            <Header />
            <Channels />
          </>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <>
            <Header />
            <ChannelPage />
          </>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
