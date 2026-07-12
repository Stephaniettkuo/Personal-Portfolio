export interface JourneyMilestone {
    year: string;
    title: string;
    description: string;
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
        year: '20XX',
        title: 'PLACEHOLDER — Early Memory',
        description: 'Replace with a real milestone. Something that shaped who you are.',
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #0a2a4a)',
        tag: 'life',
    },
    {
        year: '20XX',
        title: 'PLACEHOLDER — First Steps in Tech',
        description: 'Replace with when you first got curious about computers/coding.',
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0d3560)',
        tag: 'school',
        highlight: true,
    },
    {
        year: '20XX',
        title: 'PLACEHOLDER — A Project You Built',
        description: 'Replace with your first real project or something you made.',
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #163860)',
        tag: 'project',
    },
    {
        year: '20XX',
        title: 'PLACEHOLDER — Growth Moment',
        description: 'Replace with a challenge you overcame or a lesson learned.',
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0a2040)',
        tag: 'life',
    },
    {
        year: '20XX',
        title: 'PLACEHOLDER — Where You Are Now',
        description: 'Replace with your current chapter.',
        imagePlaceholder: 'linear-gradient(135deg, #04101f, #1a4060)',
        tag: 'work',
        highlight: true,
    },
    {
        year: 'Now',
        title: 'Continuing to build.',
        description: 'Exploring technology, design, and curiosity every day.',
        imagePlaceholder: 'linear-gradient(135deg, #071428, #0d3560)',
        tag: 'life',
    },
];
