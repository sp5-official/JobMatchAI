import React from 'react';
import { CheckCircle, XCircle, Copy, Check } from 'lucide-react';

interface Skill {
  name: string;
  relevance: number;
}

interface SkillsComparisonProps {
  matchedSkills: Skill[];
  missingSkills: Skill[];
  darkMode: boolean;
}

export const SkillsComparison: React.FC<SkillsComparisonProps> = ({ 
  matchedSkills, 
  missingSkills, 
  darkMode 
}) => {
  const [copiedSkills, setCopiedSkills] = React.useState<string[]>([]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSkills([...copiedSkills, type]);
    setTimeout(() => {
      setCopiedSkills(copiedSkills.filter(item => item !== type));
    }, 2000);
  };

  const cardClass = `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`;

  return (
    <div className="space-y-6">
      {/* Matched Skills */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Matched Skills ({matchedSkills.length})
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(matchedSkills.map(s => s.name).join(', '), 'matched')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Copy matched skills"
          >
            {copiedSkills.includes('matched') ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        
        <div className="space-y-2">
          {matchedSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                {skill.name}
              </span>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'
                }`}>
                  {skill.relevance}% match
                </div>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          ))}
        </div>
        
        {matchedSkills.length === 0 && (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No matched skills found. Try analyzing your resume and job description.
          </p>
        )}
      </div>

      {/* Missing Skills */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <XCircle className="h-5 w-5 text-red-600" />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Missing Skills ({missingSkills.length})
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(missingSkills.map(s => s.name).join(', '), 'missing')}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Copy missing skills"
          >
            {copiedSkills.includes('missing') ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        
        <div className="space-y-2">
          {missingSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <span className={`font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
                {skill.name}
              </span>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
                }`}>
                  High priority
                </div>
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          ))}
        </div>
        
        {missingSkills.length === 0 && (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Great! All required skills are present in your resume.
          </p>
        )}
      </div>
    </div>
  );
};