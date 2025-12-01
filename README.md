# Gemini Chatbot

A modern, free chatbot powered by Google's Gemini API, deployable on Netlify.

## Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the key (keep it private)

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run start
```

Visit `http://localhost:8888` and test the chatbot.

### 4. Deploy to Netlify

#### Option A: Connect GitHub (Recommended)
1. Push this repo to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click **New site from Git**
4. Select your repo
5. Under **Build settings**, set:
   - Build command: `npm run build`
   - Publish directory: `public`
6. Go to **Site settings → Build & deploy → Environment**
7. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your API key from step 1
8. Deploy

#### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

When prompted, add the `GEMINI_API_KEY` environment variable in the Netlify dashboard.

## Project Structure

```
ChatAI/
├─ netlify.toml              # Netlify config
├─ package.json              # Dependencies
├─ public/
│  ├─ index.html             # Chat UI
│  ├─ styles.css             # Styling
│  └─ main.js                # Frontend logic
└─ netlify/
   └─ functions/
      └─ askGemini.js        # Backend (calls Gemini API)
```

## How It Works

1. **Frontend** (`public/main.js`) sends your question to the backend
2. **Backend** (`netlify/functions/askGemini.js`) receives the question and calls Gemini API using your API key (kept secret on the server)
3. **Gemini** responds with an answer
4. **Frontend** displays the answer in the chat

## Features

- ✅ Modern, responsive UI
- ✅ Real-time chat interface
- ✅ API key kept secure (server-side only)
- ✅ Free deployment on Netlify
- ✅ Works on mobile & desktop

## Troubleshooting

**"Server not configured"** → Add `GEMINI_API_KEY` to Netlify environment variables

**"Gemini API request failed"** → Check your API key is valid and has quota remaining

**Chat not sending** → Check browser console for errors; ensure Netlify function is deployed

## License

MIT
