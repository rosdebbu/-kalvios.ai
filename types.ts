import { LucideIcon } from 'lucide-react';

export interface LifeArea {
  id: string;
  title: string;
  items: string[];
  icon: LucideIcon;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  type: string;
  achievement: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProblemItem {
  title: string;
  description: string;
  emoji: string;
}

export interface StudentType {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  color: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}