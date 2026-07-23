"""
BloodFinder AI - Voice AI

This module implements the AI voice assistant for BloodFinder AI,
handling voice commands for blood donor search and emergency alerts.

Author: BloodFinder AI Team
"""

import re
from typing import Dict, Optional


class VoiceAI:
    """AI-powered voice assistant for blood donation assistance"""

    def __init__(self):
        self.commands = {
            'find_donor': {
                'patterns': [
                    r'find\s+(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)\s+blood\s+in\s+(.+)',
                    r'search\s+(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)\s+blood\s+in\s+(.+)',
                    r'looking\s+for\s+(a\+|a-|b\+|b-|ab\+|ab-|o\+|o-)\s+blood\s+in\s+(.+)'
                ],
                'action': 'find_donor'
            },
            'emergency': {
                'patterns': [
                    r'emergency',
                    r'send\s+emergency\s+alert',
                    r'urgent\s+help'
                ],
                'action': 'emergency_alert'
            },
            'register': {
                'patterns': [
                    r'register',
                    r'sign\s+up',
                    r'become\s+a\s+donor'
                ],
                'action': 'register'
            },
            'login': {
                'patterns': [
                    r'login',
                    r'sign\s+in',
                    r'log\s+in'
                ],
                'action': 'login'
            },
            'dashboard': {
                'patterns': [
                    r'dashboard',
                    r'my\s+profile',
                    r'my\s+account'
                ],
                'action': 'dashboard'
            },
            'history': {
                'patterns': [
                    r'donation\s+history',
                    r'my\s+donations',
                    r'previous\s+donations'
                ],
                'action': 'history'
            },
            'help': {
                'patterns': [
                    r'help',
                    r'what\s+can\s+i\s+do',
                    r'commands'
                ],
                'action': 'help'
            }
        }

    def process_command(self, command: str) -> Dict:
        """Process a voice command and return the action and parameters"""
        command_lower = command.lower().strip()

        for intent, config in self.commands.items():
            for pattern in config['patterns']:
                match = re.search(pattern, command_lower)
                if match:
                    result = {
                        'intent': intent,
                        'action': config['action'],
                        'confidence': 0.95
                    }

                    # Extract entities from match groups
                    if intent == 'find_donor' and match.groups():
                        result['blood_group'] = match.group(1).upper()
                        result['location'] = match.group(2).strip()

                    return result

        return {
            'intent': 'unknown',
            'action': 'unknown',
            'confidence': 0.0,
            'response': "I didn't understand that. Try saying 'Find O+ blood in Mumbai' or 'Send emergency alert'."
        }

    def generate_voice_response(self, result: Dict) -> str:
        """Generate a spoken response for the voice command"""
        action = result.get('action', 'unknown')

        if action == 'find_donor':
            blood = result.get('blood_group', 'any')
            location = result.get('location', 'your area')
            return f"Finding {blood} blood donors in {location}"
        elif action == 'emergency_alert':
            return "Sending emergency alert to all nearby donors"
        elif action == 'register':
            return "Redirecting to the donor registration page"
        elif action == 'login':
            return "Redirecting to the login page"
        elif action == 'dashboard':
            return "Redirecting to your dashboard"
        elif action == 'history':
            return "Redirecting to your donation history"
        elif action == 'help':
            return "You can say: Find O positive blood in Mumbai, Send emergency alert, Register as donor, or Show my dashboard"
        else:
            return "I didn't understand that. Try saying 'Find O+ blood in Mumbai' or 'Send emergency alert'."


if __name__ == '__main__':
    voice_ai = VoiceAI()

    test_commands = [
        "Find O+ blood in Mumbai",
        "Send emergency alert",
        "Register as a donor",
        "Show my donation history",
        "What can I do?"
    ]

    for cmd in test_commands:
        result = voice_ai.process_command(cmd)
        response = voice_ai.generate_voice_response(result)
        print(f"Command: {cmd}")
        print(f"Result: {result}")
        print(f"Response: {response}")
        print()
