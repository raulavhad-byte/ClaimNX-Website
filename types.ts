import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Stakeholder {
  name: string;
  role: string;
  benefits: string[];
  image: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}