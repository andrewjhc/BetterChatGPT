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
