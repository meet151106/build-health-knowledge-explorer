"""Educational machine-learning models for the Health Knowledge Explorer.

NOTE: These models are for EDUCATIONAL purposes only and must not be used
for medical diagnosis.
"""

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score
)


def train_models(X_train, y_train):
    """Train and return two classifiers for comparison."""
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=200,
                                                random_state=42),
    }
    for m in models.values():
        m.fit(X_train, y_train)
    return models


def evaluate_models(models, X_test, y_test):
    """Return a dict of evaluation metrics per model."""
    results = {}
    for name, model in models.items():
        pred = model.predict(X_test)
        results[name] = {
            "accuracy": round(accuracy_score(y_test, pred), 3),
            "precision": round(precision_score(y_test, pred, zero_division=0), 3),
            "recall": round(recall_score(y_test, pred, zero_division=0), 3),
            "f1": round(f1_score(y_test, pred, zero_division=0), 3),
        }
    return results


def predict_single(df, age, sleep, activity, steps, fruit):
    """A simple rule-based educational estimate (not diagnostic)."""
    score = 0
    score += 1 if sleep >= 7 else 0
    score += 1 if activity >= 30 else 0
    score += 1 if steps >= 7000 else 0
    score += 1 if fruit >= 4 else 0
    return "Healthy lifestyle pattern" if score >= 3 else "Room for improvement"
