from flask import Flask, render_template, request, jsonify
import nltk
import numpy as np
import random
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.linear_model import LogisticRegression
from nltk.stem import WordNetLemmatizer
from autocorrect import Speller
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

app = Flask(__name__)

# Your chatbot functions and data here...
# Intents and example phrases
intents = {
    "flood_warning": ["Is there a flood warning in my area?",
                      "Any alerts about flooding nearby?",
                      "Are there any flood warnings for Mumbai?"],

    "evacuation_information": ["Where can I find evacuation routes?",
                               "How do I evacuate during a flood?",
                               "When should I evacuate?"],

    "safe_locations": ["Where is the nearest safe location during a flood?",
                       "What are the safest areas during a flood?",
                       "Is Pune safe during floods?"],

    "emergency_contacts": ["What are the emergency contact numbers for flood-related issues?",
                           "Who should I contact for rescue during a flood?",
                           "How can I reach emergency services during a flood?"],

    "preparing_for_floods": ["What should I include in my flood emergency kit?",
                             "How can I prepare my home for a flood?",
                             "Any tips for flood preparedness?"],

    "assistance_with_relief": ["How can I help with flood relief efforts?",
                               "Where can I donate for flood victims?",
                               "Are there any volunteer opportunities for flood relief?"],

    "road_conditions": ["Are the roads flooded in Kolkata?",
                        "Can I travel by road during a flood?",
                        "How do I check road conditions during floods?"],

    "safety_precautions": ["What safety precautions should I take during a flood?",
                           "How can I stay safe during a flood?",
                           "Any tips for staying safe in flooded areas?"],

    "health_concerns": ["How can I avoid water-borne diseases during floods?",
                        "What should I do if I get injured during a flood?",
                        "Are there any health risks associated with floods?"],

    "shelter_information": ["Where can I find temporary shelters during a flood?",
                            "How do I find shelter if my home is flooded?",
                            "Are there any relief camps set up in Bangalore?"],

    "pets_and_livestock_safety": ["How can I ensure the safety of my pets during a flood?",
                                   "What should I do with my livestock during a flood?",
                                   "Any tips for protecting animals during floods?"],

    "water_supply": ["Is the water supply safe during a flood?",
                     "How can I ensure access to clean water during floods?",
                     "What should I do if my water source gets contaminated?"],

    "electricity_and_power_outages": ["What should I do if there's a power outage during a flood?",
                                       "How can I stay safe with electrical appliances during floods?",
                                       "Are there any precautions for electrical safety during floods?"],

    "communication_during_floods": ["How can I stay informed during a flood?",
                                     "What communication channels are available during floods?",
                                     "How do I keep in touch with family and friends during floods?"],

    "insurance_claims": ["How do I file an insurance claim for flood damage?",
                         "What does my insurance cover for flood damage?",
                         "Any tips for dealing with insurance companies after a flood?"],

    "recovery_and_rehabilitation": ["What steps should I take for recovery after a flood?",
                                     "How can I rebuild my home after flood damage?",
                                     "Are there any government assistance programs for flood victims?"],

    "weather_forecast": ["What is the weather forecast for the next few days in Chennai?",
                         "Are there predictions for heavy rainfall in my area?",
                         "Should I expect more flooding based on the weather forecast?"],

    "community_support": ["How can I connect with other flood-affected individuals in my community?",
                          "Are there support groups for flood victims?",
                          "Where can I find emotional support during and after floods?"],

    "public_transport_availability": ["Is public transportation available during floods?",
                                       "Are there changes to public transport schedules due to flooding?",
                                       "How can I commute if roads are flooded?"],

    "government_assistance_programs": ["What government assistance programs are available for flood victims?",
                                       "How do I apply for government aid after a flood?",
                                       "Are there any relief packages for flood-affected areas?"]
                                       
}

# Preprocess intents
lemmatizer = WordNetLemmatizer()
stopwords = set(nltk.corpus.stopwords.words('english'))
spell = Speller()

def preprocess_text(text):
    tokens = nltk.word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in string.punctuation and token not in stopwords]
    return " ".join(tokens)

preprocessed_intents = {}
for intent, phrases in intents.items():
    preprocessed_phrases = [preprocess_text(phrase) for phrase in phrases]
    preprocessed_intents[intent] = preprocessed_phrases

# Feature extraction
tfidf_vectorizer = TfidfVectorizer()
X = []
y = []
for intent, phrases in preprocessed_intents.items():
    X.extend(phrases)
    y.extend([intent] * len(phrases))

X = tfidf_vectorizer.fit_transform(X)

# Intent classification
classifier = LogisticRegression()
classifier.fit(X, y)

