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

Live Demo: [https://doc-ai-sayan-kundu-eta.vercel.app](https://doc-ai-sayan-kundu-eta.vercel.app)

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

## 🛠 Tech Stack

**Frontend**
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**Backend & Database**
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**AI & Architecture**
* **LLM Engine:** Groq API (LLaMA 3.3 70B)
* **Orchestration:** LangGraph
* **System Design:** Modular tool system with LLM-driven tool selection
* **Data Pipeline:** Prompt engineering for structured, JSON-based extraction


---

## 🌐 Live Links

**🔗 Frontend: [https://doc-ai-sayan-kundu-eta.vercel.app](https://doc-ai-sayan-kundu-eta.vercel.app)**  
**🔗 Backend API: [https://docai-5ro0.onrender.com](https://docai-5ro0.onrender.com)**

---


## Getting Started

### 1. Clone the repo
   ```bash
   git clone https://github.com/sayank22/DocAI.git
   ```

### 2. Backend Setup
Navigate to the server directory, create a virtual environment, and install the required dependencies.
   ```bash
  cd server
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
   ```
**Set up environment variables::**
Create a .env file inside the server/ directory and add your API credentials:
```ini
FRONTEND_URL=your_frontend_url
GROQ_API_KEY=your_groq_api_key
```
**Run the backend server:**
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install the dependencies.
   ```bash
  cd client
npm install
   ```
**Set up environment variables:**
Create a .env file inside the client/ directory and add your backend URL & Supabase credentials:
```ini
VITE_API_URL=https://your-backend.onrender.com
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
**Run the frontend application:**
```bash
npm run dev
```

---

## Demo

See it live: [https://doc-ai-sayan-kundu-eta.vercel.app](https://doc-ai-sayan-kundu-eta.vercel.app)

![Desktop Demo 1](client/src/assets/Screenshot.png)