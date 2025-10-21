// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS must be before routes
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Vite default port
    credentials: true,
  })
);
app.use(express.json());

// Mock user database
const users = [
  { id: 1, email: "demo@example.com", password: "password123" },
  { id: 2, email: "user@example.com", password: "securepass456" },
];

// Login endpoint
app.post("/api/login", (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log("Validation failed: missing fields");
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: invalid email format");
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Password length validation
    if (password.length < 6) {
      console.log("Validation failed: password too short");
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Find user in mock database
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Login successful for:", email);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
        token: "mock_jwt_token_" + Date.now(),
      });
    } else {
      console.log("Login failed: invalid credentials");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Dashboard endpoint
app.get("/api/dashboard", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to dashboard",
      data: [],
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// 404 handler
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("\nSIGTERM received, shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received, shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
