import Markdown from "react-markdown";
import { CheckCircle, AlertTriangle, Award, KeyRound } from "lucide-react";

// Score ring with dynamic color
function ScoreRing({ score }) {
  const color = score >= 85
    ? "#22c55e"
    : score >= 70
    ? "#facc15"
    : score >= 50
    ? "#f59e42"
    : "#ef4444";

  const circleRadius = 36, stroke = 7, normalized = 2 * Math.PI * circleRadius;
  const offset = normalized - (score / 100) * normalized;

  return (
    <svg width="90" height="90" className="block">
      <circle
        cx="45"
        cy="45"
        r={circleRadius}
        fill="#fff"
        stroke="#f3f4f6"
        strokeWidth={stroke}
      />
      <circle
        cx="45"
        cy="45"
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={normalized}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s" }}
      />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="font-extrabold fill-gray-800 text-xl"
        style={{ fontSize: "2rem" }}
      >
        {score}
      </text>
    </svg>
  );
}

function extractResumeAnalysis(analysis) {
  if (!analysis) return null;
  
  try {
    // Remove wrapping code blocks (```json or ```)
    let cleaned = analysis.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```$/, '');
    cleaned = cleaned.trim();
    
    // Try direct parse first
    try {
      return JSON.parse(cleaned);
    } catch (firstError) {
      console.warn("Direct JSON parse failed, attempting unescape:", firstError.message);
      
      // Try unescaping common escape sequences
      cleaned = cleaned
        .replace(/\\\\/g, '\\')  // Handle double backslashes first
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r');
      
      return JSON.parse(cleaned);
    }
  } catch (err) {
    console.error("Resume analysis parse error:", err.message);
    console.error("Failed content:", analysis?.substring(0, 200)); // Log first 200 chars
    return null;
  }
}

const Card = ({ icon, title, children, className }) => (
  <div className={`rounded-2xl bg-white shadow p-6 border border-gray-200 ${className||""}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-lg md:text-xl font-bold text-gray-800">{title}</span>
    </div>
    <div className="text-base text-gray-700">{children}</div>
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm shadow-sm border border-blue-200">
    {children}
  </span>
);

const ResumeAnalysisDisplay = ({ analysis }) => {
  const parsed = extractResumeAnalysis(analysis);

  if (!parsed) {
    // fallback to Markdown if parsing fails
    return (
      <div className="prose prose-lg max-w-none">
        <div className="reset-tw bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 shadow">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            <Markdown>{analysis}</Markdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-12">
      {/* Main left column */}
      <div className="md:col-span-8 flex flex-col gap-7">

        {/* Score and Summary */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div>
            <ScoreRing score={parsed.overall_score || 0}/>
            <div className="text-sm text-center mt-1 text-gray-500 font-medium">Score</div>
          </div>
          <div className="flex-1 min-w-0">
            <Card
              icon={<Award className="w-6 h-6 text-yellow-500" />}
              title="Overall Assessment"
              className="bg-gradient-to-tr from-yellow-50/70 to-white"
            >
              <div className="mb-1 text-sm font-medium text-gray-600">Summary:</div>
              <div>{parsed.summary}</div>
            </Card>
          </div>
        </div>

        {/* Structure & Formatting */}
        <Card
          icon={<span className="w-5 h-5 bg-blue-400 rounded-full inline-block mr-1" />}
          title="Structure & Formatting"
        >
          {parsed.structure_feedback}
        </Card>

        {/* Content Quality */}
        <Card
          icon={<span className="w-5 h-5 bg-purple-400 rounded-full inline-block mr-1" />}
          title="Content Quality"
        >
          {parsed.content_feedback}
        </Card>

        {/* ATS Recommendations */}
        <Card
          icon={<KeyRound className="w-5 h-5 text-pink-500" />}
          title="ATS Optimization"
        >
          {parsed.ats_recommendations}
        </Card>

        {/* Language & Grammar */}
        <Card
          icon={<span className="w-5 h-5 bg-orange-400 rounded-full inline-block mr-1" />}
          title="Language & Grammar"
        >
          {parsed.grammar_issues}
        </Card>
      </div>

      {/* Side column for actionable items */}
      <div className="md:col-span-4 flex flex-col gap-7">
        {/* Recommendations */}
        {Array.isArray(parsed.specific_improvements) && parsed.specific_improvements.length > 0 && (
          <Card
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            title="Actions & Improvements"
            className="bg-green-50"
          >
            <ul className="list-none pl-0 space-y-4">
              {parsed.specific_improvements.map((imp, idx) =>
                <li key={idx} className="bg-white p-3 rounded shadow-sm border border-green-100 flex gap-2">
                  <span className="text-green-600 font-bold">#{imp.priority || (idx+1)}</span>
                  <span>{imp.description}</span>
                </li>
              )}
            </ul>
          </Card>
        )}

        {/* Red Flags */}
        {Array.isArray(parsed.red_flags) && parsed.red_flags.length > 0 && (
          <Card
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            title="Possible Red Flags"
            className="bg-red-50"
          >
            <ul className="list-none pl-0 space-y-3">
              {parsed.red_flags.map((rf, idx) =>
                <li key={idx} className="p-2 rounded bg-red-100/80 text-red-800">{rf}</li>
              )}
            </ul>
          </Card>
        )}

        {/* Keywords */}
        {Array.isArray(parsed.keywords_to_add) && parsed.keywords_to_add.length > 0 && (
          <Card
            icon={<KeyRound className="w-5 h-5 text-blue-500" />}
            title="Important Keywords"
            className="bg-blue-50"
          >
            <div className="flex flex-wrap gap-2">
              {parsed.keywords_to_add.map((kw, idx) => (
                <Pill key={idx}>{kw}</Pill>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysisDisplay;
