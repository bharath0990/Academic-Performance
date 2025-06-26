import { RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

const AttendanceCalculator: React.FC = () => {
  const [requiredPercentage, setRequiredPercentage] = useState<number>(80);
  const [presentClasses, setPresentClasses] = useState<number>(0);
  const [totalClasses, setTotalClasses] = useState<number>(0);

  const resetCalculator = () => {
    setRequiredPercentage(80);
    setPresentClasses(0);
    setTotalClasses(0);
  };

  const calculateCurrentPercentage = () => {
    if (totalClasses === 0) return 0;
    return (presentClasses / totalClasses) * 100;
  };

  const calculateClassesToAttend = () => {
    const r = requiredPercentage / 100;
    if (presentClasses / totalClasses >= r) return 0;

    const x = (requiredPercentage * totalClasses - 100 * presentClasses) / (100 - requiredPercentage);
    return Math.ceil(x);
  };

  const calculateBunkableClasses = () => {
    const r = requiredPercentage / 100;
    if (presentClasses / totalClasses < r) return 0;

    // Solve: (presentClasses) / (totalClasses + x) = r
    const x = (presentClasses / r) - totalClasses;
    return Math.floor(x);
  };

  const currentPercentage = calculateCurrentPercentage().toFixed(2);
  const classesNeeded = calculateClassesToAttend();
  const bunkableClasses = calculateBunkableClasses();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">Attendance Calculator</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Check how many classes you need to attend or can afford to miss.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
        {/* Percentage Required */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">Required %</label>
          <select
            value={requiredPercentage}
            onChange={(e) => setRequiredPercentage(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-md text-lg"
          >
            {[75, 80, 85, 90].map((p) => (
              <option key={p} value={p}>{p}%</option>
            ))}
          </select>
        </div>

        {/* Present Classes */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">Present</label>
          <input
            type="number"
            min="0"
            value={presentClasses}
            onChange={(e) => setPresentClasses(parseInt(e.target.value) || 0)}
            className="px-4 py-2 border border-gray-300 rounded-md text-lg text-center"
          />
        </div>

        {/* Total Classes */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">Total</label>
          <input
            type="number"
            min="0"
            value={totalClasses}
            onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
            className="px-4 py-2 border border-gray-300 rounded-md text-lg text-center"
          />
        </div>
      </div>

      {/* Results */}
      {totalClasses > 0 && (
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 text-lg">
            Current Attendance:{" "}
            <span className="font-bold text-black bg-yellow-200 px-2 py-1 rounded">
              {presentClasses}/{totalClasses} → {currentPercentage}%
            </span>
          </p>

          {parseFloat(currentPercentage) >= requiredPercentage ? (
            <p className="text-lg text-green-600">
              🎉 You can bunk{" "}
              <span className="font-bold text-black">{bunkableClasses}</span> more class
              {bunkableClasses !== 1 && "es"} and still maintain{" "}
              {requiredPercentage}% attendance.
            </p>
          ) : (
            <>
              <p className="text-lg text-red-600">
                ⚠️ You need to attend{" "}
                <span className="font-bold text-black">{classesNeeded}</span> more class
                {classesNeeded !== 1 && "es"} to reach {requiredPercentage}%.
              </p>
              <p className="text-gray-600">
                Future Attendance:{" "}
                <span className="font-bold text-black bg-green-200 px-2 py-1 rounded">
                  {presentClasses + classesNeeded}/{totalClasses + classesNeeded} → {requiredPercentage}%
                </span>
              </p>
            </>
          )}
        </div>
      )}

      {/* Reset */}
      <div className="mt-8 text-center">
        <button
          onClick={resetCalculator}
          className="flex items-center gap-2 px-4 py-2 border border-black text-black rounded hover:bg-gray-100 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
