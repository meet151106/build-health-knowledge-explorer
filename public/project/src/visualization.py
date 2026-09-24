"""Visualization helpers built on Matplotlib and Seaborn."""

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import ConfusionMatrixDisplay
from sklearn.ensemble import RandomForestClassifier

sns.set_theme(style="whitegrid")


def plot_histogram(df, col):
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.histplot(df[col], kde=True, ax=ax, color="#2563eb")
    ax.set_title(f"Distribution of {col}")
    return fig


def plot_bar(df, x, y):
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.barplot(data=df, x=x, y=y, ax=ax, palette="Blues_d")
    ax.set_title(f"Average {y} by {x}")
    return fig


def plot_box(df, col):
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.boxplot(y=df[col], ax=ax, color="#10b981")
    ax.set_title(f"Box plot of {col}")
    return fig


def plot_scatter(df, x, y, hue=None):
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.scatterplot(data=df, x=x, y=y, hue=hue, ax=ax, palette="viridis")
    ax.set_title(f"{y} vs {x}")
    return fig


def plot_correlation_heatmap(df):
    fig, ax = plt.subplots(figsize=(8, 6))
    corr = df.select_dtypes(include=np.number).corr()
    sns.heatmap(corr, annot=False, cmap="coolwarm", ax=ax)
    ax.set_title("Correlation Heatmap")
    return fig


def plot_category_distribution(df, col):
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.countplot(data=df, x=col, ax=ax, palette="Set2")
    ax.set_title(f"Category distribution of {col}")
    return fig


def plot_confusion(model, X_test, y_test):
    fig, ax = plt.subplots(figsize=(5, 4))
    ConfusionMatrixDisplay.from_estimator(model, X_test, y_test, ax=ax,
                                          cmap="Blues")
    ax.set_title("Confusion Matrix")
    return fig


def plot_feature_importance(X, y):
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X, y)
    importances = model.feature_importances_
    order = np.argsort(importances)[::-1]
    fig, ax = plt.subplots(figsize=(7, 4))
    sns.barplot(x=importances[order], y=np.array(X.columns)[order], ax=ax,
                palette="crest")
    ax.set_title("Feature Importance (Random Forest)")
    return fig
