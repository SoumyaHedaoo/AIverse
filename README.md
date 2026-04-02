<div align="center">

# 🌌 AIverse

### *The All-in-One AI Super App*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-4169E1?logo=postgresql)](https://neon.tech/)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-Gemini%202.0-orange)](https://ai.google.dev/)

**Unifying text generation, image creation, and intelligent analysis into one powerful SaaS platform**

---

</div>

## 📚 Table of Contents

- [🎯 About AIverse](#-about-aiverse)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [⚡ Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [📁 Project Structure](#-project-structure)
- [🎨 Usage Examples](#-usage-examples)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📧 Contact](#-contact)

---

## 🎯 About AIverse

<div align="center">
<img src="https://via.placeholder.com/800x400/1a1a2e/eaeaea?text=AIverse+Dashboard+Preview" alt="AIverse Dashboard" />
</div>

<br />

**AIverse** is a next-generation, full-stack AI platform that consolidates your entire AI workflow into a single, intelligent workspace. In an era where professionals juggle multiple subscriptions and APIs, AIverse delivers a unified solution for **content generation**, **visual creation**, and **data-driven insights**.

### 🎯 The Problem We Solve

Modern creators face three critical challenges:
- 🔄 **Context Switching** – Jumping between multiple AI tools disrupts workflow
- 💸 **Subscription Fatigue** – Managing 5+ different AI services drains budgets
- 🔐 **Data Fragmentation** – Work scattered across platforms creates inefficiency

### 💡 Our Solution

AIverse eliminates these pain points by providing:

```
┌─────────────────────────────────────────────────────┐
│  One Platform → Multiple AI Capabilities            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│  📝 Content Generation  │  Gemini 2.0 Flash         │
│  🎨 Image Creation      │  Clipdrop API             │
│  🧾 Resume Analysis     │  AI-Powered Insights      │
│  🧹 Image Editing       │  Background/Object Removal│
│  🌐 Unified Dashboard   │  All Creations, One Place │ 
└─────────────────────────────────────────────────────┘
```

Built for **creators**, **developers**, **marketers**, and **professionals** who demand efficiency without compromise.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🧠 AI Content Generation
Generate publication-ready articles, blog posts, and creative content in seconds. Powered by **Gemini 2.0 Flash** with customizable tone and style parameters.

**Capabilities:**
- SEO-optimized content
- Multiple tone options
- Real-time generation
- Draft management

</td>
<td width="50%">

### 🎨 Intelligent Image Creation
Transform text prompts into stunning visuals using **Clipdrop's** advanced AI models. Support for multiple artistic styles.

**Capabilities:**
- Text-to-image generation
- Style presets (realistic, anime, 3D)
- High-resolution exports
- Batch processing

</td>
</tr>
<tr>
<td width="50%">

### 🧾 Smart Resume Analysis
Upload PDFs and receive comprehensive AI-driven feedback with actionable improvement suggestions.

**Analysis Includes:**
- ATS compatibility scoring
- Keyword optimization
- Structure recommendations
- Industry-specific insights

</td>
<td width="50%">

### 🧹 Advanced Image Processing
Professional-grade image editing with AI-powered background and object removal.

**Features:**
- One-click background removal
- Selective object deletion
- Transparent PNG exports
- Batch processing support

</td>
</tr>
</table>

### 🌟 Additional Capabilities

<div align="center">

| Feature | Description |
|---------|-------------|
| 🌐 **Unified Dashboard** | Centralized hub for all AI creations with advanced filtering and search |
| 💾 **Cloud Storage** | Automatic backup via Cloudinary with version history |
| 🔐 **Role-Based Access** | Freemium model with Clerk authentication and tiered plans |
| 🤝 **Community Gallery** | Share creations, explore trending content, engage with likes |
| ⚡ **Real-time Processing** | WebSocket-based live updates for generation status |
| 📊 **Analytics Dashboard** | Track usage, performance metrics, and content insights |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Arsenal

![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend Infrastructure

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### AI & Cloud Services

![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-orange?style=for-the-badge&logo=google&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

</div>

### 📦 Detailed Technology Breakdown

<details>
<summary><b>🖥️ Frontend Technologies</b></summary>

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Component-based UI framework with hooks | 18.x |
| **Vite** | Lightning-fast build tool with HMR | 5.x |
| **Tailwind CSS** | Utility-first styling framework | 3.x |
| **Axios** | HTTP client for API communication | Latest |
| **React Router** | Client-side routing | 6.x |

</details>

<details>
<summary><b>⚙️ Backend Technologies</b></summary>

| Technology | Purpose | Version |
|------------|---------|---------|
| **Express.js** | Web application framework | 4.x |
| **NeonDB** | Serverless PostgreSQL database | Latest |
| **Clerk SDK** | Authentication & user management | Latest |
| **Multer** | File upload middleware | Latest |
| **CORS** | Cross-origin resource sharing | Latest |

</details>

<details>
<summary><b>🧠 AI & External Services</b></summary>

| Service | Purpose | Integration |
|---------|---------|-------------|
| **Gemini 2.0 Flash** | Text generation & analysis | OpenAI SDK |
| **Clipdrop API** | Image generation & editing | REST API |
| **Cloudinary** | Media storage & CDN | Node SDK |

</details>

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TB
    subgraph "Client Layer"
        A[React Frontend] --> B[Vite Dev Server]
        B --> C[Tailwind CSS]
    end
    
    subgraph "API Layer"
        D[Express Server] --> E[Auth Middleware]
        E --> F[Route Handlers]
    end
    
    subgraph "Service Layer"
        F --> G[AI Controller]
        F --> H[User Controller]
        G --> I[Gemini API]
        G --> J[Clipdrop API]
        H --> K[Cloudinary]
    end
    
    subgraph "Data Layer"
        H --> L[NeonDB PostgreSQL]
        K --> M[Cloud Storage]
    end
    
    A -->|HTTP/REST| D
    E -->|Verify| N[Clerk Auth]
    
    style A fill:#61dafb,stroke:#333,stroke-width:2px
    style D fill:#339933,stroke:#333,stroke-width:2px
    style L fill:#4169E1,stroke:#333,stroke-width:2px
    style I fill:#ff6b6b,stroke:#333,stroke-width:2px
```

</div>

### 🔄 Request Flow

```
┌──────────────┐
│   Client     │  1. User Action
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Clerk Auth   │  2. Token Verification
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Middleware  │  3. Plan & Rate Limit Check
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Controller   │  4. Business Logic
└──────┬───────┘
       │
       ├──────────────┐
       ▼              ▼
┌──────────┐   ┌──────────┐
│ AI APIs  │   │ Database │  5. External Calls
└──────────┘   └──────────┘
       │              │
       └──────┬───────┘
              ▼
      ┌──────────────┐
      │   Response   │  6. Formatted JSON
      └──────────────┘
```

---

## ⚡ Getting Started

### Prerequisites

Before diving in, ensure you have these installed:

<table>
<tr>
<td width="50%">

#### 🖥️ Required Software

```bash
# Node.js v18 or higher
node --version
# Should output: v18.x.x or higher

# npm or yarn
npm --version
# Should output: 9.x.x or higher

# Git
git --version
# Should output: 2.x.x or higher
```

</td>
<td width="50%">

#### 🔑 Required API Keys

- ✅ Clerk Account ([Sign up](https://clerk.com))
- ✅ NeonDB Instance ([Sign up](https://neon.tech))
- ✅ Gemini API Key ([Get Key](https://aistudio.google.com))
- ✅ Clipdrop API Key ([Get Key](https://clipdrop.co/apis))
- ✅ Cloudinary Account ([Sign up](https://cloudinary.com))

</td>
</tr>
</table>

### Installation

Follow these steps to set up AIverse locally:

<details open>
<summary><b>📥 Step 1: Clone Repository</b></summary>

```bash
# Clone the repository
git clone https://github.com/Variable07/AIverse.git

# Navigate to project directory
cd aiverse
```

</details>

<details open>
<summary><b>📦 Step 2: Install Dependencies</b></summary>

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

</details>

<details open>
<summary><b>⚙️ Step 3: Environment Configuration</b></summary>

Create `.env` files in both `client/` and `server/` directories:

**Server `.env`:**
```env
# Server Configuration
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database
NEON_DATABASE_URI=postgresql://user:pass@host.neon.tech/dbname?sslmode=require

# Authentication
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# AI Services
GEMINI_API_KEY=AIzaSyD_xxxxxxxxxxxxx
CLIPDROP_API_KEY=xxxxxxxxxxxxx

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=xxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxx
```

**Client `.env`:**
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

</details>

<details open>
<summary><b>🚀 Step 4: Launch Application</b></summary>

```bash
# Terminal 1: Start backend server
cd server
npm run dev
# Server running at http://localhost:4000

# Terminal 2: Start frontend
cd client
npm run dev
# Frontend running at http://localhost:5173
```

</details>

<details>
<summary><b>🐛 Troubleshooting Common Issues</b></summary>

**Port Already in Use:**
```bash
# Find process using port
lsof -i :4000

# Kill the process
kill -9 <PID>
```

**Database Connection Failed:**
- Verify NeonDB connection string format
- Ensure IP is whitelisted in NeonDB dashboard
- Check SSL mode is set to `require`

**API Keys Not Working:**
- Regenerate keys from respective dashboards
- Ensure no trailing spaces in `.env` file
- Restart both servers after updating `.env`

</details>

### Configuration

<details>
<summary><b>📋 Complete Environment Variables Reference</b></summary>

#### Server Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | Yes | Server port number | `4000` |
| `CORS_ORIGIN` | Yes | Allowed frontend origin | `http://localhost:5173` |
| `NEON_DATABASE_URI` | Yes | PostgreSQL connection string | `postgresql://...` |
| `CLERK_SECRET_KEY` | Yes | Clerk server-side secret | `sk_test_...` |
| `GEMINI_API_KEY` | Yes | Google AI API key | `AIzaSyD...` |
| `CLIPDROP_API_KEY` | Yes | Clipdrop API key | `clipdrop_...` |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name | `mycloud` |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret | `abcdef123` |

#### Client Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk public key | `pk_test_...` |
| `VITE_API_BASE_URL` | Yes | Backend API URL | `http://localhost:4000/api/v1` |

</details>

---

## 📁 Project Structure

<details open>
<summary><b>Click to expand full directory tree</b></summary>

```
aiverse/
├── 📂 client/                        # Frontend React Application
│   ├── 📂 public/
│   │   └── 📂 temp/                  # Temporary asset storage
│   ├── 📂 src/
│   │   ├── 📂 assets/                # Static resources & configs
│   │   │   └── assets.js
│   │   ├── 📂 components/            # Reusable UI components
│   │   │   ├── Navbar.jsx            # 🔝 Navigation with auth
│   │   │   ├── Hero.jsx              # 🎯 Landing hero section
│   │   │   ├── Sidebar.jsx           # 📊 Dashboard navigation
│   │   │   ├── Footer.jsx            # 👣 Global footer
│   │   │   ├── Aitools.jsx           # 🧰 AI tool cards grid
│   │   │   ├── Plan.jsx              # 💰 Pricing components
│   │   │   ├── ResumeAnalysisDisplay.jsx  # 📄 Resume insights UI
│   │   │   └── Recentcreations.jsx   # 🕐 Recent items list
│   │   ├── 📂 pages/                 # Route-level pages
│   │   │   ├── Home.jsx              # 🏠 Landing page
│   │   │   ├── Dashboard.jsx         # 📊 User dashboard
│   │   │   ├── GenerateImages.jsx    # 🎨 Image generation
│   │   │   ├── RemoveBackground.jsx  # 🧹 BG removal tool
│   │   │   ├── RemoveObject.jsx      # ✂️ Object removal
│   │   │   ├── ReviewResume.jsx      # 📝 Resume analyzer
│   │   │   ├── WriteArticle.jsx      # ✍️ Article generator
│   │   │   └── Community.jsx         # 🌐 Public gallery
│   │   ├── App.jsx                   # ⚛️ Root component
│   │   ├── main.jsx                  # 🚀 Entry point
│   │   └── index.css                 # 🎨 Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── 📂 server/                        # Backend Express Application
    ├── 📂 public/
    │   └── 📂 temp/                  # Upload staging
    ├── 📂 src/
    │   ├── 📂 controllers/           # Business logic layer
    │   │   ├── ai.controller.js      # 🤖 AI operations
    │   │   └── user.controller.js    # 👤 User management
    │   ├── 📂 routes/                # API endpoints
    │   │   ├── ai.routes.js          # 🔗 AI routes
    │   │   └── user.routes.js        # 🔗 User routes
    │   ├── 📂 middlewares/           # Request interceptors
    │   │   ├── auth.middleware.js    # 🔐 Auth validation
    │   │   └── multer.middleware.js  # 📤 File uploads
    │   ├── 📂 db/
    │   │   └── index.js              # 🗄️ Database connection
    │   ├── 📂 utils/                 # Helper utilities
    │   │   ├── apiError.js           # ❌ Error handling
    │   │   ├── apiResponse.js        # ✅ Response formatter
    │   │   ├── cloudinaryConfig.js   # ☁️ Cloudinary setup
    │   │   ├── expressAsyncHandler.js # 🔄 Async wrapper
    │   │   └── tryCatchWrapper.js    # 🛡️ Error safety
    │   ├── app.js                    # 🌐 Express config
    │   ├── server.js                 # 🚀 Server entry
    │   └── constant.js               # ⚙️ App constants
    ├── package.json
    └── .env
```

</details>

### 📊 Component Architecture

```
┌─────────────────────────────────────────────┐
│             Frontend (React)                │
├─────────────────────────────────────────────┤
│  Pages  →  Components  →  Assets            │
│    ↓           ↓             ↓              │
│  Routing   Reusable UI   Static Files       │
└─────────────────┬───────────────────────────┘
                  │ Axios HTTP
┌─────────────────┴───────────────────────────┐
│             Backend (Express)               │
├─────────────────────────────────────────────┤
│  Routes → Middleware → Controllers          │
│    ↓          ↓            ↓                │
│  Endpoints  Auth/Files  Business Logic      │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
   [Database]           [AI Services]
   NeonDB               Gemini, Clipdrop
```

---

## 🎨 Usage Examples

### 📝 Generate an Article

```javascript
// API Request Example
POST /api/v1/ai/generate-article
Content-Type: application/json
Authorization: Bearer <clerk_token>

{
  "topic": "The Future of Quantum Computing",
  "tone": "professional",
  "wordCount": 800
}

// Response
{
  "success": true,
  "data": {
    "id": "art_xyz123",
    "title": "The Future of Quantum Computing",
    "content": "...",
    "metadata": {
      "wordCount": 812,
      "readTime": "4 min",
      "generatedAt": "2025-11-02T10:30:00Z"
    }
  }
}
```

### 🎨 Create an Image

```javascript
// API Request Example
POST /api/v1/ai/generate-image
Content-Type: application/json
Authorization: Bearer <clerk_token>

{
  "prompt": "A futuristic cityscape at sunset with flying cars",
  "style": "realistic",
  "resolution": "1024x1024"
}

// Response
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/.../image.png",
    "promptUsed": "...",
    "style": "realistic",
    "dimensions": {
      "width": 1024,
      "height": 1024
    }
  }
}
```

### 📄 Analyze Resume

```javascript
// API Request Example
POST /api/v1/ai/analyze-resume
Content-Type: multipart/form-data
Authorization: Bearer <clerk_token>

FormData: {
  resume: <PDF File>,
  targetRole: "Senior Software Engineer"
}

// Response
{
  "success": true,
  "data": {
    "atsScore": 87,
    "strengths": ["Strong technical skills", "Clear formatting"],
    "improvements": ["Add more quantifiable achievements"],
    "keywords": {
      "present": ["React", "Node.js", "AWS"],
      "missing": ["Kubernetes", "CI/CD"]
    }
  }
}
```

---

## 🚀 Deployment

### 🌐 Deploy to Production

<details>
<summary><b>Vercel (Frontend)</b></summary>

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd client
vercel --prod
```

**Environment Variables in Vercel:**
- Add all `VITE_*` variables in Vercel dashboard
- Update `VITE_API_BASE_URL` to production backend URL

</details>

<details>
<summary><b>Railway/Render (Backend)</b></summary>

**Railway:**
```bash
# Install Railway CLI
npm i -g railway

# Login and init
railway login
railway init

# Deploy
railway up
```

**Render:**
1. Connect GitHub repository
2. Select `server` directory as root
3. Add environment variables
4. Deploy

</details>

<details>
<summary><b>Docker Deployment</b></summary>

```dockerfile
# Dockerfile (Backend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["node", "src/server.js"]
```

```bash
# Build and run
docker build -t aiverse-backend .
docker run -p 4000:4000 --env-file .env aiverse-backend
```

</details>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🔧 Development Workflow

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/Variable07/AIverse.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and commit
git commit -m "Add: amazing feature description"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Open a Pull Request
```

### 📋 Contribution Guidelines

- ✅ Follow existing code style and conventions
- ✅ Write clear, descriptive commit messages
- ✅ Add tests for new features
- ✅ Update documentation as needed
- ✅ Ensure all tests pass before submitting PR

### 🐛 Bug Reports

Found a bug? [Open an issue](https://github.com/Variable07/AIverse.git) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📝 License

<div align="center">

**AIverse** is open-source software licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

```
MIT License

Copyright (c) 2025 AIverse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

> ⚠️ **Note:** API keys for Clerk, Cloudinary, Gemini, and Clipdrop are not included and must be obtained separately. Usage is subject to their respective terms of service.

---

## 🙏 Acknowledgments

<div align="center">

### 💎 Built With Love Using

</div>

<table align="center">
<tr>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="60" /><br />
<sub><b>React Team</b></sub><br />
<sub>Frontend Framework</sub>
</td>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="60" /><br />
<sub><b>Node.js Foundation</b></sub><br />
<sub>Backend Runtime</sub>
</td>
<td align="center" width="25%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="60" /><br />
<sub><b>NeonDB</b></sub><br />
<sub>Serverless Database</sub>
</td>
<td align="center" width="25%">
<img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" width="60" /><br />
<sub><b>Google AI</b></sub><br />
<sub>Gemini 2.0 Flash</sub>
</td>
</tr>
</table>

### 🌟 Special Thanks To

- **Clipdrop** for powerful image AI APIs
- **Clerk** for seamless authentication solutions
- **Cloudinary** for reliable media management
- **Open Source Community** for continuous innovation
- **Beta Testers** for invaluable feedback

---

## 📧 Contact

<div align="center">

### 💬 Get in Touch

**Project Maintainer:** [Your Name]

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:soumyahedaoo@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/soumya-hedaoo-973a2422a/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/HedaooSoumya)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Variable07)

**Project Link:** [https://github.com/yourusername/aiverse](https://github.com/Variable07/AIverse)

---

<sub>Made with ❤️ by the AIverse Team(Souumya Hedaoo)</sub>

**⭐ Star us on GitHub — it helps!**

</div>
