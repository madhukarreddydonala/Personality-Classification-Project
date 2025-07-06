import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import GridSearchCV
import joblib
import json

def train_personality_model():
    """Train and save the personality classification model"""
    
    # Load the dataset
    df = pd.read_csv('/data/personality_dataset.csv')
    
    print("Training Personality Classification Model")
    print("=" * 50)
    print(f"Dataset shape: {df.shape}")
    
    # Data preprocessing
    df_clean = df.dropna()
    
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
    
    df_clean = df_clean.dropna()
    
    # Feature selection
    features = ['Time_spent_Alone', 'Stage_fear_encoded', 'Social_event_attendance', 
               'Going_outside', 'Drained_after_socializing_encoded', 'Friends_circle_size', 
               'Post_frequency']
    
    X = df_clean[features]
    y = df_clean['Personality_encoded']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    
    # Model selection with hyperparameter tuning
    models = {
        'Random Forest': {
            'model': RandomForestClassifier(random_state=42),
            'params': {
                'n_estimators': [50, 100, 200],
                'max_depth': [None, 10, 20],
                'min_samples_split': [2, 5, 10]
            }
        },
        'Logistic Regression': {
            'model': LogisticRegression(random_state=42, max_iter=1000),
            'params': {
                'C': [0.1, 1, 10],
                'solver': ['liblinear', 'lbfgs']
            }
        },
        'SVM': {
            'model': SVC(probability=True, random_state=42),
            'params': {
                'C': [0.1, 1, 10],
                'kernel': ['rbf', 'linear']
            }
        }
    }
    
    best_model = None
    best_score = 0
    best_model_name = ""
    
    for name, config in models.items():
        print(f"\nTraining {name}...")
        
        # Grid search for best parameters
        grid_search = GridSearchCV(
            config['model'], 
            config['params'], 
            cv=5, 
            scoring='accuracy',
            n_jobs=-1
        )
        
        grid_search.fit(X_train, y_train)
        
        # Evaluate on test set
        y_pred = grid_search.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Cross-validation score: {grid_search.best_score_:.4f}")
        print(f"Test accuracy: {accuracy:.4f}")
        
        if accuracy > best_score:
            best_score = accuracy
            best_model = grid_search.best_estimator_
            best_model_name = name
    
    print(f"\nBest Model: {best_model_name}")
    print(f"Best Accuracy: {best_score:.4f}")
    
    # Final evaluation
    y_pred_final = best_model.predict(X_test)
    print("\nFinal Classification Report:")
    print(classification_report(y_test, y_pred_final, target_names=le_personality.classes_))
    
    # Feature importance (if available)
    if hasattr(best_model, 'feature_importances_'):
        feature_importance = pd.DataFrame({
            'feature': features,
            'importance': best_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("\nFeature Importance:")
        print(feature_importance)
    
    # Save model and encoders
    joblib.dump(best_model, '/data/personality_model.pkl')
    joblib.dump(le_stage_fear, '/data/stage_fear_encoder.pkl')
    joblib.dump(le_drained, '/data/drained_encoder.pkl')
    joblib.dump(le_personality, '/data/personality_encoder.pkl')
    
    # Save model metadata
    model_info = {
        'model_name': best_model_name,
        'accuracy': best_score,
        'features': features,
        'stage_fear_classes': le_stage_fear.classes_.tolist(),
        'drained_classes': le_drained.classes_.tolist(),
        'personality_classes': le_personality.classes_.tolist(),
        'training_samples': len(X_train),
        'test_samples': len(X_test)
    }
    
    with open('/data/model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print("\nModel training completed!")
    print("Files saved:")
    print("- personality_model.pkl")
    print("- stage_fear_encoder.pkl")
    print("- drained_encoder.pkl") 
    print("- personality_encoder.pkl")
    print("- model_info.json")
    
    return best_model, model_info

if __name__ == "__main__":
    train_personality_model()
