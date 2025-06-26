import { RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

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

  return (
    <div className="border border-black rounded-lg">
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
                  value={gradeCounts[parseInt(grade)]}
                  onChange={(e) => updateCount(parseInt(grade), parseInt(e.target.value) || 0)}
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
        <div className="p-6 border border-black rounded text-center">
          <h3 className="text-lg font-semibold text-black mb-2">Your CGPA</h3>
          <div className="text-4xl font-bold text-black mb-2">
            {cgpa.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">
            Based on {Object.values(gradeCounts).reduce((sum, c) => sum + c, 0)} subject(s)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
