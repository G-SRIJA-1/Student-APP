import React, { useState } from 'react';
import { Play, Book, Headphones, Video, Globe, Search, Filter } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'article' | 'exercise';
  language: string;
  duration: string;
  category: string;
  description: string;
  thumbnail?: string;
}

const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Breathing Exercises for Anxiety Relief',
      type: 'video',
      language: 'English',
      duration: '5 min',
      category: 'Anxiety Management',
      description: 'Simple breathing techniques to help manage anxiety and stress.',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: '2',
      title: 'ప్రశాంత మనస్సు కోసం ధ్యానం',
      type: 'audio',
      language: 'Telugu',
      duration: '10 min',
      category: 'Meditation',
      description: 'Guided meditation in Telugu for peaceful mind and better sleep.',
      thumbnail: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg'
    },
    {
      id: '3',
      title: 'परीक्षा तनाव से निपटने के तरीके',
      type: 'article',
      language: 'Hindi',
      duration: '8 min read',
      category: 'Academic Stress',
      description: 'Effective strategies to manage exam stress and improve performance.',
      thumbnail: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg'
    },
    {
      id: '4',
      title: 'மனநலத்திற்கான யோகா பயிற்சிகள்',
      type: 'video',
      language: 'Tamil',
      duration: '15 min',
      category: 'Yoga & Exercise',
      description: 'Simple yoga exercises for better mental health and wellbeing.',
      thumbnail: 'https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg'
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      type: 'audio',
      language: 'English',
      duration: '12 min',
      category: 'Relaxation',
      description: 'Full-body relaxation technique to reduce physical tension.',
      thumbnail: 'https://images.pexels.com/photos/3775593/pexels-photo-3775593.jpeg'
    },
    {
      id: '6',
      title: 'মানসিক স্বাস্থ্য সম্পর্কে সচেতনতা',
      type: 'article',
      language: 'Bengali',
      duration: '6 min read',
      category: 'Mental Health Awareness',
      description: 'Understanding mental health and breaking stigma in Bengali community.',
      thumbnail: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg'
    }
  ];

  const categories = [
    'all', 'Anxiety Management', 'Depression Support', 'Academic Stress', 
    'Meditation', 'Yoga & Exercise', 'Relaxation', 'Mental Health Awareness'
  ];

  const languages = ['all', 'English', 'Telugu', 'Tamil', 'Hindi', 'Bengali', 'Gujarati'];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'audio': return <Headphones size={16} />;
      case 'article': return <Book size={16} />;
      case 'exercise': return <Play size={16} />;
      default: return <Book size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'exercise': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wellness Resource Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated mental health resources in multiple languages. Find videos, articles, 
          audio guides, and exercises tailored to your needs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center space-x-2">
            <Globe size={20} className="text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language === 'all' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {resource.duration}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Play className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Globe size={12} className="mr-1" />
                  {resource.language}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {resource.description}
              </p>
              <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
                {resource.type === 'article' ? 'Read Now' : 
                 resource.type === 'audio' ? 'Listen Now' : 'Watch Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Regional Audio Therapy</h2>
        <p className="text-gray-600 mb-6">
          AI-generated bedtime stories and meditation tracks in your preferred regional language.
          Personalized content that resonates with your cultural background.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {['Telugu Sleep Stories', 'Tamil Meditation', 'Hindi Relaxation'].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Headphones className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item}</p>
                <p className="text-xs text-gray-500">20+ tracks available</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;