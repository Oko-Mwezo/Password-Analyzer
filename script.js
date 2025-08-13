// List of common weak passwords
const COMMON_PASSWORDS = [
    "password", "123456", "qwerty", "admin", "welcome", "password123",
    "letmein", "monkey", "sunshine", "football"
];

document.getElementById("analyzeBtn").addEventListener("click", analyzePassword);

function analyzePassword() {
    const password = document.getElementById("passwordInput").value;
    const resultDiv = document.getElementById("result");
    const strengthResult = document.getElementById("strengthResult");
    const entropyResult = document.getElementById("entropyResult");
    const commonResult = document.getElementById("commonResult");

    // Reset classes
    strengthResult.className = "";
    entropyResult.className = "";
    commonResult.className = "";

    if (!password) {
        alert("Please enter a password.");
        return;
    }

    // Check password strength
    const strength = checkPasswordStrength(password);
    strengthResult.textContent = `Strength: ${strength.message}`;
    strengthResult.classList.add(strength.class);

    // Calculate entropy
    const entropy = calculateEntropy(password);
    entropyResult.textContent = `Entropy: ${entropy.toFixed(2)} bits`;
    entropyResult.classList.add(entropy < 50 ? "moderate" : "strong");

    // Check if password is common
    const isCommon = COMMON_PASSWORDS.includes(password.toLowerCase());
    commonResult.textContent = `Common Password: ${isCommon ? "Yes (Weak)" : "No"}`;
    commonResult.classList.add(isCommon ? "weak" : "strong");

    // Show results
    resultDiv.classList.remove("hidden");
}

function checkPasswordStrength(password) {
    // Check length
    if (password.length < 8) {
        return { message: "Weak (Too short)", class: "weak" };
    }

    // Check for common passwords
    if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
        return { message: "Weak (Common password)", class: "weak" };
    }

    // Check complexity
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpper && hasLower && hasDigit && hasSpecial)) {
        return { message: "Moderate (Lacks complexity)", class: "moderate" };
    }

    return { message: "Strong (Meets requirements)", class: "strong" };
}

function calculateEntropy(password) {
    const charCounts = {};
    for (const char of password) {
        charCounts[char] = (charCounts[char] || 0) + 1;
    }

    let entropy = 0;
    const length = password.length;

    for (const char in charCounts) {
        const p = charCounts[char] / length;
        entropy -= p * Math.log2(p);
    }

    return entropy * length;
}
