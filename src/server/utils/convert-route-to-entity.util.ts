const mapping: Record<string, string> = {
  companies: 'company',
  goals: 'goal',
  habits: 'habit',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
