"""
BloodFinder AI - AI Chatbot

This module implements the AI chatbot for BloodFinder AI,
handling user queries about blood donation, donor search, and more.

Author: BloodFinder AI Team
"""

import re
from typing import Dict, List


class BloodBotAI:
    """AI-powered chatbot for blood donation assistance"""

    def __init__(self):
        self.intents = {
            'greeting': ['hello', 'hi', 'hey', 'good morning', 'good evening'],
            'find_donor': ['find', 'search', 'looking for', 'need blood', 'donor'],
            'emergency': ['emergency', 'urgent', 'help', 'accident'],
            'donate': ['donate', 'donation', 'want to donate', 'register'],
            'eligibility': ['eligible', 'eligibility', 'can i donate', 'qualification'],
            'blood_groups': ['blood group', 'blood type', 'a positive', 'o negative'],
            'contact': ['contact', 'support', 'help', 'phone', 'email'],
            'voice': ['voice', 'microphone', 'speech', 'talk'],
            'faq': ['faq', 'question', 'how to', 'what is', 'why'],
            'thanks': ['thank', 'thanks', 'appreciate'],
            'goodbye': ['bye', 'goodbye', 'see you', 'later']
        }

        self.responses = {
            'greeting': "Hello! I'm BloodBot, your AI assistant. How can I help you today?",
            'find_donor': "I can help you find blood donors. Visit the Find Donor page and enter the blood group and location. Would you like me to redirect you?",
            'emergency': "If this is an emergency, click 'Send Emergency Alert' on the Blood Request page. This will notify all nearby donors immediately.",
            'donate': "Thank you for wanting to donate! Register as a donor by clicking 'Register' in the navigation menu. It takes less than 2 minutes.",
            'eligibility': "Donors must be at least 18 years old, weigh at least 50 kg, and be in good health. Wait at least 56 days between donations.",
            'blood_groups': "We support all blood groups: A+, A-, B+, B-, AB+, AB-, O+, and O-. The most common is O+ and the rarest is AB-.",
            'contact': "Contact us at info@bloodfinder.ai or call +91 1800-BLOOD-01. We're available 24/7 for emergencies.",
            'voice': "Use voice commands by clicking the microphone button. Try saying 'Find O+ blood in Mumbai' or 'Send emergency alert'.",
            'faq': "Visit our FAQ page for answers to common questions about blood donation and our platform.",
            'thanks': "You're welcome! Is there anything else I can help you with?",
            'goodbye': "Goodbye! Stay safe and thank you for being part of our life-saving community.",
            'default': "I'm sorry, I didn't understand that. I can help you find blood donors, send emergency alerts, or answer questions about blood donation."
        }

    def classify_intent(self, message: str) -> str:
        """Classify the user's intent from their message"""
        message_lower = message.lower()

        for intent, keywords in self.intents.items():
            for keyword in keywords:
                if keyword in message_lower:
                    return intent

        return 'default'

    def generate_response(self, message: str) -> str:
        """Generate a response based on the user's message"""
        intent = self.classify_intent(message)
        return self.responses.get(intent, self.responses['default'])

    def extract_entities(self, message: str) -> Dict:
        """Extract entities like blood group and location from the message"""
        entities = {}

        # Extract blood group
        blood_group_pattern = r'\b(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)\b'
        blood_match = re.search(blood_group_pattern, message.lower())
        if blood_match:
            entities['blood_group'] = blood_match.group(1).upper()

        # Extract location
        location_pattern = r'in\s+(.+)'
        location_match = re.search(location_pattern, message.lower())
        if location_match:
            entities['location'] = location_match.group(1).strip()

        return entities


if __name__ == '__main__':
    bot = BloodBotAI()

    test_messages = [
        "Hello, I need O+ blood in Mumbai",
        "How do I register as a donor?",
        "Is this an emergency?",
        "Thank you for your help!",
        "What are the blood group compatibility rules?"
    ]

    for msg in test_messages:
        intent = bot.classify_intent(msg)
        response = bot.generate_response(msg)
        entities = bot.extract_entities(msg)
        print(f"Message: {msg}")
        print(f"Intent: {intent}")
        print(f"Entities: {entities}")
        print(f"Response: {response}")
        print()
