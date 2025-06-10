import { Image, Rocket, User, Mail, FileText, Camera, Music, Terminal, FolderOpen, Trash2, Gamepad2, Circle, GraduationCap } from "lucide-react"

export interface WindowConfig {
  icon: any;
  label: string;
  windowId: string;
  color: string;
}

export const windowConfigs: Record<string, WindowConfig> = {
  finder: { icon: FolderOpen, label: "Finder", windowId: "finder", color: "bg-blue-700" },
  terminal: { icon: Terminal, label: "Terminal", windowId: "terminal", color: "bg-black" },
  profile: { icon: User, label: "Profile", windowId: "profile", color: "bg-red-500" },
  photos: { icon: Image, label: "Photos", windowId: "photos", color: "bg-pink-500" },
  contact: { icon: Mail, label: "Contact", windowId: "contact", color: "bg-green-500" },
  resume: { icon: FileText, label: "Resume", windowId: "resume", color: "bg-orange-500" },
  music: { icon: Music, label: "Music", windowId: "music", color: "bg-blue-500" },
  "gravity-wars": { icon: Gamepad2, label: "Gravity Wars", windowId: "gravity-wars", color: "bg-purple-500" },
  trash: { icon: Trash2, label: "Trash", windowId: "trash", color: "bg-gray-500" },
  loopcraft: { icon: Circle, label: "Project 01 (LoopCraft)", windowId: "loopcraft", color: "bg-blue-700" },
  gravitywars: { icon: Rocket, label: "Project 02 (GravityWars)", windowId: "gravitywars", color: "bg-gray-900" },
  "pulmonary-nodule-analysis-system": { icon: FileText, label: "Project 03 (Pulmonary Nodule Analysis System)", windowId: "pulmonary-nodule-analysis-system", color: "bg-teal-400" },
  "cs2204-project": { icon: GraduationCap, label: "Project 04 (CS2204-Project)", windowId: "cs2204-project", color: "bg-orange-400" },
} 