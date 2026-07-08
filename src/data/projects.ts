export interface Project {
    id: string;
    title: string;
    blurb: string;
    description: string;
    tags: string[];
    image?: string;
}

// PLACEHOLDER projects — replace with Stephanie's actual work, and drop real
// screenshots in public/images/projects/ (see ProjectCard.tsx placeholder note)
export const PROJECTS: Project[] = [
    {
        id: 'project-one',
        title: 'PLACEHOLDER Project One',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['React', 'TypeScript'],
    },
    {
        id: 'project-two',
        title: 'PLACEHOLDER Project Two',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Python', 'Machine Learning'],
    },
    {
        id: 'project-three',
        title: 'PLACEHOLDER Project Three',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Next.js', 'Design'],
    },
    {
        id: 'project-four',
        title: 'PLACEHOLDER Project Four',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Node.js', 'API'],
    },
];
