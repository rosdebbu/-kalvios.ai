import { 
  Wallet, BookOpen, Target, Brain, TrendingUp, Trophy, 
  Microscope, Briefcase, GraduationCap, Network, FileBadge, Medal,
  School, Building2, PenTool, Landmark
} from 'lucide-react';
import { LifeArea, Testimonial, FaqItem, ProblemItem, StudentType, PricingPlan } from './types';

export const STUDENT_TYPES: StudentType[] = [
  {
    id: 'school',
    title: 'School Students',
    description: 'Class 9-12 & Board Exams',
    features: ['Board Prep', 'Subject Organization', 'Daily Schedule'],
    icon: School,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'college',
    title: 'College Students',
    description: 'Engineering, Arts, Science, Commerce',
    features: ['Semester Mgmt', 'Assignments', 'CGPA Tracking'],
    icon: Building2,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'competitive',
    title: 'Competitive Exams',
    description: 'JEE, NEET, GATE, CAT, etc.',
    features: ['Mock Tests', 'Weak Area Fix', 'Score Prediction'],
    icon: PenTool,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'govt',
    title: 'Govt. Exams',
    description: 'UPSC, SSC, Banking, Railways',
    features: ['Syllabus Tracker', 'Current Affairs', 'Revision'],
    icon: Landmark,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'jobs',
    title: 'Job Seekers',
    description: 'Internships & Placements',
    features: ['Resume Builder', 'Application Tracker', 'Interview Prep'],
    icon: Briefcase,
    color: 'bg-pink-100 text-pink-600'
  }
];

export const LIFE_AREAS: LifeArea[] = [
  {
    id: 'money',
    title: 'Money & Financial Growth',
    items: ['Track income & expenses', 'Create smart budgets', 'Set savings goals', 'Learn investing basics'],
    icon: Wallet,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'academics',
    title: 'Academics & Education',
    items: ['Organize subjects & notes', 'Save video lectures', 'Track topic progress', 'Access PYQs'],
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'career',
    title: 'Career & Future',
    items: ['Build career roadmaps', 'Create ATS resumes', 'Prepare for interviews', 'Salary negotiation'],
    icon: Target,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'growth',
    title: 'Personal Growth',
    items: ['Build good habits', 'Improve productivity', 'Manage exam stress', 'Daily reflection'],
    icon: Brain,
    color: 'bg-rose-100 text-rose-600'
  },
  {
    id: 'insights',
    title: 'Insights & Self-Understanding',
    items: ['Understand study patterns', 'Identify peak hours', 'Analyze spending', 'Health & sleep tracking'],
    icon: TrendingUp,
    color: 'bg-violet-100 text-violet-600'
  },
  {
    id: 'hackathons',
    title: 'Competitions & Hackathons',
    items: ['Find hackathons', 'Get project ideas', 'Find team members', 'Track deadlines'],
    icon: Trophy,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'research',
    title: 'Research & Projects',
    items: ['Find research programs', 'Write research papers', 'Literature review', 'Cold email professors'],
    icon: Microscope,
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    id: 'jobs',
    title: 'Internships & Jobs',
    items: ['Find internships', 'Track applications', 'Get deadline alerts', 'Find referrals'],
    icon: Briefcase,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'higher-ed',
    title: 'Higher Education',
    items: ['University finder', 'SOP generator', 'Scholarship search', 'Study abroad guidance'],
    icon: GraduationCap,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'network',
    title: 'Network & Community',
    items: ['Find mentors', 'Join communities', 'Attend tech events', 'Build LinkedIn profile'],
    icon: Network,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'courses',
    title: 'Certifications & Courses',
    items: ['Find best courses', 'Create learning paths', 'Track completion', 'Skill verification'],
    icon: FileBadge,
    color: 'bg-lime-100 text-lime-600'
  },
  {
    id: 'portfolio',
    title: 'Portfolio & Achievements',
    items: ['Track achievements', 'Auto-build portfolio', 'Showcase projects', 'Optimize GitHub'],
    icon: Medal,
    color: 'bg-amber-100 text-amber-600'
  }
];

