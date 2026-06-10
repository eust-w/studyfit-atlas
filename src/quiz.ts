export const countryIds = [
  "canada",
  "uk",
  "usa",
  "germany",
  "australia",
  "netherlands"
] as const;

export type CountryId = (typeof countryIds)[number];

export type ScoreMap = Record<CountryId, number>;

export interface CountryProfile {
  id: CountryId;
  country: string;
  flag: string;
  headline: string;
  vibe: string;
  traits: string[];
  reasons: string[];
  campusHint: string;
}

export interface AnswerOption {
  id: string;
  label: string;
  detail: string;
  weights: Partial<ScoreMap>;
}

export interface Question {
  id: string;
  prompt: string;
  kicker: string;
  options: AnswerOption[];
}

export interface RankedDestination {
  profile: CountryProfile;
  score: number;
}

export interface QuizResult extends RankedDestination {
  scores: ScoreMap;
  matchPercent: number;
  reasons: string[];
  runnerUp?: RankedDestination;
}

export type AnswerMap = Record<string, string>;

const emptyScores = (): ScoreMap => ({
  canada: 0,
  uk: 0,
  usa: 0,
  germany: 0,
  australia: 0,
  netherlands: 0
});

export const countryProfiles: CountryProfile[] = [
  {
    id: "canada",
    country: "加拿大",
    flag: "CA",
    headline: "稳定型成长派",
    vibe: "重视安全感、合作氛围和长期生活质量。",
    traits: ["包容", "稳健", "协作", "长期规划"],
    reasons: ["你更适合包容度高、节奏稳定、支持系统完善的学习环境。"],
    campusHint: "适合关注综合大学、带实习路径的项目和移民友好城市。"
  },
  {
    id: "uk",
    country: "英国",
    flag: "UK",
    headline: "学术辩论派",
    vibe: "喜欢传统学院感、深度阅读和高密度学习节奏。",
    traits: ["专注", "表达", "人文", "效率"],
    reasons: ["你适合课程周期紧凑、重视写作表达和学术讨论的环境。"],
    campusHint: "适合关注一年制硕士、学院制体验和强专业排名学校。"
  },
  {
    id: "usa",
    country: "美国",
    flag: "US",
    headline: "探索创业派",
    vibe: "目标感强，也希望有足够自由去试错、换方向和做项目。",
    traits: ["野心", "弹性", "资源", "创业"],
    reasons: ["你适合选择丰富、社团项目多、允许跨学科探索的校园。"],
    campusHint: "适合关注 liberal arts、research university 和创业生态。"
  },
  {
    id: "germany",
    country: "德国",
    flag: "DE",
    headline: "结构实践派",
    vibe: "偏好清晰规则、硬核训练、独立生活和高性价比。",
    traits: ["结构", "工程", "独立", "性价比"],
    reasons: ["你的选择更偏结构化、实践导向和可验证的学习路径。"],
    campusHint: "适合关注 TU、应用科学大学和英语授课工科项目。"
  },
  {
    id: "australia",
    country: "澳大利亚",
    flag: "AU",
    headline: "阳光应用派",
    vibe: "喜欢开放社交、户外生活和更贴近真实职业场景的学习。",
    traits: ["开放", "应用", "社交", "生活方式"],
    reasons: ["你适合课堂与实习结合、生活节奏友好、气候轻松的环境。"],
    campusHint: "适合关注实践型课程、城市生活质量和毕业工签路径。"
  },
  {
    id: "netherlands",
    country: "荷兰",
    flag: "NL",
    headline: "国际直球派",
    vibe: "喜欢直接沟通、跨文化小组、设计思维和社会议题。",
    traits: ["直接", "国际化", "设计", "社会影响"],
    reasons: ["你适合开放讨论、英文项目多、重视独立判断的课堂。"],
    campusHint: "适合关注 research university、UAS 和设计/商科/社会科学项目。"
  }
];

