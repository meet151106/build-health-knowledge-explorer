# 🩺 Health Knowledge Explorer

An **educational** health-information and data-analysis system built with
Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn and Streamlit.

> ⚠️ **Disclaimer:** This project is for **educational purposes only**. It does
> **not** provide medical diagnosis and must **not** replace professional
> medical advice. Consult a qualified healthcare professional for personal
> health concerns.

## ✨ Features / Modules
1. Home Dashboard
2. Health Knowledge Explorer (searchable topics)
3. Dataset Explorer (upload/load CSV, stats, filters)
4. Exploratory Data Analysis (histograms, box, scatter, heatmap)
5. Data Preprocessing (cleaning, encoding, scaling, split)
6. Machine Learning (Logistic Regression vs Random Forest)
7. Interactive Prediction (educational output only)
8. Visualization Dashboard
9. Conclusion

## 📁 Folder Structure
```
Health_Knowledge_Explorer/
├── app.py
├── requirements.txt
├── README.md
├── data/
│   └── health_dataset.csv
├── notebooks/
│   └── health_analysis.ipynb
├── src/
│   ├── data_preprocessing.py
│   ├── visualization.py
│   └── model.py
└── images/
    └── dashboard_screenshots/
```

## 🛠️ Installation
```bash
# 1. Clone / download the project
cd Health_Knowledge_Explorer

# 2. (Recommended) create a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

## ▶️ Execution
```bash
streamlit run app.py
```
Then open the local URL (usually http://localhost:8501) in your browser.

To run the notebook:
```bash
jupyter notebook notebooks/health_analysis.ipynb
```

## 📊 Dataset
`data/health_dataset.csv` is a small, **synthetic, illustrative** dataset of
general lifestyle attributes (age, BMI, sleep, activity, steps, diet, etc.).
For real analysis you can substitute a reliable public dataset such as:
- UCI Machine Learning Repository — https://archive.ics.uci.edu/
- Kaggle Health datasets — https://www.kaggle.com/datasets

## 🔗 Health Information References
- World Health Organization — https://www.who.int/
- Centers for Disease Control and Prevention — https://www.cdc.gov/
