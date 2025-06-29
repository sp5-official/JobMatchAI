import React from 'react';
import { Lightbulb, Copy, Check, Download } from 'lucide-react';

interface SuggestionsProps {
  suggestions: string[];
  summary: string;
  darkMode: boolean;
  onExport: () => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ 
  suggestions, 
  summary, 
  darkMode, 
  onExport 
}) => {
  const [copiedItems, setCopiedItems] = React.useState<string[]>([]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems([...copiedItems, id]);
    setTimeout(() => {
      setCopiedItems(copiedItems.filter(item => item !== id));
    }, 2000);
  };

  const cardClass = `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`;

  return (
    <div className="space-y-6">
      {/* Improvement Suggestions */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Lightbulb className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Improvement Suggestions
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(suggestions.join('\n\n'), 'all-suggestions')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {copiedItems.includes('all-suggestions') ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">Copy All</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
            } border`}>
              <div className="flex justify-between items-start">
                <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-800'} flex-1 mr-4`}>
                  {suggestion}
                </p>
                <button
                  onClick={() => copyToClipboard(suggestion, `suggestion-${index}`)}
                  className={`p-1 rounded transition-colors duration-200 ${
                    darkMode ? 'hover:bg-yellow-800 text-yellow-400' : 'hover:bg-yellow-200 text-yellow-600'
                  }`}
                >
                  {copiedItems.includes(`suggestion-${index}`) ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {suggestions.length === 0 && (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete the analysis to receive personalized improvement suggestions.
          </p>
        )}
      </div>

      {/* Resume Summary */}
      {summary && (
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Resume Summary Generator
            </h3>
            <button
              onClick={() => copyToClipboard(summary, 'summary')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {copiedItems.includes('summary') ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">Copy</span>
            </button>
          </div>
          
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
          } border`}>
            <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'} leading-relaxed`}>
              {summary}
            </p>
          </div>
          
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 Add this summary to the top of your resume to better align with the job requirements.
          </p>
        </div>
      )}

      {/* Export Button */}
      {suggestions.length > 0 && (
        <button
          onClick={onExport}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-dashed transition-colors duration-200 ${
            darkMode 
              ? 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400' 
              : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
          }`}
        >
          <Download className="h-5 w-5" />
          <span className="font-medium">Export Match Report</span>
        </button>
      )}
    </div>
  );
};