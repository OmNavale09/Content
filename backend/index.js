const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/user");
const Message = require("./models/message");
const Generation = require("./models/generation");
const Conversation = require("./models/conversation");

// ================================
// MongoDB Connection
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// ================================
// Generate JWT
// ================================
const generateToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


// ================================
// REGISTER
// POST /api/register
// ================================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});


// ================================
// LOGIN
// POST /api/login
// ================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// ================================
// CHAT
// POST /api/chat
// ================================
app.post("/api/chat", authMiddleware, async (req, res) => {
  try {
    const {
      conversationId,
      text,
      images = [],
      videos = [],
      settings,
    } = req.body;

    // --------------------------------
    // Validate input
    // --------------------------------

    if (
      !text &&
      (!images || images.length === 0) &&
      (!videos || videos.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide text, image or video",
      });
    }

    let conversation;

    // --------------------------------
    // 1. Create or find conversation
    // --------------------------------

    if (!conversationId) {
      conversation = await Conversation.create({
        user: req.user.userId,

        // You can later ask AI to generate
        // a better conversation title
        title: text
          ? text.substring(0, 50)
          : "New Conversation",
      });
    } else {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: req.user.userId,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }
    }

    // --------------------------------
    // 2. Save USER message
    // --------------------------------

    const userMessage = await Message.create({
      conversation: conversation._id,

      role: "user",

      text: text || "",

      images,

      videos,
    });

    // --------------------------------
    // 3. Get conversation history
    // --------------------------------

    const messages = await Message.find({
      conversation: conversation._id,
    })
      .sort({ createdAt: 1 })
      .select("-__v");

    // --------------------------------
    // 4. Prepare messages for Python AI
    // --------------------------------

    const aiMessages = messages.map((message) => ({
      role: message.role,

      text: message.text || "",

      images: message.images || [],

      videos: message.videos || [],
    }));

    // --------------------------------
    // 5. Send to Python AI server
    // --------------------------------

    const aiResponse = await axios.post(
      `${process.env.AI_SERVER_URL}/repurpose`,
      {
        messages: aiMessages,

        settings: settings || {},
      },
      {
        timeout: 120000,
      }
    );

    const aiData = aiResponse.data.data;

    // --------------------------------
    // 6. Save ASSISTANT message
    // --------------------------------

    const assistantMessage = await Message.create({
      conversation: conversation._id,

      role: "assistant",

      text: aiData.text || "",
    });

    // --------------------------------
    // 7. Save Generation
    // --------------------------------

    const generation = await Generation.create({
      message: assistantMessage._id,

      summary: aiData.summary || {},

      settings: aiData.settings || settings || {},

      platforms: aiData.platforms || [],
    });

    // --------------------------------
    // 8. Connect Generation to Message
    // --------------------------------

    assistantMessage.response = generation._id;

    await assistantMessage.save();

    // --------------------------------
    // 9. Update conversation
    // --------------------------------

    conversation.lastMessage = aiData.text || "AI response";

    await conversation.save();

    // --------------------------------
    // 10. Return response
    // --------------------------------

    return res.status(200).json({
      success: true,

      conversation: {
        id: conversation._id,
        title: conversation.title,
      },

      userMessage,

      assistantMessage: {
        id: assistantMessage._id,
        role: assistantMessage.role,
        text: assistantMessage.text,
        response: generation,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);

    // Python AI server error
    if (error.response) {
      return res.status(502).json({
        success: false,
        message: "AI server failed",
        error: error.response.data,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.get("/api/conversations", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get conversations belonging to this user
    const conversations = await Conversation.find({
      user: userId,
    })
      .sort({ updatedAt: -1 })
      .select("_id title lastMessage createdAt updatedAt");

    return res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("Get conversations error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching conversations",
    });
  }
});

app.get(
  "/api/conversations/:conversationId",
  authMiddleware,
  async (req, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.userId;

      // Check if conversation exists
      // and belongs to the logged-in user
      const conversation = await Conversation.findOne({
        _id: conversationId,
        user: userId,
      }).select("_id title lastMessage createdAt updatedAt");

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      // Get all messages
      // and populate the Generation response
      const messages = await Message.find({
        conversation: conversationId,
      })
        .sort({ createdAt: 1 })
        .populate({
          path: "response",
          select: "message summary settings platforms createdAt updatedAt",
        });

      return res.status(200).json({
        success: true,

        conversation,

        count: messages.length,

        messages,
      });
    } catch (error) {
      console.error("Get conversation error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while fetching conversation",
      });
    }
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});