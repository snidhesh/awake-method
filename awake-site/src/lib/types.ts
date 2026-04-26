export type ServiceType =
  | "newsletter"
  | "whatsapp"
  | "keynote"
  | "masterclass"
  | "training"
  | "collab"
  | "podcast"
  | "playbook";

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: ServiceType[];
  notes: string;
  joined: string;
}

export interface WAMessage {
  id: string;
  body: string;
  segment: string;
  sentAt: string;
  scheduled: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  subject: string;
  segment: string;
  sentAt: string;
  recipients: number;
}

export const SERVICES: ServiceType[] = [
  "newsletter",
  "whatsapp",
  "keynote",
  "masterclass",
  "training",
  "collab",
  "podcast",
  "playbook",
];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  newsletter: "Newsletter",
  whatsapp: "WhatsApp Community",
  keynote: "Keynote Enquiry",
  masterclass: "Masterclass Enquiry",
  training: "Corporate Training",
  collab: "Brand Collab",
  podcast: "Podcast Listener",
  playbook: "Free Playbook",
};

export const SERVICE_COLORS: Record<ServiceType, string> = {
  newsletter: "bg-pink/10 text-pink",
  whatsapp: "bg-green-500/10 text-green-500",
  keynote: "bg-amber-500/10 text-amber-500",
  masterclass: "bg-blue-400/10 text-blue-400",
  training: "bg-white/6 text-white/40",
  collab: "bg-pink/10 text-pink",
  podcast: "bg-amber-500/10 text-amber-500",
  playbook: "bg-green-500/10 text-green-500",
};
