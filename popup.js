// Initialize the UI with saved pinned chats
function loadPinnedChats() {
  const pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];
  const pinnedChatsContainer = document.getElementById('pinned-chats');

  pinnedChatsContainer.innerHTML = '';  // Clear existing chats

  pinnedChats.forEach((chat, index) => {
    const chatElement = document.createElement('div');
    chatElement.classList.add('pinned-chat');
    chatElement.innerHTML = `
      <p>${chat}</p>
      <button onclick="removePinnedChat(${index})">Remove</button>
    `;
    pinnedChatsContainer.appendChild(chatElement);
  });
}

// Save a prompt to localStorage
document.getElementById('save-prompt').addEventListener('click', () => {
  const prompt = document.getElementById('chat-input').value;
  if (prompt) {
    localStorage.setItem('lastPrompt', prompt);
  }
});

// Pin a chat
document.getElementById('pin-chat').addEventListener('click', () => {
  const chat = document.getElementById('chat-input').value;
  if (chat) {
    const pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];
    pinnedChats.push(chat);
    localStorage.setItem('pinnedChats', JSON.stringify(pinnedChats));
    loadPinnedChats();
  }
});

// Remove pinned chat
function removePinnedChat(index) {
  const pinnedChats = JSON.parse(localStorage.getItem('pinnedChats')) || [];
  pinnedChats.splice(index, 1);
  localStorage.setItem('pinnedChats', JSON.stringify(pinnedChats));
  loadPinnedChats();
}

// Text-to-Speech functionality
document.getElementById('text-to-speech').addEventListener('click', () => {
  const chatText = document.getElementById('chat-input').value;
  if (chatText) {
    const speech = new SpeechSynthesisUtterance(chatText);
    window.speechSynthesis.speak(speech);
  }
});

// File upload handler (for now, just logs the file name)
document.getElementById('file-upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log(`File uploaded: ${file.name}`);
    // Add further logic for parsing files (PDF, DOCX)
  }
});

// Initial load of pinned chats
loadPinnedChats();
