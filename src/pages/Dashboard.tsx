import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Brain, 
  AlertTriangle, 
  Calendar,
  Activity,
  Heart,
  Shield
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7d');

  // Mock data for campus happiness index
  const campusData = {
    happinessScore: 7.2,
    totalUsers: 1247,
    weeklyTrend: 0.3,
    departmentBreakdown: [
      { department: 'Computer Science', score: 7.8, students: 342 },
      { department: 'Engineering', score: 7.1, students: 289 },
      { department: 'Business', score: 6.9, students: 201 },
      { department: 'Arts & Sciences', score: 7.4, students: 415 }
    ],
    stressLevels: {
      low: 45,
      moderate: 38,
      high: 17
    },
    examStressData: [
      { week: 'Week 1', stress: 6.2, sleep: 7.1 },
      { week: 'Week 2', stress: 6.8, sleep: 6.8 },
      { week: 'Week 3', stress: 7.5, sleep: 6.2 },
      { week: 'Week 4', stress: 8.2, sleep: 5.9 },
      { week: 'Week 5', stress: 7.8, sleep: 6.1 }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Campus Mental Wellness Dashboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time insights into campus mental health trends. All data is aggregated and anonymized to protect student privacy.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center space-x-2">
        {[
          { value: '7d', label: '7 Days' },
          { value: '30d', label: '30 Days' },
          { value: '90d', label: '3 Months' }
        ].map((period) => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedPeriod === period.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="text-green-600" size={24} />
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(campusData.happinessScore)}`}>
              {campusData.happinessScore}/10
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Campus Happiness Score</h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <TrendingUp size={12} className="mr-1 text-green-500" />
            +{campusData.weeklyTrend} from last week
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">{campusData.totalUsers}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Active Users</h3>
          <p className="text-sm text-gray-600">This {selectedPeriod === '7d' ? 'week' : 'period'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {campusData.stressLevels.high}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">High Stress Students</h3>
          <p className="text-sm text-gray-600">Requiring attention</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">23</span>
          </div>
          <h3 className="font-semibold text-gray-900">Crisis Interventions</h3>
          <p className="text-sm text-gray-600">Successfully handled</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <BarChart3 className="mr-2 text-blue-600" size={20} />
            Wellbeing by Department
          </h2>
          <div className="space-y-4">
            {campusData.departmentBreakdown.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{dept.department}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${getScoreColor(dept.score)}`}>
                      {dept.score}/10
                    </span>
                    <span className="text-sm text-gray-500">({dept.students} students)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${dept.score >= 8 ? 'bg-green-500' : dept.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${(dept.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stress Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Activity className="mr-2 text-blue-600" size={20} />
            Stress Level Distribution
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Low Stress</span>
              <span className="font-semibold text-green-600">{campusData.stressLevels.low}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${campusData.stressLevels.low}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Moderate Stress</span>
              <span className="font-semibold text-yellow-600">{campusData.stressLevels.moderate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${campusData.stressLevels.moderate}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">High Stress</span>
              <span className="font-semibold text-red-600">{campusData.stressLevels.high}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full"
                style={{ width: `${campusData.stressLevels.high}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Stress Prediction */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Calendar className="mr-2 text-blue-600" size={20} />
          Exam Stress Prediction & Sleep Patterns
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            {campusData.examStressData.map((week, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{week.week}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Stress Level</p>
                    <p className={`font-semibold ${getScoreColor(10 - week.stress)}`}>
                      {week.stress}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Sleep Quality</p>
                    <p className={`font-semibold ${getScoreColor(week.sleep)}`}>
                      {week.sleep}/10
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="text-orange-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <p className="font-medium text-orange-800">Prediction Alert</p>
                <p className="text-orange-700 text-sm">
                  Stress levels are projected to peak in Week 4 (exam period). Consider increasing support resources and wellness programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-4">
          <Shield className="text-blue-600 mr-2" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Confidentiality</h2>
        </div>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          All data displayed on this dashboard is completely anonymized and aggregated. Individual student information 
          is never shared or identifiable. We prioritize student privacy while providing valuable insights for campus mental health support.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;