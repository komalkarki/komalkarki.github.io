async function sendChat() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  const message = input.value;
  input.value = "";

  // Show user message
  messages.innerHTML += `<div class="userMsg">${message}</div>`;

  try {
    const res = await fetch("https://f4331a19-8591-4533-a54c-28a6663cc9ce-00-3e6l079fsznd0.worf.replit.dev/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    messages.innerHTML += `<div class="botMsg">${data.reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    messages.innerHTML += `<div class="botMsg" style="color:red">Error connecting AI</div>`;
  }
}
