import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ChatSupport from './pages/ChatSupport';
import Appointments from './pages/Appointments';
import Resources from './pages/Resources';
import SelfCheck from './pages/SelfCheck';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'chat':
        return <ChatSupport />;
      case 'appointments':
        return <Appointments />;
      case 'resources':
        return <Resources />;
      case 'self-check':
        return <SelfCheck />;
      case 'journal':
        return <Journal />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;