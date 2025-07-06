import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import json

# Load the dataset
df = pd.read_csv('/data/personality_dataset.csv')

print("Dataset Overview:")
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print("\nFirst few rows:")
print(df.head())

print("\nDataset Info:")
print(df.info())

print("\nMissing Values:")
print(df.isnull().sum())

print("\nTarget Distribution:")
print(df['Personality'].value_counts())

# Data preprocessing
print("\n" + "="*50)
print("DATA PREPROCESSING")
print("="*50)

# Handle missing values
df_clean = df.dropna()
print(f"Rows after removing missing values: {len(df_clean)}")

# Convert categorical variables to numerical
le_stage_fear = LabelEncoder()
le_drained = LabelEncoder()
le_personality = LabelEncoder()

df_clean['Stage_fear_encoded'] = le_stage_fear.fit_transform(df_clean['Stage_fear'])
df_clean['Drained_after_socializing_encoded'] = le_drained.fit_transform(df_clean['Drained_after_socializing'])
df_clean['Personality_encoded'] = le_personality.fit_transform(df_clean['Personality'])

# Convert string numbers to float
numeric_columns = ['Time_spent_Alone', 'Social_event_attendance', 'Going_outside', 
                   'Friends_circle_size', 'Post_frequency']

for col in numeric_columns:
    df_clean[col] = pd.to_numeric(df_clean[col], errors='coerce')

# Remove any rows with NaN values after conversion
df_clean = df_clean.dropna()

print(f"Final dataset shape: {df_clean.shape}")

# Feature selection
features = ['Time_spent_Alone', 'Stage_fear_encoded', 'Social_event_attendance', 
           'Going_outside', 'Drained_after_socializing_encoded', 'Friends_circle_size', 
           'Post_frequency']

X = df_clean[features]
y = df_clean['Personality_encoded']

print("\nFeature Statistics:")
print(X.describe())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"\nTraining set size: {len(X_train)}")
print(f"Test set size: {len(X_test)}")

# Model training and evaluation
print("\n" + "="*50)
print("MODEL TRAINING & EVALUATION")
print("="*50)

models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(probability=True, random_state=42)
}

best_model = None
best_accuracy = 0
best_model_name = ""

results = {}

for name, model in models.items():
    print(f"\n{name}:")
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Accuracy: {accuracy:.4f}")
    print("Classification Report:")
    print(classification_report(y_test, y_pred, target_names=le_personality.classes_))
    
    results[name] = {
        'accuracy': accuracy,
        'model': model
    }
    
    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model
        best_model_name = name

print(f"\nBest Model: {best_model_name} with accuracy: {best_accuracy:.4f}")

# Save the best model and encoders
joblib.dump(best_model, '/data/personality_model.pkl')
joblib.dump(le_stage_fear, '/data/stage_fear_encoder.pkl')
joblib.dump(le_drained, '/data/drained_encoder.pkl')
joblib.dump(le_personality, '/data/personality_encoder.pkl')

# Save feature names and model info
model_info = {
    'features': features,
    'model_name': best_model_name,
    'accuracy': best_accuracy,
    'stage_fear_classes': le_stage_fear.classes_.tolist(),
    'drained_classes': le_drained.classes_.tolist(),
    'personality_classes': le_personality.classes_.tolist()
}

with open('/data/model_info.json', 'w') as f:
    json.dump(model_info, f)

print("\nModel and encoders saved successfully!")
print("Files saved:")
print("- /data/personality_model.pkl")
print("- /data/stage_fear_encoder.pkl") 
print("- /data/drained_encoder.pkl")
print("- /data/personality_encoder.pkl")
print("- /data/model_info.json")

# Feature importance (if Random Forest is the best model)
if best_model_name == 'Random Forest':
    feature_importance = pd.DataFrame({
        'feature': features,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
