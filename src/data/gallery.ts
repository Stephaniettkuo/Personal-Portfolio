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
            { src: '/images/photos/gallery/music1.jpeg', caption: 'music' },
            { src: '/images/photos/gallery/guitarr.jpg', caption: 'music: playing guitar (1yr)' },
            { src: '/images/photos/gallery/flutee.jpg', caption: 'music: playing flute (8yr)' },
            { src: '/images/photos/gallery/piano.jpg', caption: 'music: playing piano (12yr)' },
            { src: '/images/photos/gallery/spotify.png', caption: 'music: listening to c-pop, c-r&b' },
        ],
    },
    {
        src: '/images/photos/gallery/ocean.png', caption: 'ocean',
        slides: [
            { src: '/images/photos/gallery/ocean.png', caption: 'ocean' },
            { src: '/images/photos/gallery/jellyfish1.jpeg', caption: 'ocean: jellyfish!! (my fav)' },
            { src: '/images/photos/gallery/aquarium.jpeg', caption: 'ocean: aquarium I' },
            { src: '/images/photos/gallery/ocean.jpeg', caption: 'ocean: aquarium II' },
            { src: '/images/photos/gallery/biolum.png', caption: 'ocean: bioluminescence' },
        ],
    },
    {
        src: '/images/photos/gallery/panda.jpeg', caption: 'friends',
        slides: [
            { src: '/images/photos/gallery/panda.jpeg', caption: 'friends' },
            { src: '/images/photos/gallery/friend0.jpeg', caption: 'friends: first best friend (my sister)' },
            { src: '/images/photos/gallery/friend7.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend12.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend2.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend3.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend4.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend6.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend1.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend11.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend15.jpeg', caption: 'friends: @austin, tx' },
            { src: '/images/photos/gallery/friend16.jpeg', caption: 'friends: @el paso & austin, tx' },
            { src: '/images/photos/gallery/friend13.jpeg', caption: 'friends: @el paso, tx' },
            { src: '/images/photos/gallery/friend5.jpeg', caption: 'friends: @el paso, tx' },
            { src: '/images/photos/gallery/friend9.jpeg', caption: 'friends: @el paso, tx' },
            { src: '/images/photos/gallery/friend17.jpeg', caption: 'friends: @el paso, tx' },
        ],
    },
    {
        src: '/images/gallery/img4.jpg', caption: '?aesthetic?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: mid-project' },
            { caption: 'PLACEHOLDER — slide 2: the finished result' },
        ],
    },
    {
        src: '/images/gallery/img5.jpg', caption: 'sport?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: a favorite memory together' },
            { caption: 'PLACEHOLDER — slide 2: why they matter' },
        ],
    },
    {
        src: '/images/photos/gallery/travel.jpeg', caption: 'traveling',
        slides: [
            { src: '/images/photos/gallery/travel.jpeg', caption: 'traveling' },
            { src: '/images/photos/gallery/boat.jpeg', caption: 'travel: by boat (suzhou, china)' },
            { src: '/images/photos/gallery/bus.jpeg', caption: 'travel: by bus (jiangxi, china)' },
            { src: '/images/photos/gallery/bike.jpeg', caption: 'travel: by bike (xinwu, taiwan) ' },
            { src: '/images/photos/gallery/epplane.jpeg', caption: 'travel: by plane (el paso, tx)' },
            { src: '/images/photos/gallery/car.jpeg', caption: 'travel: by car ' },
            { src: '/images/photos/gallery/train1.jpeg', caption: 'travel: by train ' },
            { src: '/images/photos/gallery/steps.jpeg', caption: 'travel: by steps (zhong shan ling) ' },
            { src: '/images/photos/gallery/yilan.jpeg', caption: 'travel: for special experience (yilan, taiwan)' },
            { src: '/images/photos/gallery/museum.jpeg', caption: 'travel: see origins (nanjing, china )' },
            { src: '/images/photos/gallery/memorial.jpeg', caption: 'travel: see memorial (nanjing, china) ' },
            { src: '/images/photos/gallery/galveston.jpeg', caption: 'travel: see ocean (galveston, tx)' },
            { src: '/images/photos/gallery/nanjing.jpeg', caption: 'travel: see history (nanchang, china)' },
            { src: '/images/photos/gallery/xingyu.jpeg', caption: 'travel: see culture (xingyu, china)' },
            { src: '/images/photos/gallery/taipei.jpeg', caption: 'travel: see nature (taipei, taiwan zoo)' },
            { src: '/images/photos/gallery/nm.jpeg', caption: 'travel: see peculiarities (white sands national park, new mexico)' },
            { src: '/images/photos/gallery/granny.jpeg', caption: 'travel: with chinese granny tour group' },
            { src: '/images/photos/gallery/hsinchu.jpeg', caption: 'travel: for peace (hsinchu, taiwan)' },
            { src: '/images/photos/gallery/train.jpeg', caption: 'travel: for fun, memories, and learning - many more to come :P' },
        ],
    },
    {
        src: '/images/photos/gallery/photography.jpeg', caption: 'photography',
        slides: [
            { src: '/images/photos/gallery/photography.jpeg', caption: 'photography' },
            { src: '/images/photos/gallery/volunteer.jpeg', caption: 'photography: volunteer photographer' },
            { src: '/images/photos/gallery/ut.jpeg', caption: 'photography: burnt orange moon' },
            { src: '/images/photos/gallery/lake.jpeg', caption: 'photography: ladybird lake' },
            { src: '/images/photos/gallery/moon.jpeg', caption: 'photography: moon' },
            { src: '/images/photos/gallery/snow.jpeg', caption: 'photography: snow day' },
            { src: '/images/photos/gallery/squirrel.jpeg', caption: 'photography: albino squirrel' },
            { src: '/images/photos/gallery/bird.jpeg', caption: 'photography: birds' },
        ],
    },
    {
        src: '/images/photos/gallery/hcover.jpeg', caption: 'hangyodon',
        slides: [
            { src: '/images/photos/gallery/hcover.jpeg', caption: 'hangyodon: aka "ugly fish" in china' },
            { src: '/images/photos/gallery/h3.jpeg', caption: 'hangyodon: underrated sanio character' },
            { src: '/images/photos/gallery/h4.jpeg', caption: 'hangyodon: ugly but cute' },
            { src: '/images/photos/gallery/h13.jpeg', caption: 'hangyodon: same I' },
            { src: '/images/photos/gallery/h7.jpeg', caption: 'hangyodon: same II' },
            { src: '/images/photos/gallery/h8.jpeg', caption: 'hangyodon: hopefully same III' },
            { src: '/images/photos/gallery/h9.jpeg', caption: 'hangyodon: same IV' },
            { src: '/images/photos/gallery/h10.jpeg', caption: 'hangyodon: same V' },
            { src: '/images/photos/gallery/h11.jpeg', caption: 'hangyodon: same VI' },
            { src: '/images/photos/gallery/h15.jpeg', caption: 'hangyodon: same VII' },
            { src: '/images/photos/gallery/h2.jpeg', caption: 'hangyodon: same VIII' },
            { src: '/images/photos/gallery/h20.jpeg', caption: 'hangyodon: phone' },
            { src: '/images/photos/gallery/h1.jpeg', caption: 'hangyodon: :)' },
           
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
        src: '/images/gallery/img11.jpg', caption: '?sport?',
        slides: [
            { caption: 'PLACEHOLDER — slide 1: where I first heard it' },
            { caption: 'PLACEHOLDER — slide 2: why it stuck' },
        ],
    },
    {
        src: '/images/photos/gallery/hi3.jpeg', caption: 'hirono',
        slides: [
            { src: '/images/photos/gallery/hi3.jpeg', caption: 'hirono: blindbox character' },
            { src: '/images/photos/gallery/hi1.jpeg', caption: 'hirono: cute' },
            { src: '/images/photos/gallery/hi2.jpeg', caption: 'hirono: sleepy' },
            { src: '/images/photos/gallery/hi5.jpeg', caption: 'hirono: coffee' },
            { src: '/images/photos/gallery/hi6.jpeg', caption: 'hirono: chill' },
            { src: '/images/photos/gallery/hi7.jpeg', caption: 'hirono: panda' },
        ],
    },
    {
        src: '/images/photos/gallery/cs1.jpeg', caption: 'computer science',
        slides: [
            { src: '/images/photos/gallery/utcs.jpeg', caption: 'cs: love utcs'},
            { src: '/images/photos/gallery/community.jpeg', caption: 'cs: love cs community'},
            { src: '/images/photos/gallery/glasses2.jpeg', caption: 'cs: love cs fit'},
            { src: '/images/photos/gallery/friends.jpeg', caption: 'cs: love cs friends'},
            { src: '/images/photos/gallery/errors.jpeg', caption: 'cs: love cs fails'},
            { src: '/images/photos/gallery/pass.jpeg', caption: 'cs: love cs passes'},
            { src: '/images/photos/gallery/notes.jpeg', caption: 'cs: love cs for making me a more competent notetaker'},
            { src: '/images/photos/gallery/learn.jpeg', caption: 'cs: love cs for teaching me sooo many things'},
            { src: '/images/photos/gallery/learn1.jpeg', caption: 'cs: love cs for letting me know I can survive through struggles'},
            { src: '/images/photos/gallery/career.jpeg', caption: 'cs: love cs for training me to become a better student, teammate, person, developer, programmer ...'},
        ],
    },
    {
        src: '/images/photos/gallery/coffee.jpeg', caption: 'coffee',
        slides: [
            { src: '/images/photos/gallery/coffee.jpeg', caption: 'coffee: I'},
            { src: '/images/photos/gallery/coffee2.jpeg', caption: 'coffee: II'},
            { src: '/images/photos/gallery/coffee1.jpeg', caption: 'coffee: III'},
            { src: '/images/photos/gallery/coffee4.jpeg', caption: 'coffee: IV'},
            { src: '/images/photos/gallery/coffee5.jpeg', caption: 'coffee: V'},
            { src: '/images/photos/gallery/coffee6.jpeg', caption: 'coffee: VI'},
            { src: '/images/photos/gallery/coffee7.jpeg', caption: 'coffee: VII'},
            
        ],
    },
    {
        src: '/images/photos/gallery/fam3.jpeg', caption: 'family',
        slides: [
            { src: '/images/photos/gallery/fam3.jpeg', caption: 'family' },
            { src: '/images/photos/gallery/fam.jpeg', caption: 'family: I' },
            { src: '/images/photos/gallery/fam1.jpeg', caption: 'family: II' },
            { src: '/images/photos/gallery/fam4.jpeg', caption: 'family: III' },
            { src: '/images/photos/gallery/fam5.jpeg', caption: 'family: IV' },
            { src: '/images/photos/gallery/fam7.jpeg', caption: 'family: V' },
            { src: '/images/photos/gallery/sis.jpeg', caption: 'family: best and only sister' },
            { src: '/images/photos/gallery/china1.jpeg', caption: 'family: china fam I' },
            { src: '/images/photos/gallery/china2.jpeg', caption: 'family: china fam II' },
            { src: '/images/photos/gallery/taiwan1.jpeg', caption: 'family: taiwan fam I' },
            { src: '/images/photos/gallery/taiwan2.jpeg', caption: 'family: taiwan fam II' },
        ],
    },
    {
        src: '/images/photos/gallery/rob.jpeg', caption: 'robotics',
        slides: [
            { src: '/images/photos/gallery/rob5.jpeg', caption: 'robotics'},
            { src: '/images/photos/gallery/rob3.jpeg', caption: 'robotics'},
            { src: '/images/photos/gallery/rob1.jpeg', caption: 'robotics'},
            { src: '/images/photos/gallery/rob2.jpeg', caption: 'robotics'},
            { src: '/images/photos/gallery/rob6.jpeg', caption: 'robotics'},
            { src: '/images/photos/gallery/rob8.jpeg', caption: 'robotics'},
        ],
    },
    {
        src: '/images/photos/gallery/bad4.jpeg', caption: 'badminton',
        slides: [
            { src: '/images/photos/gallery/bad4.jpeg', caption: 'badminton: I' },
            { src: '/images/photos/gallery/bad1.jpeg', caption: 'badminton: II' },
            { src: '/images/photos/gallery/bad2.jpeg', caption: 'badminton: III' },
            { src: '/images/photos/gallery/bad3.jpeg', caption: 'badminton: IV' },
        ],
    },
    {
        src: '/images/photos/gallery/artcover.jpeg', caption: 'arts & craft',
        slides: [
            { src: '/images/photos/gallery/paint3.jpeg', caption: 'arts & craft: 10 min jellyfish' },
            { src: '/images/photos/gallery/paint.jpeg', caption: 'arts & craft: paint with family' },
            { src: '/images/photos/gallery/paint1.jpeg', caption: 'arts & craft: spongebob painting' },
            { src: '/images/photos/gallery/paint2.jpeg', caption: 'arts & craft: nature challenge' },
            { src: '/images/photos/gallery/paint4.jpeg', caption: 'arts & craft: carousel' },
            { src: '/images/photos/gallery/art.jpeg', caption: 'arts & craft: scratch art' },
            { src: '/images/photos/gallery/art1.jpeg', caption: 'arts & craft: recycled material chinese fan' },
            { src: '/images/photos/gallery/art2.jpeg', caption: 'arts & craft: color pencil lion dance' },
            { src: '/images/photos/gallery/poster.jpeg', caption: 'arts & craft: poster for fundraiser' },
            { src: '/images/photos/gallery/poster1.jpeg', caption: 'arts & craft: poster for promoting' },
            { src: '/images/photos/gallery/crochet.jpeg', caption: 'arts & craft: crochet bunny' },
            { src: '/images/photos/gallery/crochet1.jpeg', caption: 'arts & craft: crochet bear' },
            { src: '/images/photos/gallery/3d.jpeg', caption: 'arts & craft: 3d printed name tag' },
            { src: '/images/photos/gallery/nail.jpeg', caption: 'arts & craft: nail I' },
            { src: '/images/photos/gallery/nail1.jpeg', caption: 'arts & craft: nail II' },
            { src: '/images/photos/gallery/nail3.jpeg', caption: 'arts & craft: nail III' },
            { src: '/images/photos/gallery/clay.jpeg', caption: 'arts & craft: clay' },
            { src: '/images/photos/gallery/design.jpeg', caption: 'arts & craft: t-shirt design' },

        ],
    },
    {
        src: '/images/photos/gallery/orgs.jpeg', caption: 'organizations',
        slides: [
            { src: '/images/photos/gallery/acm.jpeg', caption: 'orgs: acm (association of computing machinery)' },
            { src: '/images/photos/gallery/acm2.jpeg', caption: 'orgs: acm II' },
            { src: '/images/photos/gallery/csa.jpeg', caption: 'orgs: chinese student association' },
            { src: '/images/photos/gallery/csa2.jpeg', caption: 'orgs: csa II' },
            { src: '/images/photos/gallery/roadshow.jpeg', caption: 'orgs: cs roadshow' },
            { src: '/images/photos/gallery/orgs.jpeg', caption: 'orgs: in others but have no pictures yet' },
        ],
    },
   
];
// stargazing, baking, aesthetics, fruits, sports, journaling, hirono, jellyfish, robotics