# Responses corresponding to intents
responses = {
    "flood_warning": ["Evacuate immediately. Move to higher ground if possible.",
                      "Stay tuned to local news and weather channels for updates.",
                      "Avoid driving through flooded areas. Seek higher ground."],

    "evacuation_information": ["Evacuation routes can be found on local government websites.",
                               "Follow instructions from local authorities for safe evacuation.",
                               "Evacuate to higher ground if you're in a flood-prone area. Stay safe."],

    "safe_locations": ["Move to higher ground and wait for rescue teams.",
                       "If possible, move to a higher floor or roof of a sturdy building.",
                       "Avoid contact with floodwater as it may be contaminated. Seek safety."],

    "emergency_contacts": ["Call emergency services at 112 or your local emergency number.",
                           "Contact local authorities for assistance.",
                           "Seek help from nearby shelters or relief camps."],

    "preparing_for_floods": ["Stay indoors if it's safe.",
                             "Listen to official advisories and follow instructions.",
                             "Prepare an emergency kit with essentials like water, food, and medications."],

    "assistance_with_relief": ["Donate to reputable organizations providing flood relief.",
                               "Volunteer with local NGOs involved in flood relief efforts.",
                               "Share information about relief efforts on social media to raise awareness."],

    "road_conditions": ["Avoid driving through flooded areas.",
                        "Check traffic updates from reliable sources before traveling.",
                        "Follow alternative routes recommended by authorities."],

    "safety_precautions": ["Avoid walking or swimming through floodwaters.",
                           "Stay away from power lines and electrical wires.",
                           "Turn off utilities if instructed to do so by authorities."],

    "health_concerns": ["Boil water before drinking if there's a risk of contamination.",
                        "Seek medical attention if you experience any health issues.",
                        "Use insect repellent to prevent mosquito-borne diseases."],

    "shelter_information": ["Find shelter in a sturdy building on higher ground.",
                            "Use community shelters or relief camps if available.",
                            "Take essential items like food, water, and clothing to the shelter."],

    "pets_and_livestock_safety": ["Bring pets indoors and ensure they have enough food and water.",
                                   "Move livestock to higher ground if possible.",
                                   "Keep pets on a leash or in carriers to prevent them from wandering."],

    "water_supply": ["Store clean water in containers for drinking and cooking.",
                     "Avoid using water from wells or boreholes if they may be contaminated.",
                     "Boil water before using it for drinking, cooking, or personal hygiene."],

    "electricity_and_power_outages": ["Use flashlights or battery-operated lanterns instead of candles.",
                                       "Turn off electrical appliances to prevent electrical fires.",
                                       "Report power outages to the utility company and follow their instructions."],

    "communication_during_floods": ["Stay updated with local news and weather reports.",
                                     "Use social media to check on friends and family.",
                                     "Keep a battery-powered radio for emergency updates if power goes out."],

    "insurance_claims": ["Document flood damage with photographs or videos.",
                         "Contact your insurance company to file a claim as soon as possible.",
                         "Keep records of all communications with your insurance company."],

    "recovery_and_rehabilitation": ["Seek assistance from government agencies or NGOs for rebuilding.",
                                     "Follow safety guidelines when cleaning up flood-damaged areas.",
                                     "Take care of your mental health and seek support if needed."],

    "weather_forecast": ["Check weather forecasts regularly for updates on rainfall.",
                         "Be prepared for possible evacuation if heavy rainfall is predicted.",
                         "Follow instructions from authorities based on weather forecasts."],

    "community_support": ["Join local community groups providing support to flood victims.",
                          "Share resources and information with neighbors and community members.",
                          "Offer help to those in need, such as elderly or disabled individuals."],

    "public_transport_availability": ["Use public transportation only if it's safe to do so.",
                                       "Check with transport authorities for updates on service disruptions.",
                                       "Follow instructions from transport officials during floods."],

    "government_assistance_programs": ["Apply for government aid programs for flood victims.",
                                       "Check eligibility criteria and documentation required for assistance.",
                                       "Seek help from local government offices or helplines for assistance."]
}

def get_intent(query):
    preprocessed_query = preprocess_text(query)
    query_vec = tfidf_vectorizer.transform([preprocessed_query])
    predicted_intent = classifier.predict(query_vec)[0]
    return predicted_intent

def generate_response(intent):
    if intent in responses:
        return random.choice(responses[intent])
    else:
        return "I'm sorry, I couldn't understand that. Can you please rephrase your query?"


# Route for home page
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle chatbot requests
@app.route('/get_response', methods=['POST'])
def get_bot_response():
    user_input = request.form['user_input']
    corrected_input = spell(user_input)
    intent = get_intent(corrected_input)
    response = generate_response(intent)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
