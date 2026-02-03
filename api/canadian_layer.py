"""
Canadian Enhancement Layer for AXE
Unique capabilities not found in other AI assistants
"""

import re
from typing import Dict, List, Optional

class CanadianEnhancements:
    """
    Canadian-specific AI capabilities

    This layer adds unique features that differentiate AXE:
    - Bilingual excellence (EN/FR with code-switching)
    - PIPEDA privacy compliance
    - Canadian legal context
    - Provincial regulation awareness
    """

    # Canadian spelling preferences
    CANADIAN_SPELLING = {
        "color": "colour",
        "center": "centre",
        "license": "licence",
        "defense": "defence",
        "favor": "favour",
        "honor": "honour",
        "neighbor": "neighbour",
        "labor": "labour"
    }

    # French indicators for bilingual detection
    FRENCH_INDICATORS = [
        "bonjour", "merci", "s'il vous plaît", "oui", "non",
        "québec", "français", "montréal", "ottawa"
    ]

    # PIPEDA compliance keywords
    PII_PATTERNS = {
        "email": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        "phone": r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
        "sin": r'\b\d{3}[-\s]?\d{3}[-\s]?\d{3}\b',
        "postal": r'\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b'
    }

    @staticmethod
    def canadianize_spelling(text: str) -> str:
        """Convert US spelling to Canadian spelling"""
        for us, ca in CanadianEnhancements.CANADIAN_SPELLING.items():
            text = re.sub(rf'\b{us}\b', ca, text, flags=re.IGNORECASE)
        return text

    @staticmethod
    def detect_french(text: str) -> bool:
        """Detect if text contains French"""
        text_lower = text.lower()
        return any(indicator in text_lower
                  for indicator in CanadianEnhancements.FRENCH_INDICATORS)

    @staticmethod
    def check_pii(text: str) -> Dict[str, List[str]]:
        """Check for PII for PIPEDA compliance"""
        findings = {}
        for pii_type, pattern in CanadianEnhancements.PII_PATTERNS.items():
            matches = re.findall(pattern, text)
            if matches:
                findings[pii_type] = matches
        return findings

    @staticmethod
    def get_system_prompt_enhancement() -> str:
        """
        Canadian enhancement to system prompt
        This makes AXE distinctly Canadian in personality and knowledge
        """
        return """
You are AXE, Canada's AI assistant. You have deep knowledge of:

CANADIAN CONTEXT:
- Federal laws (PIPEDA, Bill C-27, Canadian AI regulations)
- Provincial regulations (Quebec Law 25, BC PIPA, ON PHIPA)
- Bilingual capabilities (seamless EN/FR)
- Canadian business practices and culture
- Indigenous rights and treaty knowledge
- Canadian geography, history, and current events

PRIVACY-FIRST APPROACH:
- Always consider PIPEDA compliance
- Protect personal information
- Respect Canadian privacy standards
- Flag potential privacy issues proactively

BILINGUAL EXCELLENCE:
- Respond in French when appropriate
- Code-switch naturally for Quebec/bilingual contexts
- Use Canadian spellings (colour, centre, etc.)

CANADIAN VALUES:
- Politeness and respect
- Multiculturalism
- Privacy and data protection
- Inclusivity and accessibility
"""

    @staticmethod
    def enhance_response(response: str, context: Optional[Dict] = None) -> str:
        """
        Enhance response with Canadian characteristics
        """
        # Apply Canadian spelling
        response = CanadianEnhancements.canadianize_spelling(response)

        # Add bilingual greeting if appropriate
        if context and context.get("bilingual"):
            if CanadianEnhancements.detect_french(context.get("input", "")):
                response = f"Bonjour! {response}"

        return response


# Unique Canadian features for differentiation
CANADIAN_FEATURES = {
    "pipeda_compliance": "Built-in privacy compliance checking",
    "bilingual_excellence": "Seamless EN/FR code-switching",
    "provincial_law": "Quebec Law 25, BC PIPA, ON PHIPA awareness",
    "canadian_spelling": "Automatic Canadian spelling (colour, centre)",
    "privacy_first": "PIPEDA-compliant by design",
    "indigenous_awareness": "Indigenous rights and treaty knowledge",
    "metric_system": "Canadian metric system default",
    "regional_awareness": "Provincial differences and regulations"
}
