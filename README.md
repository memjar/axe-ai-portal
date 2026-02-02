# AXE - Canada's AI Assistant

Local AI assistant with Claude-quality responses, designed for Canadians.

## Features

- 🧠 **Claude-Quality Responses** - Opus 4.5-level extended thinking
- 🇨🇦 **Canadian Focus** - PIPEDA compliant, bilingual (EN/FR)
- 💻 **Local Processing** - 100% private, $0 cost
- 🚀 **Fast** - Optimized inference with vLLM
- 🔓 **Open Source** - Verifiable and customizable

## Quick Start

### Prerequisites

- Node.js 18+ and Python 3.11+
- 64GB RAM recommended
- Llama 3.3 70B model

### Install

```bash
# Clone repo
git clone https://github.com/memjar/axe-ai-portal.git
cd axe-ai-portal

# Install dependencies
npm install
pip install -r requirements.txt

# Start backend
python api/main.py

# Start frontend (new terminal)
npm run dev
```

Visit `http://localhost:3000`

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/memjar/axe-ai-portal)

1. Click button above
2. Connect GitHub repo
3. Set environment variables
4. Deploy!

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
MODEL_PATH=/path/to/llama-70b
```

## Project Structure

```
axe-web/
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main chat interface
│   ├── layout.tsx       # App layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ChatInterface.tsx
│   ├── MessageBubble.tsx
│   ├── ThinkingBlock.tsx
│   └── InputArea.tsx
├── api/                 # FastAPI backend
│   ├── main.py         # API server
│   ├── models.py       # Model loading
│   └── inference.py    # Inference logic
├── public/             # Static assets
├── package.json        # Node dependencies
├── requirements.txt    # Python dependencies
└── vercel.json        # Vercel config
```

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** FastAPI, vLLM, Llama 3.3 70B
- **Deployment:** Vercel (frontend), Railway/Fly.io (backend)

## License

MIT

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

---

🇨🇦 Built in Canada, for Canadians
