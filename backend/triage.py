def assess_severity(symptoms):
    # Simplified CTAS assessment
    emergency_keywords = ["chest pain", "breathing", "unconscious", "severe bleeding"]
    urgent_keywords = ["broken", "fracture", "moderate pain", "cut"]
    semi_urgent_keywords = ["fever", "vomiting", "mild pain"]
    
    symptoms_text = " ".join(symptoms).lower()
    
    if any(keyword in symptoms_text for keyword in emergency_keywords):
        return 1
    elif any(keyword in symptoms_text for keyword in urgent_keywords):
        return 3
    elif any(keyword in symptoms_text for keyword in semi_urgent_keywords):
        return 4
    else:
        return 5