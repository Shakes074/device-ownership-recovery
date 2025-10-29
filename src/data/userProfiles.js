import { userRoutes } from '../users/routes.js';

export const userProfiles = userRoutes.map(
  ({ key, label, summary, actions, accent, path, parent }) => ({
    key,
    role: label,
    summary,
    actions,
    accent,
    path,
    parent: parent ?? null
  })
);
