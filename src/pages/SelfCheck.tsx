import React, { useState } from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Star, Award, Target } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Assessment {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  scoring: { range: [number, number]; level: string; description: string; color: string }[];
}

const SelfCheck: React.FC = () => {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [streakCount, setStreakCount] = useState(7); // Example streak
  const [totalBadges, setTotalBadges] = useState(3); // Example badges

  const assessments: Assessment[] = [
    {
      id: 'phq9',
      name: 'PHQ-9 Depression Assessment',
      description: 'Evaluate symptoms of depression over the past 2 weeks',
      questions: [
        {
          id: 'phq9-1',
          text: 'Little interest or pleasure in doing things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9-2',
          text: 'Feeling down, depressed, or hopeless',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9-3',
          text: 'Trouble falling or staying asleep, or sleeping too much',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9-4',
          text: 'Feeling tired or having little energy',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9-5',
          text: 'Poor appetite or overeating',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ],
      scoring: [
        { range: [0, 4], level: 'Minimal', description: 'Minimal depression symptoms', color: 'green' },
        { range: [5, 9], level: 'Mild', description: 'Mild depression symptoms', color: 'yellow' },
        { range: [10, 14], level: 'Moderate', description: 'Moderate depression symptoms', color: 'orange' },
        { range: [15, 27], level: 'Severe', description: 'Severe depression symptoms', color: 'red' }
      ]
    },
    {
      id: 'gad7',
      name: 'GAD-7 Anxiety Assessment',
      description: 'Measure anxiety symptoms over the past 2 weeks',
      questions: [
        {
          id: 'gad7-1',
          text: 'Feeling nervous, anxious, or on edge',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7-2',
          text: 'Not being able to stop or control worrying',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7-3',
          text: 'Worrying too much about different things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7-4',
          text: 'Trouble relaxing',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ],
      scoring: [
        { range: [0, 4], level: 'Minimal', description: 'Minimal anxiety symptoms', color: 'green' },
        { range: [5, 9], level: 'Mild', description: 'Mild anxiety symptoms', color: 'yellow' },
        { range: [10, 14], level: 'Moderate', description: 'Moderate anxiety symptoms', color: 'orange' },
        { range: [15, 21], level: 'Severe', description: 'Severe anxiety symptoms', color: 'red' }
      ]
    },
    {
      id: 'ghq',
      name: 'General Health Questionnaire',
      description: 'Overall mental wellbeing assessment',
      questions: [
        {
          id: 'ghq-1',
          text: 'Have you recently been able to concentrate on things?',
          options: [
            { value: 0, label: 'Better than usual' },
            { value: 0, label: 'Same as usual' },
            { value: 1, label: 'Less than usual' },
            { value: 1, label: 'Much less than usual' }
          ]
        },
        {
          id: 'ghq-2',
          text: 'Have you recently lost sleep over worry?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 0, label: 'No more than usual' },
            { value: 1, label: 'Rather more than usual' },
            { value: 1, label: 'Much more than usual' }
          ]
        },
        {
          id: 'ghq-3',
          text: 'Have you recently felt useful and playing a part?',
          options: [
            { value: 0, label: 'More so than usual' },
            { value: 0, label: 'Same as usual' },
            { value: 1, label: 'Less useful than usual' },
            { value: 1, label: 'Much less useful' }
          ]
        }
      ],
      scoring: [
        { range: [0, 0], level: 'Good', description: 'Good mental wellbeing', color: 'green' },
        { range: [1, 2], level: 'Moderate', description: 'Some concerns about wellbeing', color: 'yellow' },
        { range: [3, 6], level: 'Poor', description: 'Significant wellbeing concerns', color: 'red' }
      ]
    }
  ];

  const startAssessment = (assessmentId: string) => {
    setCurrentAssessment(assessmentId);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextQuestion = () => {
    const assessment = assessments.find(a => a.id === currentAssessment);
    if (!assessment) return;

    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const assessment = assessments.find(a => a.id === currentAssessment);
    if (!assessment) return;

    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const scoreLevel = assessment.scoring.find(s => 
      totalScore >= s.range[0] && totalScore <= s.range[1]
    );

    const result = {
      assessment: assessment.name,
      score: totalScore,
      level: scoreLevel?.level || 'Unknown',
      description: scoreLevel?.description || '',
      color: scoreLevel?.color || 'gray',
      date: new Date(),
      recommendations: generateRecommendations(scoreLevel?.level || '')
    };

    setCompletedAssessments({ ...completedAssessments, [currentAssessment!]: result });
    setShowResults(true);
    
    // Update streak and badges
    setStreakCount(streakCount + 1);
    if (streakCount + 1 === 10) {
      setTotalBadges(totalBadges + 1);
    }
  };

  const generateRecommendations = (level: string): string[] => {
    switch (level.toLowerCase()) {
      case 'minimal':
      case 'good':
        return [
          'Continue your current self-care routine',
          'Practice daily mindfulness or meditation',
          'Maintain regular exercise and healthy sleep habits',
          'Stay connected with friends and family'
        ];
      case 'mild':
      case 'moderate':
        return [
          'Consider speaking with a counselor or therapist',
          'Try stress management techniques like deep breathing',
          'Maintain a regular sleep schedule',
          'Engage in physical activity or hobbies you enjoy',
          'Limit alcohol and caffeine intake'
        ];
      case 'severe':
      case 'poor':
        return [
          'We strongly recommend speaking with a mental health professional',
          'Consider contacting your student counseling center',
          'Reach out to trusted friends or family members',
          'Use crisis resources if you\'re in immediate distress',
          'Focus on basic self-care: sleep, nutrition, and safety'
        ];
      default:
        return ['Take care of yourself and consider professional guidance if needed'];
    }
  };

  const resetAssessment = () => {
    setCurrentAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const renderAssessmentList = () => (
    <div className="space-y-8">
      {/* Gamification Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="text-orange-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{streakCount}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="text-purple-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalBadges}</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{Object.keys(completedAssessments).length}</p>
            <p className="text-sm text-gray-600">Assessments Completed</p>
          </div>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map(assessment => (
          <div key={assessment.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{assessment.name}</h3>
              {completedAssessments[assessment.id] && (
                <CheckCircle className="text-green-600" size={20} />
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4">{assessment.description}</p>
            <p className="text-xs text-gray-500 mb-4">
              {assessment.questions.length} questions • 3-5 minutes
            </p>
            
            {completedAssessments[assessment.id] && (
              <div className={`mb-4 p-3 rounded-lg bg-${completedAssessments[assessment.id].color}-50`}>
                <p className={`text-sm font-medium text-${completedAssessments[assessment.id].color}-800`}>
                  Latest Result: {completedAssessments[assessment.id].level}
                </p>
                <p className={`text-xs text-${completedAssessments[assessment.id].color}-600`}>
                  {new Date(completedAssessments[assessment.id].date).toLocaleDateString()}
                </p>
              </div>
            )}
            
            <button
              onClick={() => startAssessment(assessment.id)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              {completedAssessments[assessment.id] ? 'Retake Assessment' : 'Start Assessment'}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Results */}
      {Object.keys(completedAssessments).length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={20} />
            Your Wellbeing Trends
          </h2>
          <div className="space-y-4">
            {Object.entries(completedAssessments).map(([id, result]) => (
              <div key={id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{result.assessment}</p>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${result.color}-100 text-${result.color}-700`}>
                    {result.level}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {result.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAssessment = () => {
    const assessment = assessments.find(a => a.id === currentAssessment);
    if (!assessment) return null;

    if (showResults) {
      const result = completedAssessments[currentAssessment!];
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className={`w-16 h-16 bg-${result.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {result.color === 'green' ? 
                <CheckCircle className={`text-${result.color}-600`} size={32} /> :
                <AlertCircle className={`text-${result.color}-600`} size={32} />
              }
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
            <p className="text-gray-600 mb-6">{assessment.name}</p>
            
            <div className={`bg-${result.color}-50 rounded-lg p-6 mb-6`}>
              <p className={`text-lg font-semibold text-${result.color}-800 mb-2`}>
                Result: {result.level}
              </p>
              <p className={`text-${result.color}-700`}>{result.description}</p>
              <p className="text-sm text-gray-600 mt-2">Score: {result.score}</p>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Personalized Recommendations:</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                    <Star className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => startAssessment(currentAssessment!)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Retake Assessment
              </button>
              <button
                onClick={resetAssessment}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = assessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{assessment.name}</span>
              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1} of {assessment.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={resetAssessment}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={nextQuestion}
              disabled={answers[currentQuestion.id] === undefined}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {currentQuestionIndex < assessment.questions.length - 1 ? 'Next' : 'Complete'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Self-Assessment</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take standardized assessments to understand your mental wellbeing. Track your progress and 
          get personalized recommendations for better mental health.
        </p>
      </div>

      {currentAssessment ? renderAssessment() : renderAssessmentList()}
    </div>
  );
};

export default SelfCheck;