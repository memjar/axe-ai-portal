# AXE AI Portal - Deployment Guide

Complete guide for deploying AXE to production.

## ✅ GitHub Status

**Repository:** https://github.com/memjar/axe-ai-portal
**Status:** Live and ready for deployment
**Last Updated:** February 2, 2026

All code is committed and pushed. Ready for Vercel deployment.

---

## 🚀 Deploy to Vercel (5 minutes)

### Option 1: One-Click Deploy (Easiest)

1. Visit: https://vercel.com/new/clone?repository-url=https://github.com/memjar/axe-ai-portal
2. Click "Deploy"
3. Vercel will automatically:
   - Clone your repo
   - Install dependencies
   - Build the app
   - Deploy to production

**Done!** Your site will be live at `https://your-project.vercel.app`

### Option 2: Manual Deploy (More Control)

1. **Login to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy from local directory**
   ```bash
   cd ~/Desktop/axe-web
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? **[Your account]**
   - Link to existing project? **N**
   - Project name? **axe-ai-portal**
   - Directory? **./[Enter]**
   - Override settings? **N**

4. **Production deployment**
   ```bash
   vercel --prod
   ```

---

## 🔧 Environment Variables

After deployment, set environment variables in Vercel dashboard:

**Required Variables:**
- `NEXT_PUBLIC_API_URL` - Your backend API URL
  - During development: `http://localhost:8000`
  - For production: Deploy backend first (see below)

**To set in Vercel:**
1. Go to https://vercel.com/[username]/axe-ai-portal/settings/environment-variables
2. Add `NEXT_PUBLIC_API_URL`
3. Set value to your backend URL
4. Click "Save"
5. Redeploy project

---

## 🖥️ Backend Deployment

The FastAPI backend needs a separate deployment. Options:

### Option A: Railway (Recommended)

1. **Create account:** https://railway.app
2. **Deploy from GitHub:**
   - New Project → Deploy from GitHub
   - Select `memjar/axe-ai-portal`
   - Root Directory: `/api`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Add environment variable:**
   - `MODEL_PATH=/path/to/model` (if using hosted model)
4. **Get deployment URL:**
   - Railway provides URL like `https://your-app.railway.app`
5. **Update Vercel:**
   - Set `NEXT_PUBLIC_API_URL` to Railway URL

### Option B: Fly.io

1. **Install CLI:**
   ```bash
   brew install flyctl
   fly auth login
   ```

2. **Create fly.toml:**
   ```toml
   app = "axe-api"

   [build]
   dockerfile = "Dockerfile"

   [[services]]
   internal_port = 8000
   protocol = "tcp"

   [[services.ports]]
   port = 80
   handlers = ["http"]

   [[services.ports]]
   port = 443
   handlers = ["tls", "http"]
   ```

3. **Deploy:**
   ```bash
   cd ~/Desktop/axe-web/api
   fly launch
   fly deploy
   ```

### Option C: Local Backend (Testing Only)

For testing with local Llama 70B:

1. **Start backend on Mac Studio:**
   ```bash
   cd ~/Desktop/axe-web/api
   python main.py
   ```

2. **Use ngrok for public URL:**
   ```bash
   brew install ngrok
   ngrok http 8000
   ```

3. **Update Vercel env:**
   - `NEXT_PUBLIC_API_URL=https://your-id.ngrok.io`

---

## 🧪 Testing Deployment

After deployment:

1. **Visit your Vercel URL**
2. **Open browser console** (F12)
3. **Send test message**
4. **Check API connection:**
   - Should see request to `NEXT_PUBLIC_API_URL/v1/chat`
   - Should get response from backend

**Common Issues:**

- **CORS errors:** Backend needs CORS enabled (already configured)
- **API not found:** Check `NEXT_PUBLIC_API_URL` is correct
- **Slow responses:** Backend may need model loaded

---

## 📊 Connect Llama 70B

Once deployed, connect your local Llama 70B:

1. **Update `api/main.py`** with vLLM integration:
   ```python
   from vllm import LLM, SamplingParams

   # Load model
   llm = LLM(
       model="/path/to/llama-70b",
       tensor_parallel_size=1,
       gpu_memory_utilization=0.9
   )

   @app.post("/v1/chat")
   async def chat(request: ChatRequest):
       messages = [{"role": m.role, "content": m.content}
                   for m in request.messages]

       output = llm.chat(
           messages=messages,
           sampling_params=SamplingParams(temperature=0.7, max_tokens=4096)
       )

       return {
           "role": "assistant",
           "content": output.outputs[0].text
       }
   ```

2. **Test locally:**
   ```bash
   python api/main.py
   curl -X POST http://localhost:8000/v1/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
   ```

3. **Deploy updated backend** (if hosted)

---

## 🎯 Production Checklist

Before going live:

- [ ] Backend deployed and accessible
- [ ] Environment variables set in Vercel
- [ ] Test chat functionality end-to-end
- [ ] Verify model responses are working
- [ ] Check performance (response times)
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Configure rate limiting (recommended)

---

## 🔗 Useful Links

- **GitHub Repo:** https://github.com/memjar/axe-ai-portal
- **Vercel Deploy:** https://vercel.com/new/clone?repository-url=https://github.com/memjar/axe-ai-portal
- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **vLLM Docs:** https://vllm.readthedocs.io

---

## 🆘 Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node.js version (need 18+)
- Clear cache: `rm -rf .next node_modules && npm install`

**Page doesn't load:**
- Check Vercel deployment logs
- Verify all files are committed to GitHub

### Backend Issues

**Model loading fails:**
- Check RAM (need 64GB for 70B)
- Verify model path is correct
- Check vLLM installation: `pip list | grep vllm`

**API connection fails:**
- Verify backend is running: `curl http://localhost:8000`
- Check CORS settings in `api/main.py`
- Verify `NEXT_PUBLIC_API_URL` is correct

---

## 📞 Support

For issues or questions:
- Check logs in Vercel dashboard
- Review backend logs
- Test API with curl/Postman first

---

**Ready to launch!** 🚀🇨🇦
