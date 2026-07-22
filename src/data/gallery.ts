// To add real photos to a slide: add src: '/images/gallery/<folder>/<file>.jpg'
// and place the image in public/images/gallery/<folder>/
// Leave src absent to keep the gradient placeholder.

export interface GallerySlide {
    /** Real photo path, e.g. '/images/gallery/guitar/guitar-1.jpg'. If absent,
     * the lightbox shows a gradient placeholder for this slide instead. */
    src?: string;
    /** Caption for this specific slide (not the tile's grid-hover caption). */
    caption: string;
}

export interface GalleryItem {
    /** The main tile shown in the gallery grid/panel. */
    src: string;
    /** Short label shown on hover in the grid. */
    caption: string;
    /** Carousel slides shown when this tile is clicked. If omitted or empty,
     * the lightbox falls back to a single slide using the tile's own caption. */
    slides?: GallerySlide[];
}

// PLACEHOLDER images + captions — drop real photos in public/images/gallery/,
// then update each item's `src` to point at its thumbnail (paths are relative
// to `public/`, so a file at public/images/gallery/img1.jpg is
// "/images/gallery/img1.jpg", never "/public/images/gallery/img1.jpg").
// Each item also has its own `slides` for the lightbox carousel — give a
// slide its own `src` once you have a real photo for it; it'll keep showing
// a gradient placeholder until then.
export const GALLERY_ITEMS: GalleryItem[] = [
    {
        src: '/images/photos/gallery/music1.jpeg', caption: 'music',
        slides: [
            { src: '/images/photos/gallery/guitarr.jpg', caption: 'music: playing guitar (1yr)' },
            { src: '/images/photos/gallery/flutee.jpg', caption: 'music: playing flute (8yr)' },
            { src: '/images/photos/gallery/piano.jpg', caption: 'music: playing piano (12yr)' },
            { src: '/images/photos/gallery/spotify.png', caption: 'music: listening to c-pop, c-r&b' },
        ],
    },
    {
        src: '/images/photos/gallery/ocean.png', caption: 'ocean',
        slides: [
            { src: '/images/photos/gallery/jellyfish1.jpeg', caption: 'ocean: jellyfish!! (my fav)' },
            { src: '/images/photos/gallery/aquarium.jpeg', caption: 'ocean: aquarium I' },
            { src: '/images/photos/gallery/ocean.jpeg', caption: 'ocean: aquarium II' },
            { src: '/images/photos/gallery/biolum.png', caption: 'ocean: bioluminescence' },
        ],
    },
    {
        src: '/images/gallery/img3.jpg', caption: 'crochet?',
        slides: [
            { src: '/images/photos/gallery/jellyfish1.jpg', caption: 'ocean: jellyfish!! (my fav)' },
            { src: '/images/photos/gallery/aquarium.jpeg', caption: 'ocean: aquarium I' },
            { src: '/images/photos/gallery/ocean.jpeg', caption: 'ocean: aquarium II' },
            { src: '/images/photos/gallery/biolum.jpg', caption: 'ocean: bioluminescence' },
        ],
    },
    {
        src: '/images/gallery/img4.jpg', caption: '?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: mid-project' },
            { caption: 'PLACEHOLDER — slide 2: the finished result' },
        ],
    },
    {
        src: '/images/gallery/img5.jpg', caption: '?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: a favorite memory together' },
            { caption: 'PLACEHOLDER — slide 2: why they matter' },
        ],
    },
    {
        src: '/images/gallery/img6.jpg', caption: 'friends',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: the trail up' },
            { caption: 'PLACEHOLDER — slide 2: the view from the top' },
            { caption: 'PLACEHOLDER — slide 3: the way back down' },
        ],
    },
    {
        src: '/images/photos/gallery/photography.jpeg', caption: 'photography',
        slides: [
            { src: '/images/photos/gallery/volunteer.jpeg', caption: 'photography: volunteer photographer' },
            { src: '/images/photos/gallery/ut.jpeg', caption: 'ocean: aquarium II' },
            { src: '/images/photos/gallery/lake.jpeg', caption: 'ocean: bioluminescence' },
            { src: '/images/photos/gallery/moon.jpeg', caption: 'ocean: bioluminescence' },
            { src: '/images/photos/gallery/snow.jpeg', caption: 'ocean: bioluminescence' },
            { src: '/images/photos/gallery/squirrel.jpeg', caption: 'ocean: bioluminescence' },
        ],
    },
    {
        src: '/images/gallery/img8.jpg', caption: 'traveling',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: the first sign it has arrived' },
            { caption: 'PLACEHOLDER — slide 2: what I love most about it' },
        ],
    },
    {
        src: '/images/gallery/img9.jpg', caption: '?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: how it starts' },
            { caption: 'PLACEHOLDER — slide 2: why it matters to me' },
        ],
    },
    {
        src: '/images/gallery/img10.jpg', caption: '?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: work in progress' },
            { caption: 'PLACEHOLDER — slide 2: the finished piece' },
            { caption: 'PLACEHOLDER — slide 3: what I learned making it' },
        ],
    },
    {
        src: '/images/gallery/img11.jpg', caption: '?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: where I first heard it' },
            { caption: 'PLACEHOLDER — slide 2: why it stuck' },
        ],
    },
    {
        src: '/images/gallery/img12.jpg', caption: 'robotics',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: how I remember it' },
            { caption: 'PLACEHOLDER — slide 2: how it looks now' },
        ],
    },
    {
        src: '/images/gallery/img13.jpg', caption: 'learning',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: their favorite spot' },
            { caption: 'PLACEHOLDER — slide 2: being silly' },
            { caption: 'PLACEHOLDER — slide 3: a quiet moment together' },
        ],
    },
    {
        src: '/images/gallery/img14.jpg', caption: 'cs',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: what it looks like outside' },
            { caption: 'PLACEHOLDER — slide 2: what I do when it happens' },
        ],
    },
    {
        src: '/images/gallery/img15.jpg', caption: 'family',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: the cover' },
            { caption: 'PLACEHOLDER — slide 2: the line I still think about' },
        ],
    },
    {
        src: '/images/gallery/img16.jpg', caption: 'characters',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: starting out' },
            { caption: 'PLACEHOLDER — slide 2: where I am now' },
        ],
    },
    {
        src: '/images/gallery/img17.jpg', caption: 'coffee',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: where I stayed' },
            { caption: 'PLACEHOLDER — slide 2: the best day of the trip' },
            { caption: 'PLACEHOLDER — slide 3: what I’d do again' },
        ],
    },
    {
        src: '/images/gallery/img18.jpg', caption: 'creating',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: where I notice it most' },
            { caption: 'PLACEHOLDER — slide 2: why it feels like me' },
        ],
    },
    {
        src: '/images/gallery/img19.jpg', caption: 'ai',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: where it comes from' },
            { caption: 'PLACEHOLDER — slide 2: what it reminds me of' },
        ],
    },
   
];
