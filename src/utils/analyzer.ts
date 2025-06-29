// Placeholder AI analysis functions - in production would use actual AI/NLP services

export interface Skill {
  name: string;
  relevance: number;
}

export interface AnalysisResult {
  score: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
  suggestions: string[];
  summary: string;
}

// Common technical skills and keywords
const commonSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'HTML', 'CSS', 'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'MongoDB',
  'PostgreSQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'Agile',
  'Scrum', 'CI/CD', 'DevOps', 'Machine Learning', 'Data Analysis', 'Excel',
  'Project Management', 'Leadership', 'Communication', 'Problem Solving',
  'Team Collaboration', 'Frontend', 'Backend', 'Full Stack', 'Mobile Development',
  'UI/UX', 'Design', 'Testing', 'Quality Assurance', 'Security', 'Blockchain'
];

// Extract skills from text using simple keyword matching
function extractSkills(text: string): Skill[] {
  const skills: Skill[] = [];
  const lowerText = text.toLowerCase();
  
  commonSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    const regex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = text.match(regex);
    
    if (matches) {
      const relevance = Math.min(matches.length * 20, 100);
      skills.push({ name: skill, relevance });
    }
  });
  
  return skills.sort((a, b) => b.relevance - a.relevance);
}

// Calculate compatibility score
function calculateScore(resumeSkills: Skill[], jobSkills: Skill[]): number {
  if (jobSkills.length === 0) return 0;
  
  const jobSkillNames = jobSkills.map(s => s.name.toLowerCase());
  const matchedCount = resumeSkills.filter(skill => 
    jobSkillNames.includes(skill.name.toLowerCase())
  ).length;
  
  const baseScore = (matchedCount / jobSkills.length) * 100;
  
  // Add bonus for high-relevance skills
  const bonusScore = resumeSkills
    .filter(skill => jobSkillNames.includes(skill.name.toLowerCase()))
    .reduce((sum, skill) => sum + (skill.relevance / 100) * 5, 0);
  
  return Math.min(Math.round(baseScore + bonusScore), 100);
}

// Generate improvement suggestions
function generateSuggestions(missingSkills: Skill[], matchedSkills: Skill[]): string[] {
  const suggestions: string[] = [];
  
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3);
    suggestions.push(
      `Consider adding these key skills to your resume: ${topMissing.map(s => s.name).join(', ')}. These are frequently mentioned in the job description.`
    );
  }
  
  if (matchedSkills.length > 0) {
    suggestions.push(
      `Emphasize your experience with ${matchedSkills[0].name} by adding specific examples or projects that demonstrate this skill.`
    );
  }
  
  if (missingSkills.some(s => s.name.toLowerCase().includes('leadership') || s.name.toLowerCase().includes('management'))) {
    suggestions.push(
      "Highlight any leadership experience, team projects, or management responsibilities you've had, even in informal settings."
    );
  }
  
  suggestions.push(
    "Use action verbs and quantifiable achievements in your resume. For example: 'Developed a React application that increased user engagement by 25%'."
  );
  
  suggestions.push(
    "Ensure your resume format is ATS-friendly with clear section headers and standard fonts. Many companies use automated systems to screen resumes."
  );
  
  return suggestions;
}

// Generate resume summary
function generateSummary(matchedSkills: Skill[], jobText: string): string {
  const topSkills = matchedSkills.slice(0, 4).map(s => s.name);
  const jobTitleMatch = jobText.match(/(?:job title|position|role):\s*([^\n\r]+)/i);
  const companyMatch = jobText.match(/(?:company|organization):\s*([^\n\r]+)/i);
  
  const role = jobTitleMatch ? jobTitleMatch[1].trim() : 'Software Developer';
  
  if (topSkills.length === 0) {
    return `Motivated professional seeking to contribute to innovative projects. Experienced in problem-solving and eager to apply technical skills in a dynamic environment. Strong communicator with a passion for continuous learning and growth.`;
  }
  
  return `Results-driven professional with expertise in ${topSkills.slice(0, 3).join(', ')}${topSkills.length > 3 ? ` and ${topSkills[3]}` : ''}. Proven track record of delivering high-quality solutions and collaborating effectively in team environments. Passionate about leveraging technology to solve complex problems and drive business success.`;
}

// Main analysis function
export function analyzeMatch(resumeText: string, jobText: string): AnalysisResult {
  // Simulate processing delay
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobText);
  
  const jobSkillNames = jobSkills.map(s => s.name.toLowerCase());
  const resumeSkillNames = resumeSkills.map(s => s.name.toLowerCase());
  
  const matchedSkills = resumeSkills.filter(skill =>
    jobSkillNames.includes(skill.name.toLowerCase())
  );
  
  const missingSkills = jobSkills.filter(skill =>
    !resumeSkillNames.includes(skill.name.toLowerCase())
  );
  
  const score = calculateScore(resumeSkills, jobSkills);
  const suggestions = generateSuggestions(missingSkills, matchedSkills);
  const summary = generateSummary(matchedSkills, jobText);
  
  return {
    score,
    matchedSkills,
    missingSkills,
    suggestions,
    summary
  };
}

// Export analysis results
export function exportResults(result: AnalysisResult, resumeTitle: string = 'Resume'): string {
  const date = new Date().toLocaleDateString();
  
  return `# JobMatchAI Analysis Report
Generated on: ${date}
Resume: ${resumeTitle}

## Compatibility Score: ${result.score}/100

## Matched Skills (${result.matchedSkills.length})
${result.matchedSkills.map(skill => `• ${skill.name} (${skill.relevance}% relevance)`).join('\n')}

## Missing Skills (${result.missingSkills.length})
${result.missingSkills.map(skill => `• ${skill.name}`).join('\n')}

## Improvement Suggestions
${result.suggestions.map((suggestion, index) => `${index + 1}. ${suggestion}`).join('\n\n')}

## Recommended Resume Summary
${result.summary}

---
Generated by JobMatchAI - AI-Powered Resume Optimization Tool`;
}