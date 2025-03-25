import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut, db, getDocs, collection } from "../firebase";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const navItemStyle = (path) =>
    `px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-yellow-800 text-white"
        : "text-white hover:bg-yellow-700"
    }`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 從 Firestore 拿對應使用者的 displayName 和 avatarUrl
        const userDocs = await getDocs(collection(db, "users"));
        const found = userDocs.docs.find((doc) => doc.id === user.uid);
        const data = found?.data();
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: data?.displayName || user.email,
          avatarUrl: data?.avatarUrl || "",
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-yellow-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className={navItemStyle("/")}>
            Home
          </Link>
          <Link to="/about" className={navItemStyle("/about")}>
            About
          </Link>
          <Link to="/fortune" className={navItemStyle("/fortune")}>
            Fortune 占卜
          </Link>
          <Link to="/login" className={navItemStyle("/login")}>
            Login
          </Link>
          <Link to="/register" className={navItemStyle("/register")}>
            Register
          </Link>
        </div>

        {userInfo && (
          <div className="flex items-center gap-2">
            <img
              src={userInfo.avatarUrl || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm">{userInfo.displayName}</span>
            <button
              onClick={handleLogout}
              className="ml-2 px-2 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
            >
              登出
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;