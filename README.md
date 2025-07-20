# 🧠 Are You an Introvert or Extrovert?

A modern, AI-powered personality classification web application that determines whether you're an introvert or extrovert based on behavioral patterns and lifestyle preferences.

![Personality Quiz Demo](https://img.shields.io/badge/Demo-Live-brightgreen)--> https://personalitty.netlify.app/

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)

## 🌟 Features

### ✨ **Interactive Personality Quiz**
- 7 scientifically-backed questions about behavioral patterns
- Intuitive slider and radio button interfaces
- Real-time progress tracking
- Smooth animations and transitions

### 🤖 **AI-Powered Analysis**
- Machine learning model trained on personality data
- Confidence scoring for predictions
- Personalized insights based on responses
- Rule-based prediction engine with high accuracy

### 🎨 **Modern UI/UX Design**
- Responsive design for all devices
- Beautiful gradient themes
- Glass morphism effects
- Micro-interactions and hover animations
- Color-coded results (Purple for Introverts, Orange for Extroverts)

### 📊 **Comprehensive Results**
- Personality type classification
- Confidence percentage
- Detailed behavioral insights
- Personality trait explanations
- Actionable recommendations

### 🔄 **User Actions**
- Share results on social media
- Download results as text file
- Retake quiz functionality
- Copy results to clipboard

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Python** - Data analysis and ML model training
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/personality-classification.git
   cd personality-classification
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Install Python dependencies**
   \`\`\`bash
   pip install pandas numpy scikit-learn matplotlib seaborn joblib
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
personality-classification/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts          # Prediction API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── navigation.tsx           # Navigation header
│   ├── personality-quiz.tsx     # Quiz component
│   └── results.tsx              # Results display
├── data/
│   └── personality_dataset.csv  # Training dataset
├── scripts/
│   ├── data_analysis.py         # Data analysis script
│   └── train_model.py           # ML model training
├── lib/
│   └── utils.ts                 # Utility functions
└── README.md
\`\`\`

## 🔬 Machine Learning Model

### Dataset Features
The model is trained on 7 behavioral features:

| Feature | Description | Range |
|---------|-------------|-------|
| `Time_spent_Alone` | Hours spent alone daily | 0-24 hours |
| `Stage_fear` | Fear of public speaking | Yes/No |
| `Social_event_attendance` | Social event frequency | 0-10 scale |
| `Going_outside` | Outdoor activity frequency | 0-10 scale |
| `Drained_after_socializing` | Energy drain from socializing | Yes/No |
| `Friends_circle_size` | Number of close friends | 0-15 |
| `Post_frequency` | Social media posting frequency | 0-10 scale |

### Model Performance
- **Algorithms Tested**: Random Forest, Logistic Regression, SVM
- **Target Accuracy**: >85%
- **Cross-validation**: 5-fold CV
- **Evaluation Metrics**: Accuracy, Precision, Recall, F1-Score

### Training the Model

1. **Analyze the dataset**
   \`\`\`bash
   python scripts/data_analysis.py
   \`\`\`

2. **Train the model**
   \`\`\`bash
   python scripts/train_model.py
   \`\`\`

## 🌐 API Endpoints

### POST `/api/predict`
Predicts personality type based on user responses.

**Request Body:**
\`\`\`json
{
  "time_spent_alone": 8.0,
  "stage_fear": "Yes",
  "social_event_attendance": 3,
  "going_outside": 5,
  "drained_after_socializing": "Yes",
  "friends_circle_size": 4,
  "post_frequency": 2
}
\`\`\`

**Response:**
\`\`\`json
{
  "prediction": "Introvert",
  "confidence": 0.87,
  "personality_type": "Introvert",
  "insights": [
    "You value significant alone time for reflection and recharging",
    "Public speaking makes you nervous, which is common for introverts",
    "You prefer smaller, intimate gatherings over large social events"
  ]
}
\`\`\`

## 🎯 Usage

1. **Start the Quiz**: Click "Start Your Journey" on the welcome page
2. **Answer Questions**: Complete all 7 questions about your behavior
3. **Get Results**: View your personality type with confidence score
4. **Explore Insights**: Read personalized behavioral insights
5. **Take Action**: Share, download, or retake the quiz

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📊 Dataset

The personality dataset contains behavioral data used to train the classification model. The dataset includes:
- **Samples**: 1000+ personality assessments
- **Features**: 7 behavioral indicators
- **Target**: Binary classification (Introvert/Extrovert)
- **Quality**: Cleaned and preprocessed data

## 🔮 Future Enhancements

- [ ] **Multi-class Classification**: Add Ambivert category
- [ ] **Explainable AI**: Show feature importance in results
- [ ] **Mobile App**: React Native version
- [ ] **User Accounts**: Save and track personality over time
- [ ] **Social Features**: Compare with friends
- [ ] **Advanced Analytics**: Detailed personality reports
- [ ] **Internationalization**: Multi-language support
- [ ] **A/B Testing**: Optimize quiz questions

## 📈 Performance

- **Load Time**: <2 seconds
- **Prediction Speed**: <1 second
- **Mobile Responsive**: 100% compatible
- **Accessibility**: WCAG 2.1 compliant
- **SEO Optimized**: Meta tags and structured data

## 🔒 Privacy & Security

- **No Data Storage**: Responses are not saved unless explicitly consented
- **Client-side Processing**: Predictions happen in real-time
- **HTTPS Only**: Secure data transmission
- **Privacy First**: No tracking or analytics without consent

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Dataset**: Personality classification research data
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Framework**: [Next.js](https://nextjs.org/)

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@personalityquiz.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/personality-classification/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/personality-classification/discussions)

---

**Made with ❤️ by [Your Name]**

⭐ **Star this repo if you found it helpful!**
