const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Track the thinking message element to replace it later
let thinkingMessageElement = null;

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to chat
  appendMessage('user', userMessage);
  input.value = '';

  // Show thinking message and store reference to it
  thinkingMessageElement = appendMessage('bot', 'Gemini sedang berpikir...');

  try {
    // Prepare request to backend API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // Parse response
    const data = await response.json();
    console.log('Received data from API:', data); // Debugging line

    // Check if result exists
    if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      // Replace thinking message with actual response
      replaceThinkingMessage(data.candidates[0].content.parts[0].text);
    } else {
      // No result in response
      replaceThinkingMessage('Maaf, tidak ada respons yang diterima.');
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    // Replace thinking message with error message
    replaceThinkingMessage('Gagal mendapatkan respons dari server.');
  }
});

// Function to append a new message to the chat box
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the element for potential future reference
}

// Function to replace the thinking message with actual response
function replaceThinkingMessage(text) {
  if (thinkingMessageElement) {
    thinkingMessageElement.textContent = text;
    chatBox.scrollTop = chatBox.scrollHeight;
    thinkingMessageElement = null; // Reset the reference
  }
}
