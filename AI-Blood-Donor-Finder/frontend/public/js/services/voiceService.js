// ===== VOICE SERVICE =====
// BloodFinder AI - Voice Service

class VoiceService {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.voiceCommands = {
            'find': this.handleFindCommand,
            'search': this.handleFindCommand,
            'emergency': this.handleEmergencyCommand,
            'alert': this.handleEmergencyCommand,
            'donate': this.handleDonateCommand,
            'register': this.handleRegisterCommand,
            'login': this.handleLoginCommand,
            'dashboard': this.handleDashboardCommand,
            'history': this.handleHistoryCommand,
            'help': this.handleHelpCommand
        };
    }

    // Initialize speech recognition
    initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.processCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.speak('Sorry, I did not understand that. Please try again.');
            };

            this.recognition.onend = () => {
                this.isListening = false;
            };
        } else {
            console.warn('Speech recognition not supported in this browser.');
        }
    }

    // Start listening
    startListening() {
        if (!this.recognition) {
            this.initRecognition();
        }

        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
            this.updateVoiceStatus('listening', 'Listening...');
        }
    }

    // Stop listening
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateVoiceStatus('not-listening', 'Not listening');
        }
    }

    // Speak text
    speak(text) {
        if (this.synthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
            this.synthesis.speak(utterance);
        }
    }

    // Process voice command
    processCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        this.updateTranscript(command);

        // Extract blood group
        const bloodGroupMatch = lowerCommand.match(/\b(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)\b/);
        const bloodGroup = bloodGroupMatch ? bloodGroupMatch[0].toUpperCase() : null;

        // Extract location
        const locationMatch = lowerCommand.match(/in\s+(.+)/);
        const location = locationMatch ? locationMatch[1].trim() : null;

        // Check for specific commands
        let handled = false;
        for (const [keyword, handler] of Object.entries(this.voiceCommands)) {
            if (lowerCommand.includes(keyword)) {
                handler.call(this, lowerCommand, bloodGroup, location);
                handled = true;
                break;
            }
        }

        if (!handled) {
            this.speak('I can help you find blood donors, send emergency alerts, or register as a donor. What would you like to do?');
        }
    }

    // Handle find donor command
    handleFindCommand(command, bloodGroup, location) {
        if (bloodGroup && location) {
            this.speak(`Finding ${bloodGroup} blood donors in ${location}`);
            window.location.href = `find-donor.html?blood=${bloodGroup}&location=${encodeURIComponent(location)}`;
        } else if (bloodGroup) {
            this.speak(`You said ${bloodGroup}. Please tell me the location.`);
        } else {
            this.speak('Please tell me the blood group and location. For example, find O positive blood in Mumbai.');
        }
    }

    // Handle emergency command
    handleEmergencyCommand() {
        this.speak('Sending emergency alert to nearby donors');
        const emergencyBtn = document.getElementById('emergency-btn');
        if (emergencyBtn) {
            emergencyBtn.click();
        }
    }

    // Handle donate command
    handleDonateCommand() {
        this.speak('Redirecting to the donor registration page');
        window.location.href = 'register.html';
    }

    // Handle register command
    handleRegisterCommand() {
        this.speak('Redirecting to the registration page');
        window.location.href = 'register.html';
    }

    // Handle login command
    handleLoginCommand() {
        this.speak('Redirecting to the login page');
        window.location.href = 'login.html';
    }

    // Handle dashboard command
    handleDashboardCommand() {
        this.speak('Redirecting to your dashboard');
        window.location.href = 'dashboard.html';
    }

    // Handle history command
    handleHistoryCommand() {
        this.speak('Redirecting to your donation history');
        window.location.href = 'dashboard.html#donations';
    }

    // Handle help command
    handleHelpCommand() {
        const helpText = 'You can say: Find O positive blood in Mumbai, Send emergency alert, Register as donor, Show my dashboard, or Show my donation history.';
        this.speak(helpText);
    }

    // Update voice status
    updateVoiceStatus(status, message) {
        const statusElement = document.getElementById('voice-status');
        if (statusElement) {
            statusElement.className = `voice-status ${status}`;
            statusElement.innerHTML = `<i class="fas fa-microphone-${status === 'listening' ? 'slash' : 'alt'}"></i><span>${message}</span>`;
        }
    }

    // Update transcript
    updateTranscript(text) {
        const transcriptElement = document.getElementById('voice-transcript');
        if (transcriptElement) {
            transcriptElement.innerHTML = `<p>${text}</p>`;
        }
    }
}

const voiceService = new VoiceService();
