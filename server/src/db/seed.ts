import { drizzle } from "drizzle-orm/node-postgres";
import { categoriesTable, eventsTable } from "./schema";

const db = drizzle(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`);

(async () => {
    const categories = [{
        name: "Concert",
        id: "72c70382-5196-4f86-a41e-9a136760c5e7",
    }, {
        name: "Trail",
        id: "c521009e-73d4-4701-8701-18852154192f",
    }, {
        name: "Quest",
        id: "620cc84b-149d-44b0-b67c-5235b7452a28",
    }, {
        name: "Conference",
        id: "8b4e2831-bf89-40b9-9900-52336524214c",
    }, {
        name: "Festival",
        id: "1448449b-28e8-4e8b-9b0b-19ab005f2460",
    }, {
        name: "Theater",
        id: "c4002fa5-bb92-48f1-9c1a-3b10329e2598",
    }, {
        name: "Workshop",
        id: "169e3d7c-14f1-413f-8c8a-d64619581848",
    }, {
        name: "Exhibition",
        id: "20d1df60-80cd-47e6-a41e-55a31055b56d",
    }, {
        name: "Party",
        id: "92a74db5-c5bc-4a3e-8b3e-e876822c804b",
    }, {
        name: "Reading",
        id: "fdf2c9c2-0982-4332-985f-619180e7b235",
    }, {
        name: "Hackathon",
        id: "d75913f7-40aa-43a3-aa76-5b6a6686241d",
    }, {
        name: "Lecture",
        id: "2a0e0d97-5ea7-4a20-88a9-e63f055f8bf8",
    }, {
        name: "Tour",
        id: "beea17f7-4f85-4f37-9884-e827ccf3475d",
    }, {
        name: "Illegal",
        id: "beea17f7-4f85-4f37-9884-e827ccf3475c",
    }, {
        name: "Other",
        id: "2927ccf3-b3c5-44dc-a629-c94a13b87731",
    }]

    const events = [
        {
            title: "Okean Elzy Charity Concert",
            description: "A massive open-air event featuring the legendary Ukrainian rock band.",
            date: new Date("2026-06-15T19:00:00"),
            location: "NSC Olimpiyskiy, Kyiv",
            categoryId: "72c70382-5196-4f86-a41e-9a136760c5e7"
        },
        {
            title: "IT Arena 2026",
            description: "The premier tech conference in Eastern Europe bringing together founders, investors, and developers.",
            date: new Date("2026-09-25T09:00:00"),
            location: "Arena Lviv, Lviv",
            categoryId: "8b4e2831-bf89-40b9-9900-52336524214c"
        },
        {
            title: "Carpathian Ultra Trail",
            date: new Date("2026-07-10T05:00:00"),
            location: "Viche Maidan, Ivano-Frankivsk",
            categoryId: "c521009e-73d4-4701-8701-18852154192f"
        },
        {
            title: "Odesa International Film Festival",
            description: "Annual film festival celebrating independent and mainstream cinema from around the globe.",
            date: new Date("2026-08-14T18:30:00"),
            location: "Odesa National Academic Theater of Opera and Ballet, Odesa",
            categoryId: "1448449b-28e8-4e8b-9b0b-19ab005f2460"
        },
        {
            title: "Natalka Poltavka: A Modern Adaptation",
            date: new Date("2026-05-20T19:00:00"),
            location: "Gogol Music and Drama Theater, Poltava",
            categoryId: "c4002fa5-bb92-48f1-9c1a-3b10329e2598"
        },
        {
            title: "Underground Catacombs Tour",
            description: "Explore the massive and historic network of tunnels beneath the city.",
            date: new Date("2026-05-12T10:00:00"),
            location: "Nerubayske Village Entrance, Wild Odesa Catacombs, Odesa",
            categoryId: "beea17f7-4f85-4f37-9884-e827ccf3475d"
        },
        {
            title: "AI for Ukraine Hackathon",
            description: "A 48-hour challenge to build AI solutions for civic tech and reconstruction.",
            date: new Date("2026-10-02T17:00:00"),
            location: "Karazin Kharkiv National University, Kharkiv",
            categoryId: "d75913f7-40aa-43a3-aa76-5b6a6686241d"
        },
        {
            title: "Serhiy Zhadan Poetry Evening",
            date: new Date("2026-06-05T18:00:00"),
            location: "Menorah Center, Dnipro",
            categoryId: "fdf2c9c2-0982-4332-985f-619180e7b235"
        },
        {
            title: "Urban Legends City Quest",
            description: "Solve puzzles and find hidden landmarks scattered across the city center.",
            date: new Date("2026-05-18T14:00:00"),
            location: "Rynok Square, Lviv",
            categoryId: "620cc84b-149d-44b0-b67c-5235b7452a28"
        },
        {
            title: "Avant-Garde Art Exhibition",
            description: "Showcasing bold new works from emerging local artists.",
            date: new Date("2026-07-01T10:00:00"),
            location: "ILKO Gallery, Uzhhorod",
            categoryId: "20d1df60-80cd-47e6-a41e-55a31055b56d"
        },
        {
            title: "Traditional Pottery Workshop",
            date: new Date("2026-05-22T11:00:00"),
            location: "Ternopil Regional Art Museum, Ternopil",
            categoryId: "169e3d7c-14f1-413f-8c8a-d64619581848"
        },
        {
            title: "Rooftop Sunset Party",
            description: "Enjoy electronic music and cocktails with a panoramic view.",
            date: new Date("2026-06-20T21:00:00"),
            location: "Gulliver Business Center Rooftop, Kyiv",
            categoryId: "92a74db5-c5bc-4a3e-8b3e-e876822c804b"
        },
        {
            title: "Lecture: History of the Kyivan Rus",
            date: new Date("2026-05-15T16:00:00"),
            location: "Chernihiv Historical Museum, Chernihiv",
            categoryId: "2a0e0d97-5ea7-4a20-88a9-e63f055f8bf8"
        },
        {
            title: "Charity Pop-Up Market",
            description: "Local vendors gathering to sell homemade goods and crafts.",
            date: new Date("2026-05-30T09:00:00"),
            location: "European Square, Vinnytsia",
            categoryId: "2927ccf3-b3c5-44dc-a629-c94a13b87731"
        },
        {
            title: "DakhaBrakha Live Acoustic",
            description: "An intimate acoustic performance by the world-renowned ethno-chaos band.",
            date: new Date("2026-08-12T19:30:00"),
            location: "Lviv National Opera, Lviv",
            categoryId: "72c70382-5196-4f86-a41e-9a136760c5e7"
        },
        {
            title: "ONUKA Symphonic Show",
            date: new Date("2026-09-05T19:00:00"),
            location: "National Palace of Arts 'Ukraine', Kyiv",
            categoryId: "72c70382-5196-4f86-a41e-9a136760c5e7"
        },
        {
            title: "Boombox Open Air",
            description: "Rocking the summer night at the city park.",
            date: new Date("2026-07-25T20:00:00"),
            location: "Ibiza Beach Club, Odesa",
            categoryId: "72c70382-5196-4f86-a41e-9a136760c5e7"
        },
        {
            title: "Jamala: New Album Presentation",
            date: new Date("2026-10-10T19:00:00"),
            location: "Bartolomeo Best River Resort, Dnipro",
            categoryId: "72c70382-5196-4f86-a41e-9a136760c5e7"
        },
        {
            title: "Leopolis Jazz Fest 2026",
            description: "Five days of world-class jazz music across multiple stages.",
            date: new Date("2026-06-25T16:00:00"),
            location: "Bohdan Khmelnytskyi Culture Park, Lviv",
            categoryId: "1448449b-28e8-4e8b-9b0b-19ab005f2460"
        },
        {
            title: "Atlas Weekend",
            description: "The biggest music and arts festival in Eastern Europe.",
            date: new Date("2026-07-08T12:00:00"),
            location: "VDNG (Expocenter of Ukraine), Kyiv",
            categoryId: "1448449b-28e8-4e8b-9b0b-19ab005f2460"
        },
        {
            title: "Faine Misto",
            date: new Date("2026-07-30T10:00:00"),
            location: "Ternopil Hippodrome, Ternopil",
            categoryId: "1448449b-28e8-4e8b-9b0b-19ab005f2460"
        },
        {
            title: "GogolFest Contemporary Art Festival",
            description: "Multidisciplinary festival featuring theater, music, visual arts, and film.",
            date: new Date("2026-09-15T18:00:00"),
            location: "Khortytsia National Reserve, Zaporizhzhia",
            categoryId: "1448449b-28e8-4e8b-9b0b-19ab005f2460"
        },
        {
            title: "UX/UI Design Crash Course",
            description: "A practical weekend workshop for beginners in digital design.",
            date: new Date("2026-06-06T10:00:00"),
            location: "Fabrika.space, Kharkiv",
            categoryId: "169e3d7c-14f1-413f-8c8a-d64619581848"
        },
        {
            title: "Traditional Petrykivka Painting",
            date: new Date("2026-08-01T11:00:00"),
            location: "Poltava Art Museum, Poltava",
            categoryId: "169e3d7c-14f1-413f-8c8a-d64619581848"
        },
        {
            title: "Creative Writing Masterclass",
            description: "Unlock your storytelling potential with renowned local authors.",
            date: new Date("2026-11-07T14:00:00"),
            location: "Chernivtsi National University, Chernivtsi",
            categoryId: "169e3d7c-14f1-413f-8c8a-d64619581848"
        },
        {
            title: "Forest Song (Lisova Pisnia)",
            description: "A visually stunning adaptation of Lesya Ukrainka's classic masterpiece.",
            date: new Date("2026-05-28T19:00:00"),
            location: "Volyn Academic Regional Drama Theater, Lutsk",
            categoryId: "c4002fa5-bb92-48f1-9c1a-3b10329e2598"
        },
        {
            title: "Modern Improv Comedy Night",
            date: new Date("2026-06-12T20:00:00"),
            location: "October Palace, Kyiv",
            categoryId: "c4002fa5-bb92-48f1-9c1a-3b10329e2598"
        },
        {
            title: "DefTech Solutions Hackathon",
            description: "Innovating defense tech and cybersecurity solutions for national safety.",
            date: new Date("2026-09-18T17:00:00"),
            location: "UNIT.City, Kyiv",
            categoryId: "d75913f7-40aa-43a3-aa76-5b6a6686241d"
        },
        {
            title: "Castles of Zakarpattia Weekend",
            description: "A guided tour exploring the medieval fortresses of the region.",
            date: new Date("2026-08-22T08:00:00"),
            location: "Palanok Castle, Mukachevo",
            categoryId: "beea17f7-4f85-4f37-9884-e827ccf3475d"
        },
        {
            title: "The Architecture of Ukrainian Modernism",
            date: new Date("2026-07-15T18:30:00"),
            location: "Promprylad.Renovation, Ivano-Frankivsk",
            categoryId: "2a0e0d97-5ea7-4a20-88a9-e63f055f8bf8"
        },
        {
            title: "Chornohora Sky Marathon",
            description: "A grueling race across the highest peaks of the Ukrainian Carpathians.",
            date: new Date("2026-08-16T05:30:00"),
            location: "Pip Ivan Observatory Base, Rakhiv",
            categoryId: "c521009e-73d4-4701-8701-18852154192f"
        }
    ];

    console.log("Seed start");
    await db.insert(categoriesTable).values(categories);
    await db.insert(eventsTable).values(events);
    console.log("Seed done");
})();
