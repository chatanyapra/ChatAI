const chatWindow = document.getElementById("chat-window");
const form = document.getElementById("chat-form");
const textarea = document.getElementById("user-input");

const renderMessage = (role, text) => {
    const wrapper = document.createElement("article");
    wrapper.className = `message ${role}`;

    // Parse code blocks and format them
    const formattedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="code-block"><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    wrapper.innerHTML = `
    <strong>${role === "user" ? "You" : "Gemini"}</strong>
    <div class="bubble">${formattedText}</div>
  `;
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
};

const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
};

const setLoading = (isLoading) => {
    textarea.disabled = isLoading;
    form.querySelector("button").disabled = isLoading;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = textarea.value.trim();
    if (!question) return;

    renderMessage("user", question);
    textarea.value = "";
    setLoading(true);

    try {
        const response = await fetch("/.netlify/functions/askGemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.error || "Gemini request failed");
        }

        const { answer } = await response.json();
        renderMessage("bot", answer || "I didn't receive a reply.");
    } catch (error) {
        console.error(error);
        renderMessage(
            "bot",
            "Sorry, something went wrong. Please try again in a moment."
        );
    } finally {
        setLoading(false);
    }
});
