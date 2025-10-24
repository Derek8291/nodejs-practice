// server.js
const express = require("express");
const cors = require("cors");
const app = express();

// 假資料（模擬資料庫）
let users = [
  { id: 1, name: "小明", email: "ming@example.com" },
  { id: 2, name: "小華", email: "hua@example.com" },
];
let nextId = 3;

// 中間件
app.use(cors());
app.use(express.json());

// GET 全部用戶
app.get("/api/users", (req, res) => {
  console.log("Fetching all users");
  res.json(users);
});

// GET 單一用戶
app.get("/api/users/:id", (req, res) => {
  console.log("Request params:", req.params);
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST 新增用戶
app.post("/api/users", (req, res) => {
  console.log("Request body:", req.body);
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT 修改用戶
app.put("/api/users/:id", (req, res) => {
  console.log("Updating user ID:", req.params.id, "with data:", req.body);
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// DELETE 刪除用戶
app.delete("/api/users/:id", (req, res) => {
  console.log("Deleting user ID:", req.params.id);
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