export const PROBLEMS: ProblemItem[] = [
  { title: "Lost Files", description: "\"I have notes everywhere but can't find anything when I need it.\"", emoji: "📂" },
  { title: "No Direction", description: "\"I don't know which topics I'm weak in or what to study next.\"", emoji: "🤷" },
  { title: "Stagnant", description: "\"I study hard but my marks aren't improving.\"", emoji: "📉" },
  { title: "Missed Out", description: "\"I forgot to apply for that internship/contest again.\"", emoji: "📅" },
  { title: "Overwhelmed", description: "\"JEE/NEET/UPSC syllabus feels impossible to finish.\"", emoji: "😫" },
  { title: "Future Anxiety", description: "\"I feel lost about my career and future path.\"", emoji: "😰" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ananya R.",
    type: "School Student (Class 12)",
    achievement: "Organized Board Prep",
    quote: "I was drowning in notes and PDFs. Kalvi organized everything by subject and chapter. Now I spend time studying, not searching.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    type: "JEE Aspirant",
    achievement: "Improved Physics Score",
    quote: "The AI noticed I was weak in Rotational Mechanics and automatically added practice questions to my schedule. My physics score went up by 30%.",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    type: "College Student (CSE)",
    achievement: "Landed Internship",
    quote: "Kalvi didn't just tell me to apply. It found 5 internships matching my GitHub profile and reminded me to apply. I got into a startup!",
  },
  {
    id: 4,
    name: "Karthik M.",
    type: "UPSC Aspirant",
    achievement: "Consistent Revision",
    quote: "Managing Current Affairs + History was a nightmare. Kalvi's revision planner ensures I don't forget what I studied 2 months ago.",
  },
  {
    id: 5,
    name: "Priya D.",
    type: "Job Seeker",
    achievement: "Resume Shortlisted",
    quote: "I used the Resume Builder for 10 different job applications. The AI tailored my resume for each role, and I finally started getting calls.",
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What is Kalvi AI?",
    answer: "Kalvi AI is an agentic self-improvement platform. Unlike simple chatbots, it actively organizes your student life, tracks your progress, identifies weak areas, and performs tasks to help you improve in academics, career, and personal growth."
  },
  {
    question: "Which exams and courses does it support?",
    answer: "We support almost everything! School Boards (CBSE, ICSE), Competitive Exams (JEE, NEET, CAT, GATE), Govt Exams (UPSC, SSC, Banking), and College Degrees (Engineering, Arts, Science, Commerce). You upload your syllabus, and Kalvi adapts to it."
  },
  {
    question: "How do I upload my study materials?",
    answer: "You can upload PDF notes, images of handwritten notes, paste YouTube video links, or add website URLs. Kalvi's AI analyzes them, categorizes them by subject/topic, and makes them searchable."
  },
  {
    question: "Is my data private and secure?",
    answer: "Yes, 100%. Your notes, financial data, and personal goals are encrypted. We do not sell your data to advertisers. It is used solely to provide you with personalized improvement insights."
  },
  {
    question: "How is this different from other study apps?",
    answer: "Most apps just provide content (videos/tests). Kalvi AI manages your *entire* life. It connects your study plan with your calendar, your weak areas with resources, and your career goals with your daily habits."
  },
  {
    question: "Is it really free?",
    answer: "Yes! You can start improving for free. We believe every student deserves a personal AI companion to help them succeed."
  },
  {
    question: "Can I use it on my phone?",
    answer: "Absolutely. Kalvi AI is fully responsive and works perfectly on mobile browsers, so you can track your progress and access notes anywhere."
  }
];

export const PRICING: PricingPlan[] = [
  {
    name: "Free Tier",
    price: "₹0",
    period: "month",
    description: "For students just starting their organization journey.",
    features: [
      "3 Subjects limit",
      "Basic Schedule Generation",
      "Manual Progress Tracking",
      "Access to Community",
      "50MB Storage"
    ],
    buttonText: "Start for Free",
    isPopular: false
  },
  {
    name: "Pro Scholar",
    price: "₹199",
    period: "month",
    description: "The complete toolkit for academic and personal success.",
    features: [
      "Unlimited Subjects",
      "AI Weakness Detection",
      "Exam Score Prediction",
      "Career & Resume Builder",
      "Financial Tracker",
      "10GB Storage"
    ],
    buttonText: "Go Pro",
    isPopular: true
  },
  {
    name: "Institution",
    price: "Custom",
    period: "year",
    description: "For schools and coaching centers managing students.",
    features: [
      "Admin Dashboard",
      "Student Performance Analytics",
      "Bulk Onboarding",
      "Custom Branding",
      "API Access",
      "Dedicated Support"
    ],
    buttonText: "Contact Sales",
    isPopular: false
  }
];