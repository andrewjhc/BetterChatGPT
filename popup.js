// Saving chat history functionality
document.getElementById("saveChat").addEventListener("click", () => {
  const chat = "Sample chat content";  // Replace with real chat data
  chrome.runtime.sendMessage({
    action: "saveChatHistory",
    chat: chat
  });
  alert("Chat saved!");
});

// Saving a prompt functionality
document.getElementById("savePrompt").addEventListener("click", () => {
  const prompt = "Sample prompt";  // Replace with the prompt user inputs
  chrome.runtime.sendMessage({
    action: "savePrompt",
    prompt: prompt
  });
  alert("Prompt saved!");
});

// Upload file functionality (PDF/DOCX)
document.getElementById("uploadFile").addEventListener("click", () => {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.docx';
  input.onchange = () => {
    let file = input.files[0];
    if (file) {
      // Handle file processing (e.g., convert to text and send to ChatGPT)
      console.log("File uploaded:", file);
    }
  };
  input.click();
});

// Text-to-speech functionality
document.getElementById("textToSpeech").addEventListener("click", () => {
  const text = "Sample response text";  // Replace with actual ChatGPT response text
  let speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
});

// Display saved prompts
chrome.runtime.sendMessage({ action: "getSavedPrompts" }, (prompts) => {
  const promptList = document.getElementById("savedPrompts");
  prompts.forEach(prompt => {
    const li = document.createElement("li");
    li.textContent = prompt;
    promptList.appendChild(li);
  });
});
