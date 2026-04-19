## Made By - Sayan Kundu

**Full Stack Developer | Hands On Experince in EdTech & Fintech | Passionate about building real-world solutions**

---

## 🔗 Links
[![Resume](https://img.shields.io/badge/View_Resume-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://drive.google.com/file/d/1c0JPOQJcRBYOldQvooPfd4gQQ0kkJgbq/view?usp=drive_link)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sayan-kundu-70b5442b6/)
[![Github](https://img.shields.io/badge/github-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://github.com/sayank22)
[![Portfolio](https://img.shields.io/badge/Portfolio-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://sayan-kundu-portfolio.netlify.app)

---

# DocAI

Live Demo: [https://jivaka-sayankundu.vercel.app](https://jivaka-sayankundu.vercel.app)

---

# DocAI - AI-driven CRM assistant

DocAI enables medical representatives to log and manage doctor interactions using natural language instead of manual form entry. Powered by LangGraph and LLM-based tools, it intelligently extracts structured data, updates records, and provides actionable insights like sentiment, outcomes, and follow-ups. This creates a faster, smarter, and more intuitive CRM experience.

## Features

- **AI-Powered Form Automation:**  
Automatically fills HCP interaction form from natural language input.

- **LangGraph-Based Tool Orchestration:**  
  Uses a multi-step AI workflow (extract → decide → execute).

- **Intelligent Data Extraction:**  
  Converts unstructured text into structured CRM fields (name, date, time, etc.)

- **Edit via Natural Language:**  
  Update specific fields without manually editing the form.

- **Multi-Tool AI System:**  
  Log Interaction
  Edit Interaction
  Summarize Interaction
  Analyze Interaction (sentiment + interest + outcomes)
  Follow-up Suggestions 

  - **Context-Aware Updates:**  
  AI considers existing form state while making changes.

  - **Real-Time UI Sync:**  
  Form updates instantly based on AI responses.

  - **Supabase Integration:**  
  Stores interaction data in PostgreSQL database.

  - **Clean Split-Screen UI:**  
  Chat assistant + structured form working together.


---

## 🚀 Technologies I Used

**Frontend:**
 React.js
 TypeScript
 Redux Toolkit (state management)
 CSS (custom styling)

**Backend:**
 Python
 LangGraph (AI workflow orchestration)
 Groq API (LLM - LLaMA 3.3 70B)
 FastAPI (or your API layer)

**Database:** 
Supabase (PostgreSQL)

**AI / Architecture:**
 LLM-driven tool selection
 Prompt engineering for structured extraction
 JSON-based data pipeline
 Modular tool system


---

## 🌐 Live Links

**🔗 Frontend: https://jivaka-sayankundu.vercel.app**
**🔗 Backend API: https://jivaka-backend.onrender.com**

---


## Getting Started

# 1. Clone the repo
   ```bash
   git clone https://github.com/sayank22/DocAI.git
   ```

# 2. Backend Setup
   ```bash
  cd server
 python -m venv venv
 venv\Scripts\activate   # or source venv/bin/activate
 pip install -r requirements.txt

   ```
**Create a .env file in /Server:**
```ini
GROQ_API_KEY=your_groq_api_key

```
**Run the server:**
```bash

uvicorn main:app --reload

```

# 3. Frontend Setup
   ```bash
  cd client
npm install

   ```
**Create a .env file in /client:**
```ini
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```
**Run the server:**
```bash

npm run dev

```

## Demo

See it live: [https://jivaka-sayankundu.vercel.app](https://jivaka-sayankundu.vercel.app)

![Desktop Demo 1](client/src/assets/Screenshot.png)