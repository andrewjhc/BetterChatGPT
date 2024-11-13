// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ savedPrompts: [], pinnedChats: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSavedPrompts') {
    chrome.storage.local.get('savedPrompts', (data) => sendResponse(data.savedPrompts || []));
  }
  return true;
});
