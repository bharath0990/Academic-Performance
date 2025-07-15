import { RefreshCw, Star, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const CGPACalculator: React.FC = () => {
  const [gradeCounts, setGradeCounts] = useState<{ [key: number]: number }>({
    10: 0,
    9: 0,
    8: 0,
    7: 0,
    6: 0,
    5: 0,
    4: 0,
    0: 0
  });
  const [showCelebration, setShowCelebration] = useState(false);

  const updateCount = (grade: number, count: number) => {
    setGradeCounts({ ...gradeCounts, [grade]: count });
  };

  const resetCalculator = () => {
    setGradeCounts({
      10: 0,
      9: 0,
      8: 0,
      7: 0,
      6: 0,
      5: 0,
      4: 0,
      0: 0
    });
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalSubjects = 0;

    for (const grade in gradeCounts) {
      const point = parseInt(grade);
      const count = gradeCounts[point];
      totalPoints += point * count;
      totalSubjects += count;
    }

    if (totalSubjects === 0) return 0;
    return totalPoints / totalSubjects;
  };

  const cgpa = calculateCGPA();
  const totalSubjects = Object.values(gradeCounts).reduce((sum, c) => sum + c, 0);

  // Celebration effect for CGPA > 8
  useEffect(() => {
    if (cgpa > 8 && totalSubjects > 0) {
      setShowCelebration(true);
      
      // Play celebration sound
      const playSound = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create a series of celebratory tones
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
          }, index * 150);
        });
      };

      try {
        playSound();
      } catch (error) {
        console.log('Audio not supported');
      }

      // Hide celebration after animation
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowCelebration(false);
    }
  }, [cgpa, totalSubjects]);

  return (
    <div className="border border-black rounded-lg relative overflow-hidden">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Confetti particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {i % 2 === 0 ? (
                <Star className="w-4 h-4 text-yellow-400 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              )}
            </div>
          ))}
          
          {/* Blast effect */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-transparent to-transparent animate-ping" />
          
          {/* Celebration message */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Star className="w-5 h-5" />
                🎉 Excellent Performance! 🎉
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-black text-white p-6">
        <h2 className="text-2xl font-bold">CGPA Calculator</h2>
        <p className="text-gray-300 mt-2">Enter the number of subjects for each grade</p>
      </div>

      <div className="p-6">
        {/* Grade Inputs */}
        <div className="space-y-4 mb-6">
          {Object.keys(gradeCounts)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((grade) => (
              <div key={grade} className="flex items-center gap-4">
                <label className="w-20 text-black font-medium text-lg">
                  Grade {grade}:
                </label>
                <input
                  type="number"
                  min="0"
                  value={gradeCounts[parseInt(grade)] === 0 ? '' : gradeCounts[parseInt(grade)]}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateCount(parseInt(grade), value === '' ? 0 : parseInt(value));
                  }}
                  placeholder="0"
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-lg text-center"
                />
              </div>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={resetCalculator}
            className="flex items-center gap-2 px-4 py-2 border border-black text-black rounded hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Result */}
        <div className={`p-6 border border-black rounded text-center transition-all duration-500 ${
          cgpa > 8 && totalSubjects > 0 
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg' 
            : ''
        }`}>
          <h3 className="text-lg font-semibold text-black mb-2">Your CGPA</h3>
          <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${
            cgpa > 8 && totalSubjects > 0 
              ? 'text-orange-600 animate-pulse' 
              : 'text-black'
          }`}>
            {cgpa.toFixed(2)}
          </div>
          
          {/* Performance indicator */}
          {totalSubjects > 0 && (
            <div className="mb-2">
              {cgpa >= 9 && (
                <div className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  Outstanding!
                  <Star className="w-4 h-4 fill-current" />
                </div>
              )}
              {cgpa >= 8 && cgpa < 9 && (
                <div className="flex items-center justify-center gap-1 text-blue-600 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Excellent!
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              {cgpa >= 7 && cgpa < 8 && (
                <div className="text-green-600 font-semibold">Very Good!</div>
              )}
              {cgpa >= 6 && cgpa < 7 && (
                <div className="text-yellow-600 font-semibold">Good</div>
              )}
              {cgpa < 6 && cgpa > 0 && (
                <div className="text-orange-600 font-semibold">Keep Improving!</div>
              )}
            </div>
          )}
          
          <div className="text-sm text-gray-600">
            Based on {totalSubjects} subject(s)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;