chrome.runtime.onInstalled.addListener(() => {
  console.log("ChatGPT Enhancer installed!");
});

// Message handler for features
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveChatHistory") {
    // Save chat history logic
    chrome.storage.local.get("chatHistory", (data) => {
      let chatHistory = data.chatHistory || [];
      chatHistory.push(message.chat);
      chrome.storage.local.set({ chatHistory });
    });
  }

  if (message.action === "savePrompt") {
    // Save prompt logic
    chrome.storage.local.get("savedPrompts", (data) => {
      let prompts = data.savedPrompts || [];
      prompts.push(message.prompt);
      chrome.storage.local.set({ savedPrompts: prompts });
    });
  }

  if (message.action === "getChatHistory") {
    chrome.storage.local.get("chatHistory", (data) => {
      sendResponse(data.chatHistory || []);
    });
    return true;
  }
});
// On popup open, load saved prompts from local storage
chrome.storage.local.get(['savedPrompts'], function(result) {
  const savedPrompts = result.savedPrompts || [];
  const promptDropdown = document.getElementById('prompt-dropdown');
  
  // Add saved prompts to the dropdown
  savedPrompts.forEach(prompt => {
    const option = document.createElement('option');
    option.value = prompt;
    option.innerText = prompt;
    promptDropdown.appendChild(option);
  });
});

// On selecting a prompt, insert it into the chat (if needed)
document.getElementById('prompt-dropdown').addEventListener('change', function(event) {
  const selectedPrompt = event.target.value;
  if (selectedPrompt) {
    // Insert the selected prompt into the chat (if applicable)
    insertPromptIntoChat(selectedPrompt);  // Implement this function as needed
  }
});
// Pin chat functionality
document.getElementById('pin-chat').addEventListener('click', function() {
  const chatData = { /* your chat data here */ };

  // Get current pinned chats from storage
  chrome.storage.local.get(['pinnedChats'], function(result) {
    const pinnedChats = result.pinnedChats || [];
    
    // Add new pinned chat to the list
    pinnedChats.push(chatData);
    
    // Save back to storage
    chrome.storage.local.set({ 'pinnedChats': pinnedChats }, function() {
      console.log('Chat pinned!');
    });
  });
});
// Load pinned chats
chrome.storage.local.get(['pinnedChats'], function(result) {
  const pinnedChats = result.pinnedChats || [];
  const pinnedChatsDiv = document.getElementById('pinned-chats');
  
  pinnedChats.forEach(chat => {
    const chatElement = document.createElement('div');
    chatElement.innerText = chat;  // You can format this as needed
    pinnedChatsDiv.appendChild(chatElement);
  });
});
// Save prompt with folder
document.getElementById('save-prompt').addEventListener('click', function() {
  const prompt = document.getElementById('prompt-input').value;
  const folder = document.getElementById('folder-dropdown').value;

  chrome.storage.local.get(['savedPrompts'], function(result) {
    const savedPrompts = result.savedPrompts || [];
    
    // Save prompt with folder info
    savedPrompts.push({ prompt, folder });
    chrome.storage.local.set({ 'savedPrompts': savedPrompts });
  });
});
document.getElementById('text-to-speech').addEventListener('click', function() {
  const promptText = document.getElementById('prompt-input').value;  // Get text from input
  const utterance = new SpeechSynthesisUtterance(promptText);
  speechSynthesis.speak(utterance);
});
