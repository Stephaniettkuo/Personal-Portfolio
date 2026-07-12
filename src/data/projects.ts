export interface Project {
    id: string;
    title: string;
    blurb: string;
    description: string;
    tags: string[];
    image?: string;
    demoUrl?: string;
    sourceUrl?: string;
}

// PLACEHOLDER projects — replace with Stephanie's actual work, drop real
// screenshots in public/images/projects/, and swap the '#' demo/source links
// for real ones (see ProjectCard.tsx placeholder note)
export const PROJECTS: Project[] = [
    {
        id: 'project-one',
        title: 'PLACEHOLDER Project One',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['React', 'TypeScript'],
        demoUrl: '#', sourceUrl: '#',
    },
    {
        id: 'project-two',
        title: 'PLACEHOLDER Project Two',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Python', 'Machine Learning'],
        demoUrl: '#', sourceUrl: '#',
    },
    {
        id: 'project-three',
        title: 'PLACEHOLDER Project Three',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Next.js', 'Design'],
        demoUrl: '#', sourceUrl: '#',
    },
    {
        id: 'project-four',
        title: 'PLACEHOLDER Project Four',
        blurb: 'A one-line summary of what this project does.',
        description: 'PLACEHOLDER — a longer paragraph describing the problem, the approach, and the outcome of this project.',
        tags: ['Node.js', 'API'],
        demoUrl: '#', sourceUrl: '#',
    },
];
