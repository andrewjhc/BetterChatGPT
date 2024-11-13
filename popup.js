// Save prompt to local storage
document.getElementById('save-prompt').addEventListener('click', () => {
  const prompt = document.getElementById('chat-input').value;
  if (prompt) {
    chrome.storage.local.get('savedPrompts', (data) => {
      const prompts = data.savedPrompts || [];
      prompts.push(prompt);
      chrome.storage.local.set({ savedPrompts: prompts });
    });
  }
});

// Pin chat
document.getElementById('pin-chat').addEventListener('click', () => {
  const chat = document.getElementById('chat-input').value;
  if (chat) {
    chrome.storage.local.get('pinnedChats', (data) => {
      const chats = data.pinnedChats || [];
      chats.push(chat);
      chrome.storage.local.set({ pinnedChats: chats });
      loadPinnedChats();
    });
  }
});

// Text-to-Speech
document.getElementById('text-to-speech').addEventListener('click', () => {
  const text = document.getElementById('chat-input').value;
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
});

