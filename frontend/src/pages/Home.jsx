import { useSelector } from "react-redux";
import { Body } from "../components/Body";
import Header from "../components/Header";
import { SideBar } from "../components/Sidebar";

export const Home = () => {
  const sideBarOpen = useSelector((state) => state.configs.sideBarOpen);
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />

      <div style={{ display: "flex", backgroundColor: "#f9f9f9", flex: 1 }}>
        {sideBarOpen && <SideBar />}

        <Body />
      </div>
    </div>
  );
};
