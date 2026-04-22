import type { Band } from '../types';

export const BANDS: Band[] = [
  {
    min: 19, max: 27,
    label: 'High Agility',
    color: 'green',
    desc: 'Migration is feasible with manageable coordination overhead. Architectural barriers are not the primary constraint. Time-to-Migrate is determined mainly by deployment logistics and ecosystem adoption, not structural limitations.',
  },
  {
    min: 10, max: 18,
    label: 'Moderate Agility',
    color: 'amber',
    desc: 'Migration is feasible but requires significant effort. One or more dimensions represent meaningful bottlenecks. Low-scoring dimensions are the primary engineering targets and must be addressed before any migration attempt.',
  },
  {
    min: 0, max: 9,
    label: 'Critical Constraint',
    color: 'red',
    desc: 'Structural barriers to migration exist. Time-to-Migrate is driven by architectural limitations that cannot be resolved through operational improvement alone. Design-level intervention is required before migration is viable.',
  },
];
