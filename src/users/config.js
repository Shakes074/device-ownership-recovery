export const roleConfigs = {
  'device-owner': {
    key: 'device-owner',
    path: '/device-owner',
    label: 'Device Owner',
    portalName: 'Device Owner Portal',
    summary:
      'Register your devices, report losses, and stay informed as recovery teams coordinate on your behalf.',
    actions: [
      'Register new devices with purchase proofs and serial numbers',
      'Submit lost or stolen reports with supporting documentation',
      'Track the investigation status and receive secure notifications',
      'Manage ownership transfers and update authorized contacts'
    ],
    accent: 'owners'
  },
  'store-admin': {
    key: 'store-admin',
    path: '/store/admin',
    label: 'Store Administrator',
    portalName: 'Store Administrator Console',
    summary:
      'Configure policies, oversee in-store verification workflows, and ensure compliance across every counter.',
    actions: [
      'Define verification thresholds and escalation rules for staff',
      'Review flagged transactions and approve next-step actions',
      'Manage user access and role assignments across store locations',
      'Audit activity logs and generate compliance-ready reports'
    ],
    accent: 'stores',
    parent: 'store'
  },
  'store-staff': {
    key: 'store-staff',
    path: '/store/staff',
    label: 'Store Staff',
    portalName: 'Store Staff Workspace',
    summary:
      'Verify device ownership in real time, escalate suspicious findings, and keep customers informed throughout the recovery process.',
    actions: [
      'Scan device identifiers to confirm registration and status',
      'Start hold requests and capture store-level documentation',
      'Escalate potential theft cases to administrators or law enforcement',
      'Update customers with recovery progress and pickup instructions'
    ],
    accent: 'stores',
    parent: 'store'
  },
  'repair-shop': {
    key: 'repair-shop',
    path: '/repair-shop',
    label: 'Repair Shop',
    portalName: 'Repair Shop Dashboard',
    summary:
      'Confirm device legitimacy before service, coordinate with owners, and maintain an auditable handoff record.',
    actions: [
      'Validate service requests against verified ownership records',
      'Document intake conditions, service notes, and completed repairs',
      'Coordinate pickup logistics with stores and law enforcement when needed',
      'Close cases with signatures and time-stamped documentation'
    ],
    accent: 'repair'
  },
  lawenforcement: {
    key: 'lawenforcement',
    path: '/law-enforcement',
    label: 'Law Enforcement',
    portalName: 'Law Enforcement Hub',
    summary:
      'Access consolidated device histories, collaborate with stores, and coordinate recoveries with transparent evidence trails.',
    actions: [
      'Review verified ownership claims and supporting documents',
      'Issue holds or release orders with digital signatures and timestamps',
      'Schedule pickups and coordinate logistics with participating stores',
      'Submit final case reports and archive evidentiary materials'
    ],
    accent: 'law'
  },
  'system-admin': {
    key: 'system-admin',
    path: '/system-admin',
    label: 'System Administrator',
    portalName: 'System Administration Center',
    summary:
      'Maintain program-wide policies, manage integrations, and ensure the platform stays healthy and secure.',
    actions: [
      'Configure authentication, retention, and jurisdiction policies',
      'Manage API credentials, webhooks, and downstream integrations',
      'Monitor key metrics and respond to operational alerts',
      'Oversee audit trails and export datasets for stakeholders'
    ],
    accent: 'admin'
  }
};
