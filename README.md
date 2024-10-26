


# Rule Engine Application

## Overview
The Rule Engine Application is a web-based tool that allows users to create, evaluate, and manage rules easily. This application is built using Flask and provides a user-friendly interface for rule management.

## Technologies Used
- **Flask**: A lightweight web framework for Python.
- **SQLite**: A lightweight database for storing rules.
- **HTML/CSS/JavaScript**: For front-end development.
- **SQLAlchemy**: For ORM (Object-Relational Mapping).

## Features
- **Create Rule**: Users can create new rules by specifying a name, condition, and action.
- **Evaluate Rule**: Users can evaluate a rule against JSON formatted data to see if the rule applies.
- **View Existing Rules**: A list of all created rules is displayed, allowing users to see current rules.
- **Delete Rule**: Users can delete rules they no longer need.
- **Submit Feedback**: Users can provide feedback on the application, which is logged for review.

## Installation
To set up the project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kavya9980/RuleEngineApp.git
   cd RuleEngineApp
   ```

2. **Install Dependencies**:
   If you have `requirements.txt`, install the required packages using:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**:
   Start the Flask application with:
   ```bash
   python app.py
   ```

4. **Access the Application**:
   Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

## Usage
- **Creating a Rule**: Fill in the rule name, condition, and action in the "Create Rule" form and click "Create Rule".
- **Evaluating a Rule**: Enter the rule name and JSON formatted data in the "Evaluate Rule" form and click "Evaluate Rule".
- **Viewing Existing Rules**: The existing rules are listed below the evaluation section.
- **Deleting a Rule**: Click the "Delete" button next to the rule you wish to remove.
- **Submitting Feedback**: Enter your feedback in the "User Feedback" section and click "Submit Feedback".

## Contributing
If you would like to contribute to this project, feel free to submit a pull request or open an issue.


## Author
**Kavya M**  

