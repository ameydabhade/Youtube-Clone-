import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../redux/slices/configsSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 990);
  const auth = useSelector((state) => state.configs.auth);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 990);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    ...(auth.email
      ? [
          {
            section: "My Content",
            items: [{ icon: "📹", label: "My Channels", path: "/my-channels" }],
          },
        ]
      : []),
    {
      section: "Main",
      items: [
        { icon: "🏠", label: "Home" },
        { icon: "🔥", label: "Trending" },
        { icon: "📺", label: "Subscriptions" },
      ],
    },
    {
      section: "Library",
      items: [
        { icon: "📚", label: "Library" },
        { icon: "⏱️", label: "History" },
        { icon: "▶️", label: "Your Videos" },
        { icon: "⏰", label: "Watch Later" },
        { icon: "👍", label: "Liked Videos" },
      ],
    },
    {
      section: "Subscriptions",
      items: [
        { icon: "🎮", label: "Gaming" },
        { icon: "🎵", label: "Music" },
        { icon: "⚽", label: "Sports" },
        { icon: "📰", label: "News" },
      ],
    },
  ];

  const sidebarStyle = {
    width: isMobile ? "100%" : "240px",
    height: isMobile ? "100%" : "auto",
    position: isMobile ? "fixed" : "relative",
    top: isMobile ? 0 : "auto",
    left: isMobile ? 0 : "auto",
    backgroundColor: "white",
    zIndex: isMobile ? 1000 : 1,
    borderRight: "1px solid #e5e5e5",
    padding: "12px",
    overflowY: "auto",
  };

  return (
    <div style={sidebarStyle}>
      {isMobile && (
        <button
          onClick={() => dispatch(toggleSideBar())}
          style={{
            position: "absolute",
            right: "16px",
            top: "16px",
            padding: "8px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          ✕
        </button>
      )}

      {sidebarItems.map((section, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          <div
            style={{
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                onClick={() =>
                  item.label === "My Channels" && navigate("/channels")
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 24px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  hover: { backgroundColor: "#e5e5e5" },
                  ...(item.label === "My Channels" && {
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                    border: "1px solid #e0e0e0",
                    color: "#ff0000",
                  }),
                }}
              >
                <span style={{ marginRight: "24px" }}>{item.icon}</span>
                <span style={{ fontSize: "14px" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
