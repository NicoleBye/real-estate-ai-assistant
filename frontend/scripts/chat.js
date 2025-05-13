// Chat logic
function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');

  const msg = document.createElement('div');
  msg.textContent = "You: " + input.value;
  chatBox.appendChild(msg);

  const reply = document.createElement('div');
  reply.textContent = "AI: [Static reply here]";
  reply.style.marginLeft = "1rem";
  chatBox.appendChild(reply);

  input.value = "";
}
