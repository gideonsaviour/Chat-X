# Chat-X AI Backend

Secure backend for Chat-X AI Assistant.

## Deploy on Render.com (Free)

1. Push this repo to GitHub
2. Go to render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
6. Click Deploy

Your backend URL will be: `https://chat-x-backend.onrender.com`
