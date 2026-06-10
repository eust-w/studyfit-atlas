import { ArrowRight, Compass, Globe2, MapPinned, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import "./App.css";
import { calculateResult, countryProfiles, questions, type AnswerMap } from "./quiz";

export default function App() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const result = useMemo(
    () => (isComplete ? calculateResult(answers) : undefined),
    [answers, isComplete]
  );

  const handleAnswer = (optionId: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);

    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const restart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return (
    <main className="app-shell">
      <section className="quiz-layout" aria-label="StudyFit Atlas quiz">
        <aside className="atlas-panel">
          <div className="brand-mark" aria-hidden="true">
            <Compass size={28} strokeWidth={2.2} />
          </div>
          <p className="eyebrow">MBTI-like study abroad game</p>
          <h1>StudyFit Atlas</h1>
          <p className="intro">
            用 8 个选择测一测你的性格和学习偏好，更像适合去哪个国家读大学。
          </p>

          <DestinationMap activeId={result?.profile.id} />

          <div className="country-strip" aria-label="可匹配国家">
            {countryProfiles.map((profile) => (
              <span
                className={profile.id === result?.profile.id ? "country-pill active" : "country-pill"}
                key={profile.id}
              >
                {profile.flag}
              </span>
            ))}
          </div>
        </aside>

        <section className="quiz-panel">
          {result ? (
            <ResultView answers={answers} onRestart={restart} />
          ) : (
            <QuestionView
              currentIndex={currentIndex}
              onAnswer={handleAnswer}
              progress={progress}
            />
          )}
        </section>
      </section>
    </main>
  );
}

interface QuestionViewProps {
  currentIndex: number;
  progress: number;
  onAnswer: (optionId: string) => void;
}

function QuestionView({ currentIndex, progress, onAnswer }: QuestionViewProps) {
  const question = questions[currentIndex];

  return (
    <div className="question-flow">
      <div className="progress-row">
        <span>
          第 {currentIndex + 1} 题 / {questions.length}
        </span>
        <strong>{progress}%</strong>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${Math.max(progress, 8)}%` }} />
      </div>

      <p className="question-kicker">{question.kicker}</p>
      <h2>{question.prompt}</h2>

      <div className="option-grid">
        {question.options.map((option) => (
          <button
            aria-label={option.label}
            className="option-button"
            key={option.id}
            onClick={() => onAnswer(option.id)}
            type="button"
          >
            <span>
              <strong>{option.label}</strong>
              <small>{option.detail}</small>
            </span>
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ResultViewProps {
  answers: AnswerMap;
  onRestart: () => void;
}

function ResultView({ answers, onRestart }: ResultViewProps) {
  const result = calculateResult(answers);
  const orderedScores = Object.entries(result.scores)
    .map(([countryId, score]) => ({
      profile: countryProfiles.find((profile) => profile.id === countryId)!,
      score
    }))
    .sort((left, right) => right.score - left.score);
  const topScore = Math.max(...orderedScores.map((entry) => entry.score), 1);

  return (
    <div className="result-flow">
      <p className="question-kicker">你的留学适配国家</p>
      <div className="result-header">
        <div>
          <h2>{result.profile.country}</h2>
          <p>{result.profile.headline}</p>
        </div>
        <div className="match-badge">
          <Sparkles aria-hidden="true" size={18} />
          <span>{result.matchPercent}%</span>
        </div>
      </div>

      <p className="result-vibe">{result.profile.vibe}</p>

      <div className="trait-list" aria-label="匹配特质">
        {result.profile.traits.map((trait) => (
          <span key={trait}>{trait}</span>
        ))}
      </div>

      <div className="reason-box">
        <MapPinned aria-hidden="true" size={22} />
        <div>
          <strong>为什么像你</strong>
          <p>{result.reasons[0]}</p>
          <p>{result.profile.campusHint}</p>
        </div>
      </div>

      <div className="score-board">
        {orderedScores.map(({ profile, score }) => (
          <div className="score-row" key={profile.id}>
            <span>{profile.country}</span>
            <div className="score-bar" aria-hidden="true">
              <span style={{ width: `${Math.round((score / topScore) * 100)}%` }} />
            </div>
            <strong>{score}</strong>
          </div>
        ))}
      </div>

      <button className="restart-button" onClick={onRestart} type="button">
        <RotateCcw aria-hidden="true" size={18} />
        重新测试
      </button>

      <p className="disclaimer">结果用于自我探索和选校灵感，不替代正式升学规划。</p>
    </div>
  );
}

function DestinationMap({ activeId }: { activeId?: string }) {
  return (
    <div className="map-visual" aria-hidden="true">
      <Globe2 className="map-icon" size={24} />
      <svg viewBox="0 0 360 220" role="img">
        <path
          className="land land-one"
          d="M54 85c19-36 67-47 101-24 25 17 28 45 10 66-25 28-83 31-108 9-14-12-13-32-3-51Z"
        />
        <path
          className="land land-two"
          d="M185 57c45-27 105-10 122 38 12 34-8 72-43 82-47 13-92-22-89-67 1-22 3-42 10-53Z"
        />
        <path className="route" d="M83 117 C141 61, 216 63, 286 118" />
        {countryProfiles.map((profile, index) => {
          const points = [
            [70, 111],
            [174, 74],
            [109, 95],
            [210, 99],
            [287, 137],
            [231, 78]
          ];
          const [cx, cy] = points[index];

          return (
            <g className={profile.id === activeId ? "map-point active" : "map-point"} key={profile.id}>
              <circle cx={cx} cy={cy} r="10" />
              <text x={cx} y={cy + 4}>
                {profile.flag}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
