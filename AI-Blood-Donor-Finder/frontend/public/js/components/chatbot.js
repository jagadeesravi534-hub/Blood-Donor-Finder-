// ===== CHATBOT COMPONENT =====
// BloodFinder AI - AI Chatbot Component

class Chatbot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();
        this.addMessage(message, 'user');
        input.value = '';

        this.addBotResponse(message);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addBotResponse(userMessage) {
        if (this.isTyping) return;
        this.isTyping = true;

        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = '...';
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const response = this.generateResponse(userMessage);

        setTimeout(() => {
            botMessage.textContent = response;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            this.isTyping = false;
        }, 1000);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! I\'m BloodBot, your AI assistant. How can I help you today?';
        }

        if (lowerMessage.includes('find') || lowerMessage.includes('search')) {
            if (lowerMessage.includes('blood') || lowerMessage.includes('donor')) {
                return 'I can help you find blood donors. Please visit the Find Donor page and enter the blood group and location. Would you like me to redirect you?';
            }
            return 'What would you like to search for? You can search for blood donors, hospitals, or FAQs.';
        }

        if (lowerMessage.includes('emergency')) {
            return 'If this is an emergency, please click the "Send Emergency Alert" button on the Blood Request page. This will notify all nearby donors immediately.';
        }

        if (lowerMessage.includes('donate') || lowerMessage.includes('register')) {
            return 'Thank you for wanting to donate! You can register as a donor by clicking "Register" in the navigation menu. It takes less than 2 minutes.';
        }

        if (lowerMessage.includes('eligib')) {
            return 'Donors must be at least 18 years old, weigh at least 50 kg, and be in good health. You should also wait at least 56 days between donations.';
        }

        if (lowerMessage.includes('blood group') || lowerMessage.includes('blood type')) {
            return 'We support all blood groups: A+, A-, B+, B-, AB+, AB-, O+, and O-. The most common is O+ and the rarest is AB-.';
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
            return 'You can contact us at info@bloodfinder.ai or call +91 1800-BLOOD-01. We\'re available 24/7 for emergencies.';
        }

        if (lowerMessage.includes('voice') || lowerMessage.includes('microphone')) {
            return 'You can use voice commands by clicking the microphone button at the bottom left of any page. Try saying "Find O+ blood in Mumbai" or "Send emergency alert".';
        }

        if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        }

        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return 'Goodbye! Stay safe and thank you for being part of our life-saving community.';
        }

        return 'I\'m sorry, I didn\'t understand that. I can help you find blood donors, send emergency alerts, or answer questions about blood donation. What would you like to know?';
    }
}

const chatbot = new Chatbot();
