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
