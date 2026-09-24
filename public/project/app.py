"""
Health Knowledge Explorer
=========================
An educational health-information and data-analysis Streamlit application.

DISCLAIMER: This project is for EDUCATIONAL PURPOSES ONLY. It does NOT
provide medical diagnosis and must NOT replace professional medical advice.
Consult a qualified healthcare professional for personal health concerns.

Run with:
    streamlit run app.py
"""

import io
import numpy as np
import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt
import seaborn as sns

from src.data_preprocessing import (
    load_data, clean_data, encode_features, scale_features, split_data
)
from src.visualization import (
    plot_histogram, plot_bar, plot_box, plot_scatter,
    plot_correlation_heatmap, plot_category_distribution,
    plot_confusion, plot_feature_importance
)
from src.model import train_models, evaluate_models, predict_single

# --------------------------------------------------------------------------- #
# Page configuration
# --------------------------------------------------------------------------- #
st.set_page_config(
    page_title="Health Knowledge Explorer",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="expanded",
)

DISCLAIMER = (
    "⚠️ **Educational use only.** This prediction is not a medical diagnosis "
    "or medical advice. Consult a qualified healthcare professional for "
    "personal health concerns."
)

DATA_PATH = "data/health_dataset.csv"


@st.cache_data
def get_data(path=DATA_PATH):
    return load_data(path)


# --------------------------------------------------------------------------- #
# Sidebar navigation
# --------------------------------------------------------------------------- #
st.sidebar.title("🩺 Health Knowledge Explorer")
st.sidebar.caption("Educational Data Science Project")
page = st.sidebar.radio(
    "Navigate",
    [
        "🏠 Home Dashboard",
        "📚 Health Knowledge Explorer",
        "🗂️ Dataset Explorer",
        "📊 Exploratory Data Analysis",
        "🧹 Data Preprocessing",
        "🤖 Machine Learning",
        "🔮 Interactive Prediction",
        "📈 Visualization Dashboard",
        "📝 Conclusion",
    ],
)
st.sidebar.info(DISCLAIMER)

df = get_data()


# --------------------------------------------------------------------------- #
# 1. Home Dashboard
# --------------------------------------------------------------------------- #
if page == "🏠 Home Dashboard":
    st.title("🩺 Health Knowledge Explorer")
    st.write(
        "An educational health-information and data-analysis system that helps "
        "you explore general health knowledge using a dataset and simple "
        "machine-learning techniques."
    )
    st.warning(DISCLAIMER)

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Total Records", df.shape[0])
    c2.metric("Attributes", df.shape[1])
    c3.metric("Numeric Features", df.select_dtypes(include=np.number).shape[1])
    c4.metric("Missing Values", int(df.isna().sum().sum()))

    col1, col2 = st.columns(2)
    with col1:
        st.subheader("BMI Distribution")
        st.pyplot(plot_histogram(df, "bmi"))
    with col2:
        st.subheader("Healthy Lifestyle Counts")
        st.pyplot(plot_category_distribution(df, "healthy_lifestyle"))


