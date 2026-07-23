"""
BloodFinder AI - Emergency Priority Prediction

This module implements AI-powered prediction of emergency priority
for blood requests based on multiple factors.

Author: BloodFinder AI Team
"""

from typing import Dict
from datetime import datetime


class PriorityPredictor:
    """AI-powered emergency priority prediction system"""

    def __init__(self):
        self.priority_weights = {
            'blood_group_rarity': 0.25,
            'patient_age': 0.15,
            'urgency_level': 0.2,
            'time_sensitivity': 0.15,
            'medical_condition': 0.15,
            'location_density': 0.1
        }

    def predict_priority(self, request: Dict) -> Dict:
        """Predict the priority level of a blood request"""
        score = 0.0
        factors = {}

        # Blood group rarity (25%)
        rarity_scores = {
            'O-': 1.0, 'AB-': 0.9, 'B-': 0.8, 'A-': 0.7,
            'AB+': 0.6, 'O+': 0.3, 'A+': 0.3, 'B+': 0.3
        }
        rarity = rarity_scores.get(request.get('blood_group'), 0.5)
        factors['blood_group_rarity'] = rarity
        score += self.priority_weights['blood_group_rarity'] * rarity

        # Patient age (15%)
        age = request.get('patient_age', 30)
        if age < 5:
            age_score = 1.0
        elif age > 65:
            age_score = 0.9
        elif age < 18:
            age_score = 0.8
        else:
            age_score = 0.5
        factors['patient_age'] = age_score
        score += self.priority_weights['patient_age'] * age_score

        # Urgency level (20%)
        urgency_scores = {'emergency': 1.0, 'urgent': 0.7, 'normal': 0.3}
        urgency = urgency_scores.get(request.get('urgency', 'normal'), 0.3)
        factors['urgency_level'] = urgency
        score += self.priority_weights['urgency_level'] * urgency

        # Time sensitivity (15%)
        if request.get('required_by'):
            try:
                required_by = datetime.fromisoformat(request['required_by'])
                hours_remaining = (required_by - datetime.now()).total_seconds() / 3600
                time_score = max(0, min(1, 24 - hours_remaining) / 24) if hours_remaining > 0 else 1.0
            except (ValueError, TypeError):
                time_score = 0.5
        else:
            time_score = 0.5
        factors['time_sensitivity'] = time_score
        score += self.priority_weights['time_sensitivity'] * time_score

        # Medical condition (15%)
        critical_conditions = ['trauma', 'surgery', 'accident', 'cancer', 'childbirth']
        condition = request.get('medical_reason', '').lower()
        condition_score = 1.0 if any(c in condition for c in critical_conditions) else 0.5
        factors['medical_condition'] = condition_score
        score += self.priority_weights['medical_condition'] * condition_score

        # Location density (10%)
        # Urban areas have more donors, lower priority
        urban_areas = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad']
        location = request.get('hospital', {}).get('city', '').lower()
        location_score = 0.3 if any(a in location for a in urban_areas) else 0.7
        factors['location_density'] = location_score
        score += self.priority_weights['location_density'] * location_score

        # Determine priority level
        if score >= 0.8:
            priority = 'critical'
        elif score >= 0.6:
            priority = 'high'
        elif score >= 0.4:
            priority = 'medium'
        else:
            priority = 'low'

        return {
            'priority': priority,
            'score': round(score, 4),
            'factors': factors
        }


if __name__ == '__main__':
    predictor = PriorityPredictor()

    sample_request = {
        'blood_group': 'O-',
        'patient_age': 3,
        'urgency': 'emergency',
        'required_by': datetime.now().isoformat(),
        'medical_reason': 'Car accident - severe blood loss',
        'hospital': {'city': 'Pune'}
    }

    result = predictor.predict_priority(sample_request)
    print("Priority Prediction Result:")
    print(f"  Priority: {result['priority']}")
    print(f"  Score: {result['score']}")
    print(f"  Factors: {result['factors']}")
