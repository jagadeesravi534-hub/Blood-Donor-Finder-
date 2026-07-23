# 🩸 BloodFinder AI - Emergency Blood Donor Finder

An AI-powered emergency blood donor finder with voice assistant, fake request detection, and predictive analytics.

## 🚀 Features

- **AI-Based Blood Donor Matching** - Find compatible blood donors instantly
- **Google Maps Integration** - Search donors on interactive maps with real-time distance
- **Emergency Alerts** - Send emergency alerts to nearby donors in seconds
- **AI Chatbot** - BloodBot AI assistant for instant help
- **AI Voice Assistant** - Voice commands for hands-free operation
- **Fake Request Detection** - AI-powered detection of fraudulent requests
- **Predictive Analytics** - AI predicts blood demand and donor response rates
- **JWT + OTP Authentication** - Secure authentication system
- **Multi-channel Notifications** - Email, SMS, Push, and WhatsApp
- **Hospital Dashboard** - Blood inventory tracking and demand forecasting
- **Admin Dashboard** - User management and system analytics
- **Multilingual Support** - Multiple language support
- **Responsive Design** - Works on all devices

## 🏗️ Project Structure

```
AI-Blood-Donor-Finder/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── register.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── find-donor.html
│   │   ├── blood-request.html
│   │   ├── contact.html
│   │   ├── faq.html
│   │   ├── hospital-dashboard.html
│   │   ├── admin-dashboard.html
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── responsive.css
│   │   └── js/
│   │       ├── main.js
│   │       ├── services/
│   │       │   ├── authService.js
│   │       │   ├── donorService.js
│   │       │   └── voiceService.js
│   │       ├── components/
│   │       │   ├── chatbot.js
│   │       │   └── voiceAssistant.js
│   │       └── pages/
│   │           └── findDonor.js
│   └── ...
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   ├── BloodRequest.js
│   │   ├── Hospital.js
│   │   ├── Notification.js
│   │   ├── Donation.js
│   │   └── Feedback.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── AI/
│   │   ├── donorMatching.py
│   │   ├── fakeRequestDetection.py
│   │   ├── priorityPrediction.py
│   │   ├── chatbot.py
│   │   └── voiceAI.py
│   └── ...
├── ai-model/
├── database/
├── docs/
└── deployment/
    ├── Dockerfile
    ├── docker-compose.yml
    └── nginx.conf
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)
- Python (v3.9+)
- npm or yarn

### Frontend Setup
```bash
cd frontend
# The frontend is built with vanilla HTML, CSS, and JavaScript
# No build step required - just open index.html in a browser
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### AI Model Setup
```bash
cd backend/AI
pip install numpy
python donorMatching.py
```

### Docker Deployment
```bash
cd deployment
docker-compose up -d
```

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bloodfinder
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🎯 Usage

1. **Find a Blood Donor**: Visit `find-donor.html`, select blood group and location
2. **Post a Blood Request**: Visit `blood-request.html` to request blood
3. **Register as Donor**: Visit `register.html` to become a donor
4. **Login**: Visit `login.html` to access your dashboard
5. **Use Voice Assistant**: Click the microphone button for voice commands
6. **Chat with AI**: Click the chatbot icon for AI assistance

## 🤖 AI Features

### Donor Matching
AI algorithm matches donors based on:
- Blood group compatibility (30%)
- Geographic proximity (25%)
- Donor availability (15%)
- Historical response rate (15%)
- Donation frequency (10%)

### Fake Request Detection
Detects fraudulent requests using:
- Repeated request patterns
- Unusual timing analysis
- Information consistency checks
- Contact validation

### Priority Prediction
Predicts emergency priority based on:
- Blood group rarity
- Patient age
- Urgency level
- Time sensitivity
- Medical condition severity

## 📱 Screenshots

- **Home Page**: Hero section with search, features, statistics, and testimonials
- **Find Donor**: Advanced search with filters and voice search
- **Blood Request**: Emergency alert and request form
- **Dashboard**: Donor and hospital dashboards with analytics
- **Chatbot**: AI-powered chatbot for instant assistance
- **Voice Assistant**: Voice-controlled navigation and commands

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI**: Python (NumPy)
- **Authentication**: JWT, bcryptjs
- **Real-time**: Socket.IO
- **Deployment**: Docker, Nginx

## 📄 License

MIT License - See LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📞 Contact

- Email: info@bloodfinder.ai
- Phone: +91 1800-BLOOD-01
- Website: https://bloodfinder.ai

---

**Made with ❤️ for humanity**
