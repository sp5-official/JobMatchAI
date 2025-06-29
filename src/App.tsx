import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ScoreMeter } from './components/ScoreMeter';
import { SkillsComparison } from './components/SkillsComparison';
import { Suggestions } from './components/Suggestions';
import { analyzeMatch, exportResults, type AnalysisResult } from './utils/analyzer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAnalyze = async (resume: string, jobDescription: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeMatch(resume, jobDescription);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleExport = () => {
    if (!analysisResult) return;
    
    const reportContent = exportResults(analysisResult);
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobmatch-analysis-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            <InputSection 
              darkMode={darkMode} 
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
          
          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                <ScoreMeter score={analysisResult.score} darkMode={darkMode} />
                <SkillsComparison 
                  matchedSkills={analysisResult.matchedSkills}
                  missingSkills={analysisResult.missingSkills}
                  darkMode={darkMode}
                />
                <Suggestions 
                  suggestions={analysisResult.suggestions}
                  summary={analysisResult.summary}
                  darkMode={darkMode}
                  onExport={handleExport}
                />
              </>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-12 text-center shadow-sm`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <svg className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ready to Analyze
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Upload your resume and job description to get started with AI-powered matching analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Built with Bolt Badge */}
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white hover:from-purple-700 hover:to-blue-700' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400 text-white hover:from-purple-600 hover:to-blue-600'
              } shadow-lg hover:shadow-xl`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
              </svg>
              <span className="text-sm font-semibold">Built with Bolt</span>
            </a>
            
            <div className="text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 JobMatchAI. Empowering careers with AI-driven resume optimization.
              </p>
              <div className="mt-2 flex justify-center space-x-4 text-xs">
                <button className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  Privacy Policy
                </button>
                <button className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  Terms of Service
                </button>
                <button className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;