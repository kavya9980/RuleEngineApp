from rule_model import Rule

def create_rule(session, name, condition, action):
    new_rule = Rule(name=name, condition=condition, action=action)
    session.add(new_rule)
    session.commit()

def evaluate_rule(session, rule_name, data):
    rule = session.query(Rule).filter_by(name=rule_name).first()
    if not rule:
        return "Rule not found."
    
    # For demonstration purposes, evaluate if the condition is in the data
    if eval(rule.condition, {}, data):
        return rule.action
    else:
        return "Condition not met."
