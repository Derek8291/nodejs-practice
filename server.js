// server.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 路由
app.use("/api/users", userRoutes);

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
