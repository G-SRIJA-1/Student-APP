import React from 'react';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  PenTool, 
  Shield,
  Users,
  Brain,
  Heart,
  Sparkles
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-green-100/50 rounded-3xl mx-4"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>Your Safe Space for Mental Wellness</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MindMate
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A confidential, AI-powered mental wellness platform designed specifically for college students. 
            Get support, track your wellbeing, and access resources - all in complete privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('chat')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Anonymous Chat
            </button>
            <button
              onClick={() => onNavigate('self-check')}
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Take Wellness Check
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Everything You Need for Mental Wellness
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Anonymous AI Chat',
                description: 'Get immediate support with our AI chatbot trained in mental health first aid.',
                color: 'blue',
                action: () => onNavigate('chat')
              },
              {
                icon: Calendar,
                title: 'Private Appointments',
                description: 'Book confidential counseling sessions with complete privacy.',
                color: 'green',
                action: () => onNavigate('appointments')
              },
              {
                icon: BookOpen,
                title: 'Wellness Resources',
                description: 'Access curated content in multiple regional languages.',
                color: 'purple',
                action: () => onNavigate('resources')
              },
              {
                icon: CheckCircle,
                title: 'Self-Assessment Tools',
                description: 'Complete PHQ-9, GAD-7, and GHQ assessments to track your mental health.',
                color: 'teal',
                action: () => onNavigate('self-check')
              },
              {
                icon: PenTool,
                title: 'Mood Journal',
                description: 'Track your daily mood and receive AI-powered insights.',
                color: 'rose',
                action: () => onNavigate('journal')
              },
              {
                icon: Brain,
                title: 'Smart Analytics',
                description: 'Get personalized insights and early stress detection.',
                color: 'amber',
                action: () => onNavigate('dashboard')
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={feature.action}
                  className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
                >
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`text-${feature.color}-600`} size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Privacy is Our Priority</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Complete Anonymity',
                description: 'No personal data stored. Complete privacy guaranteed.'
              },
              {
                icon: Users,
                title: 'Stigma-Free Environment',
                description: 'Safe space designed to remove mental health stigma.'
              },
              {
                icon: Heart,
                title: 'Crisis Support',
                description: 'Immediate guidance to professional help when needed.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who trust MindMate for their mental wellness needs.
          </p>
          <button
            onClick={() => onNavigate('chat')}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
