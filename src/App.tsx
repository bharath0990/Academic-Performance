import { Calculator, Users } from 'lucide-react';
import { useState } from 'react';
import AttendanceCalculator from './components/AttendanceCalculator';
import CGPACalculator from './components/CGPACalculator';
import SocialFooter from './components/SocialFooter';

function App() {
  const [activeTab, setActiveTab] = useState<'cgpa' | 'attendance'>('cgpa');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Academic Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your CGPA and track your attendance
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="border border-black rounded-lg p-1">
            <button
              onClick={() => setActiveTab('cgpa')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'cgpa'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              CGPA Calculator
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'attendance'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Attendance Calculator
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'cgpa' ? (
            <CGPACalculator />
          ) : (
            <AttendanceCalculator />
          )}
        </div>

        {/* Social Footer */}
        <SocialFooter />
      </div>
    </div>
  );
}

export default App;