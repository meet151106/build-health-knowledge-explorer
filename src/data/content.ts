export interface HealthTopic {
  category: string;
  icon: string;
  summary: string;
  points: string[];
  source: string;
  url: string;
}

export const healthTopics: HealthTopic[] = [
  {
    category: "Nutrition",
    icon: "🥗",
    summary:
      "A balanced diet supports general wellbeing across all age groups.",
    points: [
      "Include a variety of fruits and vegetables each day.",
      "Choose whole grains, lean proteins and healthy fats.",
      "Limit added sugars, salt and highly processed foods.",
    ],
    source: "World Health Organization — Healthy Diet",
    url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
  },
  {
    category: "Physical Activity",
    icon: "🏃",
    summary:
      "Regular movement is associated with general health benefits.",
    points: [
      "Aim for regular moderate activity through the week (per WHO guidance).",
      "Reduce long periods of sitting where possible.",
      "Any movement is generally better than none.",
    ],
    source: "World Health Organization — Physical Activity",
    url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  },
  {
    category: "Sleep",
    icon: "😴",
    summary: "Adequate, regular sleep supports daily functioning.",
    points: [
      "Keep a consistent sleep schedule.",
      "Create a restful, screen-free wind-down routine.",
      "Sleep needs vary by individual and age.",
    ],
    source: "CDC — Sleep and Sleep Disorders",
    url: "https://www.cdc.gov/sleep/",
  },
  {
    category: "Mental Well-being",
    icon: "🧠",
    summary: "Mental well-being is an integral part of overall health.",
    points: [
      "Stay socially connected and ask for support when needed.",
      "Practise stress-management techniques that work for you.",
      "Professional help is available and encouraged when needed.",
    ],
    source: "World Health Organization — Mental Health",
    url: "https://www.who.int/health-topics/mental-health",
  },
  {
    category: "General Preventive Health",
    icon: "🩺",
    summary: "Preventive measures may support long-term wellbeing.",
    points: [
      "Follow routine check-ups recommended by professionals.",
      "Stay up to date with recommended screenings.",
      "Know general risk factors for common conditions.",
    ],
    source: "CDC — Prevention",
    url: "https://www.cdc.gov/",
  },
  {
    category: "Healthy Lifestyle",
    icon: "🌿",
    summary:
      "Consistent healthy habits across areas contribute to wellbeing.",
    points: [
      "Combine good nutrition, activity, sleep and stress management.",
      "Small consistent changes are often more sustainable.",
      "Avoid tobacco and limit alcohol.",
    ],
    source: "World Health Organization — Health Promotion",
    url: "https://www.who.int/health-topics/health-promotion",
  },
];

export const vivaQA = [
  {
    q: "What is the objective of the Health Knowledge Explorer project?",
    a: "To provide an educational interface that lets users explore general health knowledge and analyse a health dataset using Data Science techniques — statistics, EDA, visualization and a simple ML classifier. It is explicitly not a medical diagnostic tool.",
  },
  {
    q: "Which technologies are used?",
    a: "Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Streamlit and Jupyter Notebook, with a CSV dataset. This showcase is built in React + Vite + Tailwind + Recharts.",
  },
  {
    q: "What Data Science workflow did you follow?",
    a: "Problem Definition → Data Collection → Data Understanding → Data Cleaning → EDA → Visualization → Feature Engineering → Model Training → Model Evaluation → Interactive Dashboard → Conclusion.",
  },
  {
    q: "What type of ML problem is this?",
    a: "Binary classification predicting whether a record reflects a 'healthy lifestyle' pattern (Yes/No) based on lifestyle features — for educational purposes only.",
  },
  {
    q: "Which models did you compare and why?",
    a: "Logistic Regression (a simple, interpretable linear baseline) and a Random Forest / threshold ensemble (captures non-linear patterns). Comparing them shows the trade-off between interpretability and flexibility.",
  },
  {
    q: "How did you handle preprocessing?",
    a: "Removed duplicates, imputed missing values (median/mode), encoded categorical variables numerically, standardized features with StandardScaler, and performed a stratified train/test split.",
  },
  {
    q: "What evaluation metrics did you use?",
    a: "Accuracy, precision, recall, F1-score and a confusion matrix for the classification task.",
  },
  {
    q: "What is a correlation heatmap and why is it useful?",
    a: "It visualizes pairwise Pearson correlations between numeric features, helping identify related variables and potential multicollinearity.",
  },
  {
    q: "What are the limitations?",
    a: "The dataset is small and synthetic/illustrative, results are not clinically validated, and the model must never be used for medical decisions.",
  },
  {
    q: "What is the future scope?",
    a: "Use larger real public datasets, add more features and models, hyperparameter tuning, model explainability (SHAP), and deployment to the cloud.",
  },
];

export const pptOutline = [
  "Slide 1 — Title, name, guide, institution",
  "Slide 2 — Abstract & disclaimer (educational only)",
  "Slide 3 — Introduction & problem statement",
  "Slide 4 — Objectives & scope",
  "Slide 5 — Existing vs proposed system",
  "Slide 6 — Technology stack",
  "Slide 7 — System architecture & data flow",
  "Slide 8 — Dataset description",
  "Slide 9 — Data preprocessing steps",
  "Slide 10 — Exploratory Data Analysis (charts)",
  "Slide 11 — ML methodology & algorithms",
  "Slide 12 — Model comparison & evaluation",
  "Slide 13 — Interactive prediction demo",
  "Slide 14 — Results & screenshots",
  "Slide 15 — Limitations & future scope",
  "Slide 16 — Conclusion & references",
];

export const futureScope = [
  "Integrate larger, reliable public datasets (UCI, Kaggle, WHO open data).",
  "Add more ML models (SVM, Gradient Boosting, Neural Networks) with tuning.",
  "Add model explainability such as SHAP/feature attribution.",
  "Add multilingual health-education content.",
  "Deploy to the cloud (Streamlit Community Cloud / Hugging Face Spaces).",
  "Add user accounts to save personal (non-medical) exploration history.",
  "Add data export and automated PDF reporting.",
];
