const { v4: uuid } = require("uuid");
uuid();

const comments = [
  {
    id: uuid(),
    username: "Aniket",
    comment: "Hello how are you",
  },
  {
    id: uuid(),
    username: "Anik",
    comment: "I am good",
  },
  {
    id: uuid(),
    username: "Aryan",
    comment: "Everything is fine",
  },
  {
    id: uuid(),
    username: "Dushyant",
    comment: "Let's play some game",
  },
];

module.exports = comments;
