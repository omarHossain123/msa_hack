import os
from openai import OpenAI
from triage import assess_severity as fallback_assess_severity

def assess_severity(symptoms):
    # Build the prompt based on the symptoms
    prompt = (
        "Given the following patient symptoms, "
        "please assign a Canadian Triage and Acuity Scale (CTAS) level "
        "from 1 (most urgent) to 5 (least urgent). Symptoms: " 
        + ", ".join(symptoms)
        + "\nOnly respond with a single number."
    )
    
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable not set.")
        return fallback_assess_severity(symptoms)
    
    client = OpenAI(api_key=api_key)
    
    # Log the prompt so you know it's being created and sent
    print("Sending prompt to OpenAI API:", prompt)
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="gpt-3.5-turbo",
            temperature=0,
            max_tokens=5
        )
        # Parse the response into an integer rating
        rating_text = chat_completion.choices[0].message.content.strip()
        rating = int(rating_text)
        if rating < 1 or rating > 5:
            rating = 5  # enforce valid range
        print(f"OpenAI API response rating: {rating}")
        return rating
    except Exception as e:
        print("OpenAI API error:", e)
        fallback_rating = fallback_assess_severity(symptoms)
        print(f"Fallback CTAS rating: {fallback_rating}")
        return fallback_rating