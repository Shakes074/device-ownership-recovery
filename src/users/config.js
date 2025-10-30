export const roleConfigs = {
  'device-owner': {
    key: 'device-owner',
    path: '/device-owner',
    label: 'Device Owner',
    portalName: 'Device Owner Portal',
    summary:
      'Register your devices, report losses, and stay informed as recovery teams coordinate on your behalf.',
    overview:
      'The Device Owner portal centralises every action needed to protect registered hardware and stay in sync with recovery partners.',
    actions: [
      'Register new devices with purchase proofs and serial numbers',
      'Submit lost or stolen reports with supporting documentation',
      'Track the investigation status and receive secure notifications',
      'Manage ownership transfers and update authorized contacts'
    ],
    accent: 'owners',
    marketingCta: {
      label: 'Visit portal',
      href: '/device-owner'
    },
    navLinks: [
      { label: 'Home', to: '/device-owner', variant: 'link' },
      { label: 'About', to: '/device-owner/about', variant: 'link' },
      { label: 'Users', to: '/device-owner/users', variant: 'link' },
      { label: 'Contact', to: '/device-owner/contact', variant: 'link' },
      { label: 'Login', to: '/device-owner/login', variant: 'ghost' },
      { label: 'Register', to: '/device-owner/register', variant: 'primary' }
    ],
    theme: {
      background: '#f0f6ff',
      surface: '#ffffff',
      primary: '#0c66ff'
    }
  },
  'store-admin': {
    key: 'store-admin',
    path: '/store/admin',
    label: 'Store Administrator',
    portalName: 'Store Administrator Console',
    summary:
      'Configure policies, oversee in-store verification workflows, and ensure compliance across every counter.',
    overview:
      'Administrators manage store-wide policies, approvals, and the insight needed to keep counter operations compliant.',
    actions: [
      'Define verification thresholds and escalation rules for staff',
      'Review flagged transactions and approve next-step actions',
      'Manage user access and role assignments across store locations',
      'Audit activity logs and generate compliance-ready reports'
    ],
    accent: 'stores',
    parent: 'store',
    marketingCta: {
      label: 'Request access',
      href: '/store/admin'
    },
    navLinks: [
      { label: 'Home', to: '/store/admin', variant: 'link' },
      { label: 'About', to: '/store/admin/about', variant: 'link' },
      { label: 'Users', to: '/store/admin/users', variant: 'link' },
      { label: 'Contact', to: '/store/admin/contact', variant: 'link' },
      { label: 'Request access', to: '/store/admin/request', variant: 'primary' }
    ],
    theme: {
      background: '#e8fbf7',
      surface: '#ffffff',
      primary: '#00a59a'
    }
  },
  'store-staff': {
    key: 'store-staff',
    path: '/store/staff',
    label: 'Store Staff',
    portalName: 'Store Staff Workspace',
    summary:
      'Verify device ownership in real time, escalate suspicious findings, and keep customers informed throughout the recovery process.',
    overview:
      'Frontline staff lean on guided workflows to validate device status, initiate holds, and collaborate with partners quickly.',
    actions: [
      'Scan device identifiers to confirm registration and status',
      'Start hold requests and capture store-level documentation',
      'Escalate potential theft cases to administrators or law enforcement',
      'Update customers with recovery progress and pickup instructions'
    ],
    accent: 'stores',
    parent: 'store',
    marketingCta: {
      label: 'Request access',
      href: '/store/staff'
    },
    navLinks: [
      { label: 'Home', to: '/store/staff', variant: 'link' },
      { label: 'About', to: '/store/staff/about', variant: 'link' },
      { label: 'Users', to: '/store/staff/users', variant: 'link' },
      { label: 'Contact', to: '/store/staff/contact', variant: 'link' },
      { label: 'Request access', to: '/store/staff/request', variant: 'primary' }
    ],
    theme: {
      background: '#e8fbf7',
      surface: '#ffffff',
      primary: '#00a59a'
    }
  },
  'repair-shop': {
    key: 'repair-shop',
    path: '/repair-shop',
    label: 'Repair Shop',
    portalName: 'Repair Shop Dashboard',
    summary:
      'Confirm device legitimacy before service, coordinate with owners, and maintain an auditable handoff record.',
    overview:
      'Repair technicians validate every intake and document service milestones so ownership remains clear throughout the fix.',
    actions: [
      'Validate service requests against verified ownership records',
      'Document intake conditions, service notes, and completed repairs',
      'Coordinate pickup logistics with stores and law enforcement when needed',
      'Close cases with signatures and time-stamped documentation'
    ],
    accent: 'repair',
    marketingCta: {
      label: 'Request access',
      href: '/repair-shop'
    },
    navLinks: [
      { label: 'Home', to: '/repair-shop', variant: 'link' },
      { label: 'About', to: '/repair-shop/about', variant: 'link' },
      { label: 'Users', to: '/repair-shop/users', variant: 'link' },
      { label: 'Contact', to: '/repair-shop/contact', variant: 'link' },
      { label: 'Request access', to: '/repair-shop/request', variant: 'primary' }
    ],
    theme: {
      background: '#fff7e6',
      surface: '#ffffff',
      primary: '#ffb300'
    }
  },
  lawenforcement: {
    key: 'lawenforcement',
    path: '/law-enforcement',
    label: 'Law Enforcement',
    portalName: 'Law Enforcement Hub',
    summary:
      'Access consolidated device histories, collaborate with stores, and coordinate recoveries with transparent evidence trails.',
    overview:
      'Investigators gain fast access to validated proofs, incident timelines, and coordination tools built for inter-agency work.',
    actions: [
      'Review verified ownership claims and supporting documents',
      'Issue holds or release orders with digital signatures and timestamps',
      'Schedule pickups and coordinate logistics with participating stores',
      'Submit final case reports and archive evidentiary materials'
    ],
    accent: 'law',
    marketingCta: {
      label: 'Request access',
      href: '/law-enforcement'
    },
    navLinks: [
      { label: 'Home', to: '/law-enforcement', variant: 'link' },
      { label: 'About', to: '/law-enforcement/about', variant: 'link' },
      { label: 'Users', to: '/law-enforcement/users', variant: 'link' },
      { label: 'Contact', to: '/law-enforcement/contact', variant: 'link' },
      { label: 'Request access', to: '/law-enforcement/request', variant: 'primary' }
    ],
    theme: {
      background: '#ffece6',
      surface: '#ffffff',
      primary: '#ff7043'
    }
  },
  'system-admin': {
    key: 'system-admin',
    path: '/system-admin',
    label: 'System Administrator',
    portalName: 'System Administration Center',
    summary:
      'Maintain program-wide policies, manage integrations, and ensure the platform stays healthy and secure.',
    overview:
      'Program administrators configure governance, integrations, and monitoring that keep the recovery network operational.',
    actions: [
      'Configure authentication, retention, and jurisdiction policies',
      'Manage API credentials, webhooks, and downstream integrations',
      'Monitor key metrics and respond to operational alerts',
      'Oversee audit trails and export datasets for stakeholders'
    ],
    accent: 'admin',
    marketingCta: {
      label: 'Access by invitation',
      disabled: true
    },
    navLinks: [
      { label: 'Home', to: '/system-admin', variant: 'link' },
      { label: 'About', to: '/system-admin/about', variant: 'link' },
      { label: 'Users', to: '/system-admin/users', variant: 'link' },
      { label: 'Contact', to: '/system-admin/contact', variant: 'link' },
      { label: 'Invitation only', to: '/system-admin/access', variant: 'primary', disabled: true }
    ],
    theme: {
      background: '#f2f0ff',
      surface: '#ffffff',
      primary: '#6c4dff'
    },
    isPrivate: true,
    notice:
      'This portal is invitation-only. A secure link is provided directly to system administrators during onboarding.'
  }
};
