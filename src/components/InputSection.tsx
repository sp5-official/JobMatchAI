import React, { useState } from 'react';
import { Upload, FileText, Briefcase, Loader2 } from 'lucide-react';

interface InputSectionProps {
  darkMode: boolean;
  onAnalyze: (resume: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ darkMode, onAnalyze, isAnalyzing }) => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      // Placeholder for file reading - in real app would parse PDF/DOCX
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = () => {
    if (resume.trim() && jobDescription.trim()) {
      onAnalyze(resume, jobDescription);
    }
  };

  const cardClass = `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`;
  const inputClass = `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`;

  return (
    <div className="space-y-6">
      {/* Resume Input */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-4">
          <FileText className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Resume
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="resume-upload" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors duration-200 ${
                darkMode 
                  ? 'border-gray-600 hover:border-blue-500 text-gray-400 hover:text-blue-400' 
                  : 'border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Resume (PDF, TXT, DOCX)</span>
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          {resumeFile && (
            <div className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              ✓ {resumeFile.name} uploaded
            </div>
          )}
          
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume content here or upload a file above..."
            className={`${inputClass} min-h-[200px] resize-none`}
          />
        </div>
      </div>

      {/* Job Description Input */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-4">
          <Briefcase className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Job Description
          </h2>
        </div>
        
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description you're applying for..."
          className={`${inputClass} min-h-[200px] resize-none`}
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={!resume.trim() || !jobDescription.trim() || isAnalyzing}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
          !resume.trim() || !jobDescription.trim() || isAnalyzing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
        }`}
      >
        {isAnalyzing ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Analyzing...</span>
          </div>
        ) : (
          'Analyze Match'
        )}
      </button>
    </div>
  );
};