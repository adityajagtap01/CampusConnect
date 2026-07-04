export const myprompt = (data, prompt) => {
  if (!data || data.length === 0) {
    return `
You are a placement/career advisor for engineering students. A student asked:
"${prompt}"

There is no historical placement data available for this specific company yet. Give the student honest, practical guidance anyway, based on general industry expectations for tech roles. Be specific and actionable, not generic filler. Keep it under 200 words.
        `;
  }

  const average = (key, parser) => {
    const values = data.map(entry => parser(entry[key])).filter(v => !isNaN(v));
    if (values.length === 0) return null;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const leetcodeAvg = average('leetcode', parseInt);
  const codechefAvg = average('codechef', parseInt);
  const codeforceAvg = average('codeforce', parseInt);
  const cgpaAvg = average('cgpa', parseFloat);
  const internshipRate = data.filter(d => d.internship && d.internship.toLowerCase() === 'yes').length / data.length;
  const sampleProjects = data.map(d => d.projects).filter(Boolean).slice(0, 5).join('; ');

  const fmt = (val) => (val === null ? 'not available' : val.toFixed(0));

  return `
You are a placement/career advisor for engineering students preparing for interviews at a specific company.

Here is real historical data on ${data.length} students who were previously placed at this company:
- Average LeetCode rating: ${fmt(leetcodeAvg)}
- Average CodeChef rating: ${fmt(codechefAvg)}
- Average Codeforces rating: ${fmt(codeforceAvg)}
- Average CGPA: ${fmt(cgpaAvg)}
- Percentage who had an internship: ${(internshipRate * 100).toFixed(0)}%
- Example projects past candidates built: ${sampleProjects || 'not available'}

The student asked: "${prompt}"

Using the data above, give the student a specific, honest, personalized assessment of how they compare and what to prioritize. Reference the actual numbers where relevant. Avoid generic advice like "practice hard" without tying it to the specific data. Keep the response under 250 words, in a direct and encouraging tone.
    `;
};