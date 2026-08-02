import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { pool } from "./db.js";
import { insertUser, getUserByEmail } from "./users.js";
import { verifyPassword, hashPassword } from "./password.js";

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const isProduction = process.env.APP_ENV === "production";

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.get("/health", (req, res) => {
  res.status(201).json({
    message: "healthy",
  });
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const err = new Error("Name, email, and password are required.");
    err.status = 400;
    throw err;
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await insertUser(name, email, hashedPassword);
  res.status(201).json({
    ...newUser,
    message: "Successfully created a new user",
  });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }

  const user = await getUserByEmail(email);

  if (!user) {
    const err = new Error("Invalid email");
    err.status = 401;
    throw err;
  }

  const isMatch = await verifyPassword(password, user.password_hash);

  if (!isMatch) {
    return res.status(401).json({
      message: "Password is incorrect",
    });
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 3600000,
  });
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

app.get("/test", (req, res) => {
  let token = null;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies?.authToken;
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized: Invalid token",
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message,
  });
});

export default app;
