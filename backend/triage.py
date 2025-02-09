def assess_severity(symptoms):
    # Simplified CTAS assessment
    emergency_keywords = ["chest pain", "breathing", "unconscious", "severe bleeding"]
    urgent_keywords = ["broken", "fracture", "moderate pain", "cut"]
    semi_urgent_keywords = ["fever", "vomiting", "mild pain"]
    
    symptoms_text = " ".join(symptoms).lower()
    print(f"DEBUG: Checking symptoms -> {symptoms_text}")

    if any(keyword in symptoms_text for keyword in emergency_keywords):
        print("DEBUG: Matched emergency keyword -> Level 1")
        return 1
    elif any(keyword in symptoms_text for keyword in urgent_keywords):
        print("DEBUG: Matched urgent keyword -> Level 3")
        return 3
    elif any(keyword in symptoms_text for keyword in semi_urgent_keywords):
        print("DEBUG: Matched semi-urgent keyword -> Level 4")
        return 4
    else:
        print("DEBUG: No match -> Level 5")
        return 5
