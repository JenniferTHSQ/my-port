import React, { useState } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
} from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        displayName,
        avatarUrl,
      });

      alert("註冊成功！你現在可以登入了！");
      setEmail("");
      setPassword("");
      setDisplayName("");
      setAvatarUrl("");
      navigate("/login");
    } catch (error) {
      alert("註冊失敗：" + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">註冊帳號</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="暱稱 / 顯示名稱"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          placeholder="貼上 .jpg / .png 圖片網址作為頭貼"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          pattern=".*\.(jpg|jpeg|png)$"
          required
          className="w-full border p-2 rounded"
        />

        {/* 預覽區塊 */}
        {avatarUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">頭貼預覽：</p>
            <img
              src={avatarUrl}
              alt="頭貼預覽"
              className="w-20 h-20 object-cover rounded-full border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/80?text=無效圖片";
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          註冊
        </button>
      </form>
    </div>
  );
}