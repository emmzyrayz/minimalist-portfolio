// types/developer.ts
export interface Developer {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  techStack: string;
  programmingLanguage: string;
  codingIDE: string;
  contactPreference: "email" | "social";
  socialMediaLink?: string;
  projectInterest: string;
  ideas: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