# --------------------------------------------------------------------------- #
# 2. Health Knowledge Explorer
# --------------------------------------------------------------------------- #
elif page == "📚 Health Knowledge Explorer":
    st.title("📚 Health Knowledge Explorer")
    st.caption("Concise, general educational health information with references.")

    topics = {
        "Nutrition": (
            "A balanced diet rich in fruits, vegetables, whole grains, lean "
            "proteins and healthy fats supports general wellbeing.",
            "World Health Organization (WHO) — Healthy Diet",
            "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
        ),
        "Physical Activity": (
            "Adults generally benefit from regular moderate physical activity "
            "each week, according to public-health guidance.",
            "WHO — Physical Activity",
            "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
        ),
        "Sleep": (
            "Adequate, regular sleep supports overall health and daily "
            "functioning.",
            "CDC — Sleep and Sleep Disorders",
            "https://www.cdc.gov/sleep/",
        ),
        "Mental Well-being": (
            "Mental well-being is an integral part of overall health. Support "
            "and professional help are available when needed.",
            "WHO — Mental Health",
            "https://www.who.int/health-topics/mental-health",
        ),
        "General Preventive Health": (
            "Preventive health measures may include routine check-ups and "
            "recommended screenings as advised by professionals.",
            "CDC — Prevention",
            "https://www.cdc.gov/prevention/",
        ),
        "Healthy Lifestyle": (
            "Consistent healthy habits across diet, activity, sleep and stress "
            "contribute to general wellbeing.",
            "WHO — Health Promotion",
            "https://www.who.int/health-topics/health-promotion",
        ),
    }

    query = st.text_input("🔎 Search health topics")
    for name, (info, source, url) in topics.items():
        if query.lower() in name.lower() or query == "":
            with st.expander(name):
                st.write(info)
                st.markdown(f"**Reference:** [{source}]({url})")


# --------------------------------------------------------------------------- #
# 3. Dataset Explorer
# --------------------------------------------------------------------------- #
elif page == "🗂️ Dataset Explorer":
    st.title("🗂️ Dataset Explorer")
    uploaded = st.file_uploader("Upload a CSV dataset (optional)", type="csv")
    data = pd.read_csv(uploaded) if uploaded else df

    st.subheader("First Records")
    st.dataframe(data.head())

    c1, c2 = st.columns(2)
    c1.write(f"**Shape:** {data.shape[0]} rows × {data.shape[1]} columns")
    c2.write(f"**Columns:** {', '.join(data.columns)}")

    st.subheader("Missing Values")
    st.dataframe(data.isna().sum().rename("missing"))

    st.subheader("Descriptive Statistics")
    st.dataframe(data.describe())

    st.subheader("Interactive Filter")
    num_cols = data.select_dtypes(include=np.number).columns.tolist()
    col = st.selectbox("Filter column", num_cols)
    lo, hi = float(data[col].min()), float(data[col].max())
    rng = st.slider("Range", lo, hi, (lo, hi))
    st.dataframe(data[(data[col] >= rng[0]) & (data[col] <= rng[1])])


# --------------------------------------------------------------------------- #
# 4. Exploratory Data Analysis
# --------------------------------------------------------------------------- #
elif page == "📊 Exploratory Data Analysis":
    st.title("📊 Exploratory Data Analysis")
    num_cols = df.select_dtypes(include=np.number).columns.tolist()

    st.subheader("Histogram")
    st.pyplot(plot_histogram(df, st.selectbox("Histogram column", num_cols)))

    st.subheader("Box Plot")
    st.pyplot(plot_box(df, st.selectbox("Box column", num_cols, key="box")))

    st.subheader("Scatter Plot")
    x = st.selectbox("X axis", num_cols, index=0)
    y = st.selectbox("Y axis", num_cols, index=1)
    st.pyplot(plot_scatter(df, x, y, "healthy_lifestyle"))

    st.subheader("Correlation Heatmap")
    st.pyplot(plot_correlation_heatmap(df))
    st.info(
        "Observation: physical activity, daily steps and sleep tend to move "
        "together, while resting heart rate and blood pressure tend to be "
        "higher for less-active records. These are dataset patterns only and "
        "are not medical conclusions."
    )


# --------------------------------------------------------------------------- #
# 5. Data Preprocessing
# --------------------------------------------------------------------------- #
elif page == "🧹 Data Preprocessing":
    st.title("🧹 Data Preprocessing")
    st.write("Step-by-step preprocessing performed for modeling.")

    st.markdown("**1. Handle missing values & remove duplicates**")
    cleaned = clean_data(df)
    st.write(f"Rows after cleaning: {cleaned.shape[0]}")

    st.markdown("**2. Encode categorical variables**")
    encoded = encode_features(cleaned)
    st.dataframe(encoded.head())

    st.markdown("**3. Feature scaling**")
    X = encoded.drop(columns=["healthy_lifestyle", "id"], errors="ignore")
    y = encoded["healthy_lifestyle"]
    X_scaled = scale_features(X)
    st.dataframe(pd.DataFrame(X_scaled, columns=X.columns).head())

    st.markdown("**4. Train / test split**")
    X_train, X_test, y_train, y_test = split_data(X_scaled, y)
    st.write(f"Train: {X_train.shape[0]} rows | Test: {X_test.shape[0]} rows")


