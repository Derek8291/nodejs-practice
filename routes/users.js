// routes/users.js
const express = require("express");
const router = express.Router();

// 假資料（模擬資料庫）
let users = [
  { id: 1, name: "小明", email: "ming@example.com" },
  { id: 2, name: "小華", email: "hua@example.com" },
];
let nextId = 3;

// GET 全部用戶
router.get("/", (req, res) => {
  console.log("Fetching all users");
  res.json(users);
});

// GET 單一用戶
router.get("/:id", (req, res) => {
  console.log("Request params:", req.params);
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST 新增用戶
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  console.log("Deleting user ID:", req.params.id);
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

module.exports = router;
