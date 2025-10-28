export const userProfiles = [
  {
    role: 'Device Owners',
    summary:
      'Register devices, submit recovery requests, and track progress in real time with secure notifications.',
    actions: [
      'Verify ownership through serial numbers and purchase records',
      'Flag lost or stolen devices and attach supporting evidence',
      'Receive updates as cases move through store or law enforcement channels'
    ],
    accent: 'owners'
  },
  {
    role: 'Store Users',
    summary:
      'Retail teams check ownership claims at the counter, initiate holds, and coordinate with administrators.',
    actions: [
      'Scan device identifiers and confirm status before resale or repair',
      'Escalate suspicious activity to law enforcement with one click',
      'Log recovery actions and customer interactions for compliance'
    ],
    accent: 'stores'
  },
  {
    role: 'Law Enforcement',
    summary:
      'Investigators access verified device histories and collaborate with stores and owners on recovery.',
    actions: [
      'Review device histories and ownership proofs in a single dashboard',
      'Coordinate pickup or seizure workflows with time-stamped approvals',
      'Close cases with documented evidence trails for reporting'
    ],
    accent: 'law'
  },
  {
    role: 'System Administrators',
    summary:
      'Configure policies, manage user access, and monitor the overall health of the recovery program.',
    actions: [
      'Set verification rules and escalation paths for each jurisdiction',
      'Audit activity logs and ensure data retention requirements are met',
      'Produce program-wide insights for stakeholders and leadership'
    ],
    accent: 'admin'
  }
];