# --------------------------------------------------------------------------- #
# 6. Machine Learning
# --------------------------------------------------------------------------- #
elif page == "🤖 Machine Learning":
    st.title("🤖 Machine Learning (Educational)")
    st.warning(DISCLAIMER)

    cleaned = clean_data(df)
    encoded = encode_features(cleaned)
    X = encoded.drop(columns=["healthy_lifestyle", "id"], errors="ignore")
    y = encoded["healthy_lifestyle"]
    X_scaled = scale_features(X)
    X_train, X_test, y_train, y_test = split_data(X_scaled, y)

    models = train_models(X_train, y_train)
    results = evaluate_models(models, X_test, y_test)

    st.subheader("Model Comparison")
    st.dataframe(pd.DataFrame(results).T)

    best = max(results, key=lambda m: results[m]["accuracy"])
    st.success(f"Best educational model: {best}")
    st.subheader("Confusion Matrix")
    st.pyplot(plot_confusion(models[best], X_test, y_test))


# --------------------------------------------------------------------------- #
# 7. Interactive Prediction
# --------------------------------------------------------------------------- #
elif page == "🔮 Interactive Prediction":
    st.title("🔮 Interactive Prediction (Educational)")
    st.error(DISCLAIMER)

    with st.form("predict"):
        age = st.slider("Age", 18, 80, 35)
        sleep = st.slider("Sleep hours", 3.0, 10.0, 7.0)
        activity = st.slider("Physical activity (min/day)", 0, 120, 40)
        steps = st.slider("Daily steps", 1000, 15000, 8000)
        fruit = st.slider("Fruit/veg servings", 0, 8, 4)
        submit = st.form_submit_button("Get Educational Output")

    if submit:
        label = predict_single(df, age, sleep, activity, steps, fruit)
        st.info(f"Educational model output: **{label}**")
        st.caption(
            "This is a pattern-based educational estimate only and is not a "
            "medical diagnosis."
        )


# --------------------------------------------------------------------------- #
# 8. Visualization Dashboard
# --------------------------------------------------------------------------- #
elif page == "📈 Visualization Dashboard":
    st.title("📈 Data Visualization Dashboard")
    c1, c2 = st.columns(2)
    with c1:
        st.pyplot(plot_bar(df, "gender", "bmi"))
    with c2:
        st.pyplot(plot_scatter(df, "physical_activity_min", "resting_heart_rate",
                               "healthy_lifestyle"))

    cleaned = clean_data(df)
    encoded = encode_features(cleaned)
    X = encoded.drop(columns=["healthy_lifestyle", "id"], errors="ignore")
    y = encoded["healthy_lifestyle"]
    st.subheader("Feature Importance")
    st.pyplot(plot_feature_importance(X, y))


# --------------------------------------------------------------------------- #
# 9. Conclusion
# --------------------------------------------------------------------------- #
elif page == "📝 Conclusion":
    st.title("📝 Conclusion")
    st.markdown(
        """
- **What we learned:** health-related habits in the dataset (activity, sleep,
  diet, steps) associate with the "healthy lifestyle" label.
- **Key findings:** activity and steps are among the most informative features.
- **Model performance:** the compared classifiers achieved strong educational
  accuracy on this small dataset.
- **Limitations:** small, illustrative dataset; not clinically validated.
- **Future work:** larger public datasets, more features, richer models.
        """
    )
    st.warning(DISCLAIMER)
