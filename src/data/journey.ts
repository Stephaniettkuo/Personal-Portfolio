export interface JourneyMilestone {
    year: string;
    title: string;
    description: string;      // short teaser shown collapsed
    fullStory?: string;       // longer text revealed on expand
    photos?: string[];        // paths under public/, e.g. '/images/journey/2021-1.jpg'
    photoCaptions?: string[]; // optional captions per photo, same order as `photos`
    image?: string;
    imagePlaceholder: string;
    tag?: 'school' | 'project' | 'life' | 'work';
    highlight?: boolean;
}

// PLACEHOLDER milestones — replace with Stephanie's real timeline. Add or
// remove entries freely; the horizontal scroll distance auto-adjusts to
// however many exist, no fixed count.
export const JOURNEY: JourneyMilestone[] = [
    {
        year: '2005',
        title: 'Birth',
        description: 'Born in El Paso, Texas to a loving family.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #0a2a4a)',
        tag: 'life',
    },
    {
        year: '2015',
        title: 'robotics',
        description: 'Replace with when you first got curious about computers/coding.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0d3560)',
        tag: 'school',
        highlight: true,
    },
    {
        year: '2020',
        title: 'hs',
        description: 'Replace with your first real project or something you made.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #163860)',
        tag: 'project',
    },
    {
        year: '2022',
        title: 'worlds robotics',
        description: 'Replace with a challenge you overcame or a lesson learned.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0a2040)',
        tag: 'life',
    },
    {
        year: '2024',
        title: 'college',
        description: 'Replace with your current chapter.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #1a4060)',
        tag: 'work',
        highlight: true,
    },
    {
        year: '2025',
        title: 'sophomore',
        description: 'Exploring technology, design, and curiosity every day.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0d3560)',
        tag: 'life',
    },
    {
        year: '2026',
        title: 'senior',
        description: 'Exploring technology, design, and curiosity every day.',
        fullStory: 'PLACEHOLDER — longer story for this milestone. Replace with 2-4 sentences about what this moment meant, what you learned, or how it changed your direction.',
        photos: [],
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0d3560)',
        tag: 'life',
    },
];
