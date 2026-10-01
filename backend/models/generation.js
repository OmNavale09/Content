const mongoose = require("mongoose");

const platformContentSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const generationSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },

    summary: {
      topic: {
        type: String,
        default: "",
      },

      keyPoints: {
        type: [String],
        default: [],
      },

      insights: {
        type: [String],
        default: [],
      },

      tone: {
        type: String,
        default: "",
      },

      context: {
        type: String,
        default: "",
      },

      audience: {
        type: String,
        default: "",
      },
    },

    settings: {
      tone: {
        type: String,
        default: "",
      },

      audience: {
        type: String,
        default: "",
      },

      language: {
        type: String,
        default: "English",
      },

      length: {
        type: String,
        default: "Medium",
      },
    },

    platforms: {
      type: [platformContentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Generation", generationSchema);