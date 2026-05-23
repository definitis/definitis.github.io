export interface ProjectTechnicalDetails {
  backend: string[];
  automation: string[];
  integrations: string[];
  infrastructure: string[];
  architectureOverview: string;
}

export interface Project {
  id: string;
  title: string;
  category: "backend" | "automation" | "parsing" | "tool";
  description: string;
  longDescription: string;
  stack: string[];
  status: "Active" | "Paused" | "In Development" | "Frozen" | "Completed";
  statusColor?: string;
  isPrivate: boolean;
  revenue?: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  result?: string;
  technicalDetails: ProjectTechnicalDetails;
  builtWithoutAI?: boolean;
}

export interface WebProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  previewType: "salon" | "school" | "card";
  mockupTitle: string;
  mockupSubtitle: string;
  features: string[];
  demoUrl?: string;
  screenshots?: { url: string; label: string }[];
}
