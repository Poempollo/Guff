export type PlanLevel = 'free' | 'intermediate' | 'premium';

const planOrder = {
  free: 1,
  intermediate: 2,
  premium: 3,
};

export const hasAccess = (userPlan: PlanLevel, required: PlanLevel) => {
  return planOrder[userPlan] >= planOrder[required];
};
