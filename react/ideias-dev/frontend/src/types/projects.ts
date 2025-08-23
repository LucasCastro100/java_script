export type Project = {
    name: string;
    description: string;
    slug: string;
    // image?: string; // Optional, if you want to include images later
    tags: string[];
    url: string; // URL to the project page
}