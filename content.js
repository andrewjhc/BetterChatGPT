// Add UI Customization (e.g., background color change)
document.body.style.backgroundColor = "#f0f8ff";  // Light blue background

// Inject floating button for quick access
const floatingButton = document.createElement("button");
floatingButton.textContent = "ChatGPT Enhancer";
floatingButton.style.position = "fixed";
floatingButton.style.bottom = "10px";
floatingButton.style.right = "10px";
floatingButton.style.padding = "10px";
floatingButton.style.backgroundColor = "#4CAF50";
floatingButton.style.color = "white";
floatingButton.style.border = "none";
floatingButton.style.borderRadius = "5px";
floatingButton.style.cursor = "pointer";
floatingButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "openPopup" });
});
document.body.appendChild(floatingButton);
