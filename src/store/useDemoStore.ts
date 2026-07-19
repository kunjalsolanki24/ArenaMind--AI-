import { create } from 'zustand';

export type DemoStage = 'initial' | 'crowd_building' | 'heatmap_orange' | 'ai_predicts' | 'ai_recommends' | 'organizer_accepts' | 'routes_updated' | 'volunteers_notified' | 'medical_incident' | 'ai_emergency_response' | 'match_ends' | 'report_generated';

interface DemoState {
  stage: DemoStage;
  setStage: (stage: DemoStage) => void;
  nextStage: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const stages: DemoStage[] = [
  'initial', 'crowd_building', 'heatmap_orange', 'ai_predicts', 'ai_recommends', 'organizer_accepts', 'routes_updated', 'volunteers_notified', 'medical_incident', 'ai_emergency_response', 'match_ends', 'report_generated'
];

export const useDemoStore = create<DemoState>((set, get) => ({
  stage: 'initial',
  language: 'en',
  setStage: (stage) => set({ stage }),
  nextStage: () => {
    const currentIdx = stages.indexOf(get().stage);
    if (currentIdx < stages.length - 1) {
      set({ stage: stages[currentIdx + 1] });
    }
  },
  setLanguage: (language) => set({ language })
}));
