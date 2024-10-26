document.getElementById("createRuleForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const ruleName = document.getElementById("ruleName").value;
    const condition = document.getElementById("condition").value;
    const action = document.getElementById("action").value;

    fetch('/create_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: ruleName, condition: condition, action: action })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("createRuleForm").reset();
        loadRules();
        logAction(`Created rule "${ruleName}" with condition: "${condition}" and action: "${action}"`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while creating the rule.");
    });
});

document.getElementById("evaluateRuleForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const evalRuleName = document.getElementById("evalRuleName").value;
    const evalData = document.getElementById("evalData").value;

    fetch('/evaluate_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: evalRuleName, data: JSON.parse(evalData) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("results").innerHTML = `Evaluation Result: ${data.result}`;
        logAction(`Evaluated rule "${evalRuleName}" with result: ${data.result}`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while evaluating the rule.");
    });
});

// Load existing rules
function loadRules() {
    fetch('/get_rules')
        .then(response => response.json())
        .then(rules => {
            const rulesList = document.getElementById("rulesList");
            rulesList.innerHTML = '';
            rules.forEach(rule => {
                const listItem = document.createElement("li");
                listItem.textContent = `${rule.name}: If ${rule.condition}, then ${rule.action}`;
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteRule(rule.name);
                listItem.appendChild(deleteButton);
                rulesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching rules:', error));
}

// Delete a rule
function deleteRule(ruleName) {
    fetch('/delete_rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ruleName })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadRules();
        logAction(`Deleted rule "${ruleName}"`);
    })
    .catch(error => console.error('Error deleting rule:', error));
}

// Feedback Form Submission
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const feedback = document.getElementById("feedback").value;

    fetch('/submit_feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedback })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("feedbackForm").reset();
        logAction(`Submitted feedback: "${feedback}"`);
    })
    .catch(error => console.error('Error submitting feedback:', error));
});

// Logging Function
function logAction(message) {
    const logDiv = document.getElementById("log");
    const logEntry = document.createElement("p");
    logEntry.textContent = message;
    logDiv.appendChild(logEntry);
}

// Load rules when the page loads
document.addEventListener("DOMContentLoaded", loadRules);
