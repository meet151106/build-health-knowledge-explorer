export interface ReportSection {
  id: string;
  title: string;
  body: string[];
}

export const reportSections: ReportSection[] = [
  {
    id: "abstract",
    title: "1. Abstract",
    body: [
      "The Health Knowledge Explorer is an educational health-information and data-analysis system that helps users explore general health knowledge using a dataset and simple Data Science techniques. The project demonstrates a complete data-science workflow: data understanding, cleaning, exploratory data analysis, visualization, feature engineering, model training, evaluation and an interactive dashboard.",
      "It is strictly for educational purposes and does not provide medical diagnosis or replace professional medical advice.",
    ],
  },
  {
    id: "introduction",
    title: "2. Introduction",
    body: [
      "Health awareness is an important part of everyday life. However, general health information is often scattered and not connected to hands-on data exploration. This project combines curated general health knowledge with an interactive data-analysis dashboard so learners can practise Data Science on health-style data.",
      "The system uses a lifestyle dataset (age, BMI, sleep, physical activity, diet, etc.) and a simple classification model to illustrate how habits relate to a 'healthy lifestyle' label.",
    ],
  },
  {
    id: "problem",
    title: "3. Problem Statement",
    body: [
      "Learners need a safe, hands-on environment to apply Data Science techniques to health-style data while clearly understanding that such models must not be used for medical decisions. There is a need for an integrated, educational tool that combines health knowledge, dataset exploration, EDA, and interpretable ML in one place.",
    ],
  },
  {
    id: "objectives",
    title: "4. Objectives",
    body: [
      "Provide an easy-to-use interface for exploring health-related information.",
      "Analyze a health dataset using Data Science techniques.",
      "Display useful statistics and interactive visualizations.",
      "Allow users to search and filter health topics and records.",
      "Show relationships between health-related factors and outcomes.",
      "Build a simple educational ML classifier and compare two models.",
      "Clearly display an educational-use disclaimer throughout.",
    ],
  },
  {
    id: "scope",
    title: "5. Scope",
    body: [
      "In scope: educational data exploration, statistics, visualization, preprocessing, model training/evaluation and interactive prediction on a lifestyle dataset.",
      "Out of scope: medical diagnosis, treatment recommendations, medication/dosage advice, and any clinical decision-making.",
    ],
  },
  {
    id: "existing",
    title: "6. Existing System",
    body: [
      "Existing health apps often focus on tracking or provide static articles without hands-on analytics. Many Data Science tutorials use generic datasets without an educational health context or without prominent safety disclaimers.",
    ],
  },
  {
    id: "proposed",
    title: "7. Proposed System",
    body: [
      "The proposed system integrates curated health knowledge with an interactive analytics dashboard covering the full Data Science workflow. It emphasizes interpretability, clear observations that avoid unsupported medical claims, and a prominent educational-use disclaimer.",
    ],
  },
  {
    id: "advantages",
    title: "8. Advantages",
    body: [
      "End-to-end Data Science workflow in one application.",
      "Interactive, responsive and beginner-friendly interface.",
      "Model comparison and evaluation metrics for learning.",
      "Strong emphasis on ethics and safety (educational disclaimer).",
      "Reusable, modular code (preprocessing, visualization, model).",
    ],
  },
  {
    id: "hardware",
    title: "9. Hardware Requirements",
    body: [
      "Processor: Dual-core 2.0 GHz or higher.",
      "RAM: 4 GB minimum (8 GB recommended).",
      "Storage: 500 MB free space.",
      "Display: 1366×768 or higher.",
    ],
  },
  {
    id: "software",
    title: "10. Software Requirements",
    body: [
      "Operating System: Windows / macOS / Linux.",
      "Python 3.9+.",
      "Streamlit, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Jupyter.",
      "A modern web browser.",
    ],
  },
  {
    id: "technology",
    title: "11. Technology Used",
    body: [
      "Python — core programming language.",
      "Pandas & NumPy — data handling and numerical computing.",
      "Matplotlib & Seaborn — visualization.",
      "Scikit-learn — machine learning.",
      "Streamlit — interactive web dashboard.",
      "Jupyter Notebook — exploratory analysis.",
    ],
  },
  {
    id: "architecture",
    title: "12. System Architecture",
    body: [
      "Presentation Layer: Streamlit UI with sidebar navigation and pages.",
      "Logic Layer: src/data_preprocessing.py, src/visualization.py, src/model.py.",
      "Data Layer: CSV dataset in data/health_dataset.csv.",
      "Flow: User → Streamlit UI → preprocessing/visualization/model modules → results rendered back to the UI.",
    ],
  },
  {
    id: "dataset",
    title: "13. Dataset Description",
    body: [
      "The dataset (data/health_dataset.csv) is a small, synthetic, illustrative set of general lifestyle attributes: age, gender, height, weight, BMI, sleep hours, physical activity, daily steps, fruit/veg servings, water intake, smoking, alcohol, stress level, resting heart rate, systolic blood pressure and a healthy_lifestyle label.",
      "For real analysis, substitute a reliable public dataset (UCI ML Repository or Kaggle). All health knowledge references cite WHO and CDC.",
    ],
  },
  {
    id: "preprocessing-report",
    title: "14. Data Preprocessing",
    body: [
      "Remove duplicate rows.",
      "Impute missing values (median for numeric, mode for categorical).",
      "Encode categorical variables (gender, smoker, healthy_lifestyle).",
      "Standardize features with StandardScaler.",
      "Stratified 75/25 train/test split.",
    ],
  },
  {
    id: "methodology",
    title: "15. Machine Learning Methodology",
    body: [
      "Task: binary classification of the healthy_lifestyle label.",
      "Baseline model: Logistic Regression (interpretable, linear).",
      "Comparison model: Random Forest / threshold ensemble (non-linear).",
      "Evaluation: accuracy, precision, recall, F1-score, confusion matrix.",
    ],
  },
  {
    id: "algorithm",
    title: "16. Algorithm Description",
    body: [
      "Logistic Regression models the probability of the positive class using a sigmoid of a weighted feature sum; weights are learned by gradient descent minimizing log-loss.",
      "Random Forest builds many decision trees on bootstrapped samples and averages their votes, capturing non-linear feature interactions and reducing variance.",
    ],
  },
  {
    id: "results",
    title: "17. Results",
    body: [
      "Both models achieve strong educational accuracy on this small illustrative dataset. Physical activity, daily steps, sleep and BMI are among the most informative features.",
      "The confusion matrix and per-class metrics illustrate model behaviour. Results are dataset patterns only, not medical conclusions.",
    ],
  },
  {
    id: "limitations-report",
    title: "18. Limitations",
    body: [
      "Small, synthetic, illustrative dataset — not clinically validated.",
      "Model must never be used for medical decisions.",
      "Limited feature set and simple models.",
    ],
  },
  {
    id: "future-report",
    title: "19. Future Scope",
    body: [
      "Use larger real public datasets and richer features.",
      "Add more models with hyperparameter tuning and explainability.",
      "Deploy to the cloud and add reporting/export features.",
    ],
  },
  {
    id: "conclusion-report",
    title: "20. Conclusion",
    body: [
      "The Health Knowledge Explorer demonstrates a complete, ethical Data Science workflow on health-style data, combining knowledge, analytics and interpretable ML while clearly communicating that it is for educational use only.",
    ],
  },
  {
    id: "references",
    title: "21. References",
    body: [
      "World Health Organization — https://www.who.int/",
      "Centers for Disease Control and Prevention — https://www.cdc.gov/",
      "Scikit-learn documentation — https://scikit-learn.org/",
      "Streamlit documentation — https://docs.streamlit.io/",
      "UCI Machine Learning Repository — https://archive.ics.uci.edu/",
    ],
  },
];
