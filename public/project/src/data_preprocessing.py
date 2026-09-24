"""Data preprocessing utilities for the Health Knowledge Explorer."""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


def load_data(path: str) -> pd.DataFrame:
    """Load the CSV dataset."""
    return pd.read_csv(path)


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Handle missing values and remove duplicate rows."""
    df = df.copy()
    df = df.drop_duplicates()
    # Fill numeric missing with median, categorical with mode
    for col in df.columns:
        if df[col].dtype.kind in "biufc":
            df[col] = df[col].fillna(df[col].median())
        else:
            df[col] = df[col].fillna(df[col].mode().iloc[0])
    return df


def encode_features(df: pd.DataFrame) -> pd.DataFrame:
    """Encode categorical variables into numeric codes."""
    df = df.copy()
    mappings = {
        "gender": {"Male": 0, "Female": 1},
        "smoker": {"No": 0, "Yes": 1},
        "healthy_lifestyle": {"No": 0, "Yes": 1},
    }
    for col, mp in mappings.items():
        if col in df.columns:
            df[col] = df[col].map(mp)
    return df


def scale_features(X: pd.DataFrame):
    """Standardize features to zero mean and unit variance."""
    scaler = StandardScaler()
    return scaler.fit_transform(X)


def split_data(X, y, test_size: float = 0.25, random_state: int = 42):
    """Split into train and test sets (stratified)."""
    return train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
