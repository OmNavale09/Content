/**
 * platformData.js
 * ---------------
 * Contains all the platform information for ReforgeAI.
 * Each platform has:
 *   - name: Display name
 *   - key: Unique identifier (used in state)
 *   - primaryUse: What the platform is mainly for
 *   - howPeopleUseIt: Description of typical usage
 *   - textFormats: Array of content formats supported
 *   - tone: The recommended writing tone
 *   - extraFields: Array of extra input fields to show when this platform is selected
 *
 * Each extraField has:
 *   - name: Unique field key
 *   - label: Display label for the input
 *   - type: "text" for text input, "select" for dropdown
 *   - placeholder: Placeholder text (for text inputs)
 *   - options: Array of options (for select inputs)
 */

const platformData = [
  {
    name: "Email",
    key: "email",
    primaryUse: "Professional communication",
    howPeopleUseIt:
      "Business conversations, formal requests, reports, job applications",
    textFormats: [
      "Email",
      "Newsletter",
      "Announcement",
      "Meeting Invitation",
      "Follow-up",
      "Thank-you",
      "Complaint",
      "Proposal",
    ],
    tone: "Formal to semi-formal",
    extraFields: [
      {
        name: "subjectLine",
        label: "Subject Line",
        type: "text",
        placeholder: "Enter your email subject...",
      },
      {
        name: "recipientType",
        label: "Recipient Type",
        type: "select",
        options: ["Business", "Personal", "Team", "Client"],
      },
      {
        name: "emailType",
        label: "Email Type",
        type: "select",
        options: [
          "Newsletter",
          "Announcement",
          "Follow-up",
          "Thank-you",
          "Complaint",
          "Proposal",
        ],
      },
    ],
  },
  {
    name: "LinkedIn",
    key: "linkedin",
    primaryUse: "Professional networking",
    howPeopleUseIt:
      "Connect with professionals, recruiters, companies, share achievements",
    textFormats: ["Posts", "Articles", "Direct Messages (DMs)", "Recommendations"],
    tone: "Professional",
    extraFields: [
      {
        name: "postType",
        label: "Post Type",
        type: "select",
        options: ["Post", "Article", "DM", "Recommendation"],
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        type: "text",
        placeholder: "e.g., Tech recruiters, Marketing professionals...",
      },
    ],
  },
  {
    name: "X",
    key: "x",
    primaryUse: "Public conversations & news",
    howPeopleUseIt: "Share opinions, updates, trends, announcements",
    textFormats: ["Posts (Tweets)", "Quote Posts", "Threads"],
    tone: "Casual to professional",
    extraFields: [
      {
        name: "tweetType",
        label: "Tweet Type",
        type: "select",
        options: ["Tweet", "Quote Post", "Thread"],
      },
      {
        name: "tweetTopic",
        label: "Topic / Hashtag",
        type: "text",
        placeholder: "e.g., #TechTrends, AI updates...",
      },
    ],
  },
  {
    name: "Instagram",
    key: "instagram",
    primaryUse: "Personal branding & lifestyle",
    howPeopleUseIt: "Share photos, interact with friends and creators",
    textFormats: ["Captions", "Story Text"],
    tone: "Casual",
    extraFields: [
      {
        name: "contentType",
        label: "Content Type",
        type: "select",
        options: ["Caption", "Story Text", "Reel Description"],
      },
      {
        name: "postDescription",
        label: "Post Description",
        type: "text",
        placeholder: "Describe your photo/video for the caption...",
      },
      {
        name: "hashtagSuggestions",
        label: "Include Hashtag Suggestions?",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    name: "YouTube",
    key: "youtube",
    primaryUse: "Video content",
    howPeopleUseIt: "Education, entertainment, tutorials",
    textFormats: ["Descriptions", "Community Posts"],
    tone: "Casual",
    extraFields: [
      {
        name: "videoTitle",
        label: "Video Title",
        type: "text",
        placeholder: "Enter your video title...",
      },
      {
        name: "videoTopic",
        label: "Video Description Topic",
        type: "text",
        placeholder: "What is your video about?",
      },
      {
        name: "youtubeContentType",
        label: "Content Type",
        type: "select",
        options: ["Description", "Community Post"],
      },
    ],
  },
  {
    name: "Reddit",
    key: "reddit",
    primaryUse: "Discussion communities",
    howPeopleUseIt: "Ask questions, share experiences",
    textFormats: ["Posts"],
    tone: "Casual, community-driven",
    extraFields: [
      {
        name: "subredditName",
        label: "Subreddit Name",
        type: "text",
        placeholder: "e.g., r/technology, r/webdev...",
      },
      {
        name: "redditPostType",
        label: "Post Type",
        type: "select",
        options: ["Discussion", "Question", "Experience", "News"],
      },
    ],
  },
  {
    name: "Quora",
    key: "quora",
    primaryUse: "Knowledge sharing",
    howPeopleUseIt: "Ask and answer questions",
    textFormats: ["Posts", "Space Posts"],
    tone: "Informative",
    extraFields: [
      {
        name: "questionTopic",
        label: "Question Topic",
        type: "text",
        placeholder: "What topic is the question about?",
      },
      {
        name: "answerType",
        label: "Answer Type",
        type: "select",
        options: ["Post", "Space Post"],
      },
    ],
  },
  {
    name: "Medium",
    key: "medium",
    primaryUse: "Blogging",
    howPeopleUseIt: "Publish long-form articles",
    textFormats: ["Articles", "Publications", "Newsletters"],
    tone: "Professional",
    extraFields: [
      {
        name: "articleTitle",
        label: "Article Title",
        type: "text",
        placeholder: "Enter your article title...",
      },
      {
        name: "publicationName",
        label: "Publication Name (optional)",
        type: "text",
        placeholder: "e.g., Towards Data Science...",
      },
      {
        name: "mediumContentType",
        label: "Content Type",
        type: "select",
        options: ["Article", "Newsletter"],
      },
    ],
  },
];

export default platformData;
