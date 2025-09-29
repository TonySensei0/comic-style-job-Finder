export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  url: string;
  isHot: boolean;
  postedDate: string;
  source: string;
}