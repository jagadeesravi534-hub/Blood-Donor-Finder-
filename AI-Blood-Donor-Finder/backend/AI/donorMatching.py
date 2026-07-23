"""
BloodFinder AI - Donor Matching Algorithm

This module implements AI-powered donor matching based on:
- Blood group compatibility
- Geographic proximity
- Donor availability
- Historical response rate
- Donor preferences

Author: BloodFinder AI Team
"""

import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Optional

# Blood group compatibility matrix
BLOOD_COMPATIBILITY = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+']
}


class DonorMatcher:
    """AI-powered donor matching system"""

    def __init__(self):
        self.weights = {
            'blood_compatibility': 0.3,
            'distance': 0.25,
            'availability': 0.15,
            'response_rate': 0.15,
            'donation_frequency': 0.1
        }

    def calculate_compatibility_score(self, donor: Dict, request: Dict) -> float:
        """Calculate compatibility score for a donor-request pair"""
        score = 0.0

        # Blood group compatibility (30%)
        if donor['blood_group'] in BLOOD_COMPATIBILITY.get(request['blood_group'], []):
            score += self.weights['blood_compatibility']
        else:
            return 0.0  # Incompatible blood group

        # Distance score (25%)
        distance = donor.get('distance', 100)
        max_distance = request.get('radius', 10)
        if distance <= max_distance:
            score += self.weights['distance'] * (1 - distance / max_distance)
        else:
            return 0.0  # Outside search radius

        # Availability score (15%)
        if donor.get('is_available', False):
            score += self.weights['availability']

        # Response rate score (15%)
        response_rate = donor.get('response_rate', 0.5)
        score += self.weights['response_rate'] * response_rate

        # Donation frequency score (10%)
        total_donations = donor.get('total_donations', 0)
        frequency_score = min(total_donations / 50, 1.0)  # Normalize to 50 donations
        score += self.weights['donation_frequency'] * frequency_score

        return round(score, 4)

    def match_donors(self, request: Dict, donors: List[Dict], top_k: int = 10) -> List[Dict]:
        """Match donors to a blood request using AI scoring"""
        scored_donors = []

        for donor in donors:
            score = self.calculate_compatibility_score(donor, request)
            if score > 0:
                scored_donors.append({
                    'donor': donor,
                    'score': score
                })

        # Sort by score descending
        scored_donors.sort(key=lambda x: x['score'], reverse=True)

        # Return top K matches
        return scored_donors[:top_k]

    def predict_response_time(self, donor: Dict, request: Dict) -> float:
        """Predict the time (in minutes) a donor will respond"""
        base_time = 30  # Base response time in minutes

        # Adjust for distance
        distance = donor.get('distance', 10)
        base_time += distance * 2

        # Adjust for availability
        if donor.get('is_available', False):
            base_time *= 0.7
        else:
            base_time *= 1.5

        # Adjust for response rate
        response_rate = donor.get('response_rate', 0.5)
        base_time *= (1.5 - response_rate)

        # Adjust for urgency
        if request.get('urgency') == 'emergency':
            base_time *= 0.5
        elif request.get('urgency') == 'urgent':
            base_time *= 0.7

        return round(base_time, 1)


# Example usage
if __name__ == '__main__':
    matcher = DonorMatcher()

    sample_request = {
        'blood_group': 'O+',
        'radius': 10,
        'urgency': 'urgent'
    }

    sample_donors = [
        {'blood_group': 'O+', 'distance': 2.5, 'is_available': True, 'response_rate': 0.8, 'total_donations': 12},
        {'blood_group': 'O-', 'distance': 3.0, 'is_available': True, 'response_rate': 0.9, 'total_donations': 8},
        {'blood_group': 'A+', 'distance': 1.0, 'is_available': False, 'response_rate': 0.6, 'total_donations': 5},
    ]

    matches = matcher.match_donors(sample_request, sample_donors)
    print("Top donor matches:")
    for match in matches:
        print(f"  Score: {match['score']}, Donor: {match['donor']['blood_group']}")
