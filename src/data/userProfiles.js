import { userRoutes } from '../users/routes.js';

export const userProfiles = userRoutes.map(({ key, config }) => ({
  key,
  role: config.label,
  summary: config.summary,
  actions: config.actions,
  accent: config.accent,
  path: config.path,
  parent: config.parent ?? null,
  marketingCta: config.marketingCta ?? null,
  isPrivate: Boolean(config.isPrivate)
}));
