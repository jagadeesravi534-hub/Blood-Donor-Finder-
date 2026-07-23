// ===== VOICE ASSISTANT COMPONENT =====
// BloodFinder AI - Voice Assistant Component

class VoiceAssistant {
    constructor() {
        this.init();
    }

    init() {
        const startBtn = document.getElementById('voice-start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => voiceService.startListening());
        }
    }
}

const voiceAssistant = new VoiceAssistant();
