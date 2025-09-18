import React, { useState } from 'react';
import { PenTool, Smile, Meh, Frown, Mic, Save, Calendar, TrendingUp, MessageSquare } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  content: string;
  aiInsight?: string;
  isVoice?: boolean;
}

const Journal: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [isRecording, setIsRecording] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      mood: 4,
      content: 'Had a productive study session today. Feeling optimistic about upcoming exams.',
      aiInsight: 'Your positive attitude towards studying shows great resilience. Keep maintaining this balanced approach to academics!'
    },
    {
      id: '2',
      date: '2024-01-14',
      mood: 2,
      content: 'Feeling overwhelmed with assignment deadlines. Having trouble sleeping.',
      aiInsight: 'It sounds like you\'re experiencing academic stress. Consider breaking tasks into smaller steps and practicing relaxation techniques before bed.'
    }
  ]);

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { value: 2, emoji: '🙁', label: 'Sad', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'text-green-500' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: 'text-blue-500' },
  ];

  const generateAIInsight = (mood: number, content: string): string => {
    const insights = {
      1: [
        "I notice you're going through a difficult time. Remember that these feelings are temporary and it's okay to seek support.",
        "Your feelings are valid. Consider reaching out to friends, family, or a counselor for additional support."
      ],
      2: [
        "It sounds challenging right now. Try to focus on small, achievable goals and be gentle with yourself.",
        "Difficult emotions can teach us about ourselves. Consider what might help you feel more supported."
      ],
      3: [
        "Neutral days are part of life's rhythm. Sometimes taking things one step at a time is exactly what we need.",
        "It's okay to have days where you feel neither up nor down. Focus on self-care and routine."
      ],
      4: [
        "I'm glad to hear you're feeling positive! What specific things contributed to this good mood?",
        "Your positive energy shows through. Keep nurturing the activities and thoughts that bring you joy."
      ],
      5: [
        "Your happiness is wonderful to see! Consider how you might maintain this positive state.",
        "Great to hear you're feeling so good. Celebrating these moments helps build resilience for challenging times."
      ]
    };

    const moodInsights = insights[mood as keyof typeof insights] || insights[3];
    return moodInsights[Math.floor(Math.random() * moodInsights.length)];
  };

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      content: currentEntry,
      aiInsight: generateAIInsight(selectedMood, currentEntry),
      isVoice: isRecording
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    setSelectedMood(3);
    setIsRecording(false);
  };

  const getMoodStats = () => {
    const last7Days = entries.slice(0, 7);
    const averageMood = last7Days.reduce((sum, entry) => sum + entry.mood, 0) / last7Days.length || 3;
    const trend = last7Days.length >= 2 ? 
      (last7Days[0].mood - last7Days[last7Days.length - 1].mood) : 0;
    
    return { averageMood: averageMood.toFixed(1), trend };
  };

  const stats = getMoodStats();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mood Journal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your daily emotions and thoughts. Get AI-powered insights to better understand your mental wellbeing patterns.
        </p>
      </div>

      {/* Mood Statistics */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-600" size={20} />
          Your Mood Insights
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">{moodEmojis.find(m => Math.round(parseFloat(stats.averageMood)) === m.value)?.emoji || '😐'}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.averageMood}</p>
            <p className="text-sm text-gray-600">Average Mood (7 days)</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="text-green-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{entries.length}</p>
            <p className="text-sm text-gray-600">Total Entries</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              {stats.trend > 0 ? (
                <TrendingUp className="text-green-600" size={24} />
              ) : stats.trend < 0 ? (
                <TrendingUp className="text-red-600 transform rotate-180" size={24} />
              ) : (
                <Meh className="text-gray-600" size={24} />
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.trend > 0 ? '↗️' : stats.trend < 0 ? '↘️' : '→'}
            </p>
            <p className="text-sm text-gray-600">Weekly Trend</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* New Entry Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <PenTool className="mr-2 text-blue-600" size={20} />
            How are you feeling today?
          </h2>

          {/* Mood Selection */}
          <div className="mb-6">
            <p className="font-medium mb-3">Select your mood:</p>
            <div className="flex justify-between items-center">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    selectedMood === mood.value
                      ? 'bg-blue-100 text-blue-700 scale-110'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block font-medium mb-3">What's on your mind?</label>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Share your thoughts, feelings, experiences... anything that comes to mind."
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Voice Recording Option */}
          <div className="mb-6">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isRecording
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mic size={16} />
              <span>{isRecording ? 'Stop Recording' : 'Voice Entry'}</span>
            </button>
            {isRecording && (
              <p className="text-sm text-gray-600 mt-2">Recording... Speak naturally about your day</p>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveEntry}
            disabled={!currentEntry.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Save size={16} />
            <span>Save Entry</span>
          </button>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Entries</h2>
          
          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No journal entries yet</p>
              <p className="text-sm">Start by sharing how you're feeling today</p>
            </div>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {entries.map((entry) => {
                const moodData = moodEmojis.find(m => m.value === entry.mood);
                return (
                  <div key={entry.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{moodData?.emoji}</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className={`text-sm ${moodData?.color || 'text-gray-500'}`}>
                            {moodData?.label}
                          </p>
                        </div>
                      </div>
                      {entry.isVoice && (
                        <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center">
                          <Mic size={10} className="mr-1" />
                          Voice
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                      {entry.content}
                    </p>
                    
                    {entry.aiInsight && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-sm font-medium mb-1">AI Insight:</p>
                        <p className="text-blue-700 text-sm">{entry.aiInsight}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;