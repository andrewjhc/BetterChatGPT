// content-script.js

// Create a floating widget
const widget = document.createElement('div');
widget.id = 'chat-widget';
widget.style.position = 'fixed';
widget.style.bottom = '20px';
widget.style.right = '20px';
widget.style.width = '300px';
widget.style.height = '200px';
widget.style.backgroundColor = 'white';
widget.style.border = '1px solid #ccc';
widget.style.borderRadius = '8px';
widget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
widget.style.padding = '10px';
widget.style.display = 'none';
document.body.appendChild(widget);

// Toggle the widget
const toggleButton = document.createElement('button');
toggleButton.innerText = 'Open ChatGPT';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '250px';
toggleButton.style.right = '20px';
toggleButton.onclick = () => {
  widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
};
document.body.appendChild(toggleButton);
