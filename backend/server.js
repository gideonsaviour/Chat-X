const http = require('http');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, history } = JSON.parse(body);

        // Build messages array with history
        const messages = [
          ...(history || []),
          { role: 'user', content: message }
        ];

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-beta': 'web-search-2025-03-05'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            system: "You are Chat-X AI Assistant — a smart, helpful assistant built into the Chat-X messaging app. You have access to real-time web search. Always search the web for current events, news, prices, scores, weather, and any time-sensitive information. Give accurate, concise, conversational answers. If you searched the web, mention it briefly. Never make up facts. Keep responses friendly and to the point.",
            tools: [{ type: "web_search_20250305", name: "web_search" }],
            messages
          })
        });

        const data = await response.json();

        if (data.error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: data.error.message }));
          return;
        }

        // Extract text and check if web search was used
        const textBlocks = data.content?.filter(b => b.type === 'text') || [];
        const reply = textBlocks.map(b => b.text).join('\n').trim();
        const searched = data.content?.some(b => b.type === 'tool_use' && b.name === 'web_search');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply, searched }));

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat-X AI Backend is running');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Chat-X backend running on port ${PORT}`));
