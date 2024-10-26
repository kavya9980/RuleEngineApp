from flask import Flask, render_template, request, jsonify
from ruleengine import create_rule, evaluate_rule
from rule_model import Base, Rule
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Set up the database
engine = create_engine('sqlite:///database/rules.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Route to create a rule
@app.route('/create_rule', methods=['POST'])
def create_rule_endpoint():
    session = Session()
    data = request.json
    rule_name = data.get('name')
    condition = data.get('condition')
    action = data.get('action')
    
    try:
        create_rule(session, rule_name, condition, action)
        return jsonify({"message": "Rule created successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"Error creating rule: {str(e)}"}), 500

# Route to evaluate a rule
@app.route('/evaluate_rule', methods=['POST'])
def evaluate_rule_endpoint():
    session = Session()
    data = request.json
    rule_name = data.get('name')
    data_to_evaluate = data.get('data')
    
    try:
        result = evaluate_rule(session, rule_name, data_to_evaluate)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"message": f"Error evaluating rule: {str(e)}"}), 500

# Route to get all existing rules
@app.route('/get_rules', methods=['GET'])
def get_rules():
    session = Session()
    rules = session.query(Rule).all()
    rules_list = [{"name": rule.name, "condition": rule.condition, "action": rule.action} for rule in rules]
    return jsonify(rules_list), 200

# Route to delete a rule
@app.route('/delete_rule', methods=['POST'])
def delete_rule():
    session = Session()
    data = request.json
    rule_name = data.get('name')
    rule = session.query(Rule).filter_by(name=rule_name).first()
    
    if rule:
        session.delete(rule)
        session.commit()
        return jsonify({"message": "Rule deleted successfully"}), 200
    return jsonify({"message": "Rule not found"}), 404

# Route to submit feedback
@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    feedback = data.get('feedback')
    
    # Here you can save feedback to a database or process it as needed
    print(f"Feedback received: {feedback}")  # Logging feedback to console
    return jsonify({"message": "Feedback submitted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
