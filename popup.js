// popup.js

// Handle saving a prompt
document.getElementById("savePromptBtn").addEventListener("click", function() {
  const prompt = prompt("Enter the prompt to save:");
  if (prompt) {
    savePrompt(prompt);
    alert("Prompt saved!");
  }
});

// Handle pinning a chat
document.getElementById("pinChatBtn").addEventListener("click", function() {
  const chat = prompt("Enter the chat text to pin:");
  if (chat) {
    pinChat(chat);
    updatePinnedChats();
    alert("Chat pinned!");
  }
});

// Handle text-to-speech
document.getElementById("textToSpeechBtn").addEventListener("click", function() {
  const chat = prompt("Enter chat text for text-to-speech:");
  if (chat) {
    textToSpeech(chat);
  }
});

// Handle file upload
document.getElementById("uploadBtn").addEventListener("click", function() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.docx, .pdf, .txt'; // Accepts common file formats
  fileInput.addEventListener('change', handleFileUpload);
  fileInput.click();
});

// Save prompts in local storage
function savePrompt(prompt) {
  const savedPrompts = JSON.parse(localStorage.getItem("savedPrompts")) || [];
  savedPrompts.push(prompt);
  localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));
}

// Pin chats
function pinChat(chat) {
  const pinnedChats = JSON.parse(localStorage.getItem("pinnedChats")) || [];
  pinnedChats.push(chat);
  localStorage.setItem("pinnedChats", JSON.stringify(pinnedChats));
}

// Update pinned chats section
function updatePinnedChats() {
  const pinnedChats = JSON.parse(localStorage.getItem("pinnedChats")) || [];
  const pinnedChatsContainer = document.getElementById("pinned-chats");
  pinnedChatsContainer.innerHTML = ""; // Clear previous content

  pinnedChats.forEach(chat => {
    const chatElement = document.createElement("div");
    chatElement.classList.add("pinned-chat");
    chatElement.textContent = chat;
    pinnedChatsContainer.appendChild(chatElement);
  });
}

// Text-to-speech functionality
function textToSpeech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Handle file upload (simple for now)
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    alert(`Uploaded file: ${file.name}`);
    // Further file handling (like parsing PDFs or DOCX) can be done here.
  }
}

// Initialize pinned chats section on load
document.addEventListener("DOMContentLoaded", function() {
  updatePinnedChats();
});
