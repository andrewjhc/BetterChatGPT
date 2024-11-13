// content-script.js

// Log a message to indicate the content script has loaded
console.log('BetterChatGPT Content Script Loaded');

// Function to handle detecting new messages
function detectNewMessages() {
  const chatContainer = document.querySelector('.chat-container'); // You may need to update this selector to match the ChatGPT layout.
  
  if (chatContainer) {
    const messages = chatContainer.querySelectorAll('.message'); // Assuming each message has the class 'message'.
    
    messages.forEach((message) => {
      // You can perform any action when a new message is detected here.
      // For example, logging the message content:
      console.log('New message:', message.textContent);
      
      // Optionally, send a message to the background script with data
      chrome.runtime.sendMessage({
        type: 'new_message',
        content: message.textContent
      });
    });
  }
}

// Run the function every 2 seconds to check for new messages (you can adjust the interval).
setInterval(detectNewMessages, 2000);

// Additional functionality can be added, such as handling clicks, user input, etc.
