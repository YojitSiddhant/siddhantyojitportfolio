export const adminRoutes = {
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  home: "/admin/home",
  education: "/admin/education",
  skills: "/admin/skills",
  projects: "/admin/projects",
  myWork: "/admin/my-work",
  certificates: "/admin/certificates",
  experience: "/admin/experience",
  settings: "/admin/settings",
  site: "/",
} as const;

export const adminNavItems = [
  { label: "Dashboard", href: adminRoutes.dashboard },
  { label: "Home", href: adminRoutes.home },
  { label: "Education", href: adminRoutes.education },
  { label: "Skills", href: adminRoutes.skills },
  { label: "Projects", href: adminRoutes.projects },
  { label: "My Work", href: adminRoutes.myWork },
  { label: "Certificates", href: adminRoutes.certificates },
  { label: "Experience", href: adminRoutes.experience },
  { label: "Settings", href: adminRoutes.settings },
  { label: "View Site", href: adminRoutes.site },
] as const;
