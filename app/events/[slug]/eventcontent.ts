// app/events/[slug]/eventContent.ts

export type EventCard = {
    image: string;
    name: string;
    description: string[];
    price: string;
    rules: string[];
};

export type EventPageConfig = {
    title: string;
    cards: EventCard[];
};

export const EVENT_PAGES: Record<string, EventPageConfig> = {
    /* ================= DANCE ================= */
    dance: {
        title: "dance event",
        cards: [
            {
                image: "/images_events/dance/1.png",
                name: "Footloose",
                description: [
                    "An expressive dance event blending rhythm, emotion, and storytelling."
                ],
                price: "Entry fee: ₹300 per team",
                rules: [
                    "Minimum participants: 2",
                    "Maximum participants: 4",
                    "Any dance style allowed",
                    "Time limit will be strictly enforced",
                ],
            },
            {
                image: "/images_events/dance/2.png",
                name: "Naach",
                description: [
                    "A lyrical face-off testing flow, punchlines, and stage presence."
                ],
                price: "Entry fee: ₹200 per participant",
                rules: [
                    "Solo participation only",
                    "No explicit or offensive language",
                    "Time limit: 2 minutes per round",
                ],
            },
            {
                image: "/images_events/dance/3.png",
                name: "Showdown",
                description: [
                    "High-energy DJ and freestyle dance showdown."
                ],
                price: "Entry fee: ₹250 per participant",
                rules: [
                    "Open style freestyle",
                    "DJ music only",
                    "Judges' decision final",
                ],
            },
        ],
    },

    /* ================= MUSIC ================= */
    music: {
        title: "music event",
        cards: [
            {
                image: "/images_events/music/1.png",
                name: "Battle of Bands",
                description: [
                    "Bands compete with original compositions and covers."
                ],
                price: "Entry fee: ₹500 per band",
                rules: [
                    "Minimum members: 3",
                    "Maximum members: 6",
                    "At least one original composition preferred",
                    "Time limit: 12 minutes including setup",
                ],
            },
            {
                image: "/images_events/music/2.png",
                name: "Rave Knight",
                description: [
                    "Electronic music, DJing, and live crowd control."
                ],
                price: "Entry fee: ₹300 per participant",
                rules: [
                    "Solo DJ event",
                    "Pre-mixed tracks not allowed",
                    "Equipment must be approved beforehand",
                ],
            },
        ],
    },

    /* ================= FASHION ================= */
    fashion: {
        title: "fashion event",
        cards: [
            {
                image: "/images_events/fashion/1.png",
                name: "Rampage",
                description: [
                    "Lights, camera, fashion! Designers showcase their creativity on the runway."
                ],
                price: "Entry fee: ₹300 per team",
                rules: [
                    "Minimum participants: 2",
                    "Maximum participants: 4",
                    "Theme: High-fashion runway showcase",
                    "At least one original design is mandatory",
                ],
            },
            {
                image: "/images_events/fashion/2.png",
                name: "CosCon",
                description: [
                    "Cosplay event featuring characters from anime, Bollywood, and Hollywood."
                ],
                price: "Entry fee: ₹250 per participant",
                rules: [
                    "Solo or group participation allowed",
                    "Characters must be recognizable",
                    "Props must be safe and non-hazardous",
                ],
            },
        ],
    },

    /* ================= THEATRE ================= */
    theatre: {
        title: "theatre event",
        cards: [
            {
                image: "/images_events/theatre/1.png",
                name: "Stage Play",
                description: [
                    "A full-length theatrical performance judged on storytelling and acting."
                ],
                price: "Entry fee: ₹400 per team",
                rules: [
                    "Minimum participants: 4",
                    "Maximum participants: 8",
                    "Time limit: 20 minutes",
                    "Live acting only (no pre-recorded audio)",
                ],
            },
            {
                image: "/images_events/theatre/2.png",
                name: "Nukkad Natak",
                description: [
                    "Street play with strong social messaging."
                ],
                price: "Entry fee: ₹300 per team",
                rules: [
                    "Open-air performance",
                    "No microphones allowed",
                    "Theme must convey a social message",
                ],
            },
        ],
    },

    /* ================= GAMING ================= */
    gaming: {
        title: "gaming event",
        cards: [
            {
                image: "/images_events/gaming/1.png",
                name: "Battledrome",
                description: [
                    "Competitive tactical FPS tournament."
                ],
                price: "Entry fee: ₹500 per team",
                rules: [
                    "5 players per team",
                    "Standard tournament rules apply",
                    "No cheating or exploits",
                ],
            },
        ],
    },
};