export const questions: Question[] = [
  {
    id: "classroom",
    kicker: "课堂偏好",
    prompt: "你最想要哪一种课堂氛围？",
    options: [
      {
        id: "debate",
        label: "密集阅读后当场辩论",
        detail: "观点要清楚，老师会追问你为什么。",
        weights: { uk: 3, netherlands: 1, usa: 1 }
      },
      {
        id: "open",
        label: "自由选课和跨学科探索",
        detail: "先试试看，再逐步收敛方向。",
        weights: { usa: 3, canada: 1, australia: 1 }
      },
      {
        id: "systems",
        label: "结构清晰、训练扎实",
        detail: "课程路径明确，评价标准可预期。",
        weights: { germany: 3, canada: 1 }
      }
    ]
  },
  {
    id: "pace",
    kicker: "学习节奏",
    prompt: "你对学习节奏的理想状态是？",
    options: [
      {
        id: "fast",
        label: "短周期高强度，快速拿结果",
        detail: "适应集中火力，把压力转成产出。",
        weights: { uk: 3, usa: 1 }
      },
      {
        id: "steady",
        label: "稳扎稳打，每一步都有依据",
        detail: "不喜欢过度漂移，想把基础打牢。",
        weights: { germany: 3, canada: 2 }
      },
      {
        id: "balanced",
        label: "学习和生活都要留空间",
        detail: "成绩重要，但不能牺牲生活质量。",
        weights: { australia: 3, canada: 2, netherlands: 1 }
      }
    ]
  },
  {
    id: "campus",
    kicker: "校园生态",
    prompt: "哪种校园最让你有动力？",
    options: [
      {
        id: "resource",
        label: "资源极多，机会靠自己抢",
        detail: "研究、社团、创业、竞赛都很丰富。",
        weights: { usa: 3, uk: 1 }
      },
      {
        id: "community",
        label: "支持系统完善，社区感强",
        detail: "希望有人帮你更快适应新环境。",
        weights: { canada: 3, australia: 1 }
      },
      {
        id: "focused",
        label: "目标明确，少一点花活",
        detail: "更重视课程质量和就业路径本身。",
        weights: { germany: 3, netherlands: 1 }
      }
    ]
  },
  {
    id: "communication",
    kicker: "沟通风格",
    prompt: "你更舒服的沟通方式是？",
    options: [
      {
        id: "direct",
        label: "直接讲重点，少绕弯",
        detail: "明确反馈比客套更有帮助。",
        weights: { netherlands: 3, germany: 3 }
      },
      {
        id: "polished",
        label: "表达讲究逻辑和分寸",
        detail: "喜欢有修辞、有论证的表达方式。",
        weights: { uk: 3, canada: 1 }
      },
      {
        id: "energetic",
        label: "热情互动，边聊边推进",
        detail: "你会从人际连接里获得能量。",
        weights: { usa: 2, australia: 3 }
      }
    ]
  },
  {
    id: "budget",
    kicker: "成本意识",
    prompt: "面对留学成本，你最在意什么？",
    options: [
      {
        id: "value",
        label: "高性价比和可控支出",
        detail: "预算明确，回报路径也要清楚。",
        weights: { germany: 3, netherlands: 2, canada: 1 }
      },
      {
        id: "brand",
        label: "品牌、校友和资源溢价",
        detail: "愿意为平台和机会投入更多。",
        weights: { usa: 3, uk: 2 }
      },
      {
        id: "workpath",
        label: "读书期间和毕业后的工作路径",
        detail: "希望学习和就业能自然衔接。",
        weights: { canada: 3, australia: 2, germany: 1 }
      }
    ]
  },
  {
    id: "risk",
    kicker: "决策方式",
    prompt: "你做重大选择时更像哪一种？",
    options: [
      {
        id: "planned",
        label: "先建表、查政策、算概率",
        detail: "信息越完整，你越能安心行动。",
        weights: { germany: 3, canada: 2 }
      },
      {
        id: "bold",
        label: "看到机会就先冲，再迭代",
        detail: "你愿意用行动换反馈。",
        weights: { usa: 3, australia: 1 }
      },
      {
        id: "collective",
        label: "多问几类人，再综合判断",
        detail: "你重视不同视角和真实经验。",
        weights: { netherlands: 2, canada: 2, uk: 1 }
      }
    ]
  },
  {
    id: "subject",
    kicker: "专业气质",
    prompt: "哪类方向最像你的主场？",
    options: [
      {
        id: "engineering",
        label: "工程、制造、数据或硬科技",
        detail: "你喜欢能落地、能验证的能力。",
        weights: { germany: 3, usa: 2, netherlands: 1 }
      },
      {
        id: "humanities",
        label: "人文、法律、传媒或公共政策",
        detail: "你喜欢研究人、制度和叙事。",
        weights: { uk: 3, canada: 1, netherlands: 1 }
      },
      {
        id: "business",
        label: "商业、产品、设计或创业",
        detail: "你关心市场、用户和影响力。",
        weights: { usa: 3, australia: 1, netherlands: 2 }
      }
    ]
  },
  {
    id: "lifestyle",
    kicker: "生活方式",
    prompt: "留学生活里，你最希望保留什么？",
    options: [
      {
        id: "independent",
        label: "高度独立，自己安排一切",
        detail: "你享受自己解决问题的掌控感。",
        weights: { germany: 3, netherlands: 2 }
      },
      {
        id: "social",
        label: "朋友、社群和户外活动",
        detail: "好天气和高频社交会显著提升状态。",
        weights: { australia: 3, usa: 1, canada: 1 }
      },
      {
        id: "settled",
        label: "稳定、安全、慢慢扎根",
        detail: "你更在意长期生活的确定性。",
        weights: { canada: 3, uk: 1 }
      }
    ]
  }
];

export function getQuestionById(questionId: string) {
  return questions.find((question) => question.id === questionId);
}

export function scoreAnswers(answers: AnswerMap): ScoreMap {
  const scores = emptyScores();

  for (const [questionId, optionId] of Object.entries(answers)) {
    const option = getQuestionById(questionId)?.options.find(
      (candidate) => candidate.id === optionId
    );

    if (!option) {
      continue;
    }

    for (const countryId of countryIds) {
      scores[countryId] += option.weights[countryId] ?? 0;
    }
  }

  return scores;
}

export function rankDestinations(answers: AnswerMap): RankedDestination[] {
  const scores = scoreAnswers(answers);

  return countryProfiles
    .map((profile, index) => ({ profile, score: scores[profile.id], index }))
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ profile, score }) => ({ profile, score }));
}

export function calculateResult(answers: AnswerMap): QuizResult {
  const scores = scoreAnswers(answers);
  const ranked = rankDestinations(answers);
  const winner = ranked[0];
  const maxPossible = Object.entries(answers).reduce((total, [questionId]) => {
    const question = getQuestionById(questionId);
    if (!question) {
      return total;
    }

    return (
      total +
      Math.max(
        ...question.options.map((option) =>
          Math.max(...countryIds.map((countryId) => option.weights[countryId] ?? 0))
        )
      )
    );
  }, 0);

  return {
    ...winner,
    scores,
    matchPercent: maxPossible === 0 ? 0 : Math.round((winner.score / maxPossible) * 100),
    reasons: winner.profile.reasons,
    runnerUp: ranked[1]
  };
}
