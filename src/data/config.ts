// src/data/config.ts
export type DayEntry = {
  title?: string;
  emojis?: string;      // 1ª pista (emojis)
  actors?: string[];    // 2ª pista (principales)
  poster?: string;      // 3ª pista (imagen; se ve con blur si está bloqueado)
  frame?: string;       // 4ª pista (imagen; se ve con blur si está bloqueado)
  finalTitle?: string;  // nombre final
  finalImage?: string;  // imagen final
  synopsis?: string;    // se muestra en el overlay de “Rendirse”
};

export const CONFIG: {
  year: number;
  month: number; // 0=enero … 9=octubre
  discordUrl?: string;
  days: Record<number, DayEntry>;
} = {
  year: 2025,
  month: 9, // Octubre
  discordUrl: "https://discord.gg/tu-servidor",

  days: {
    1: {
      title: "Coraline (2009)",
      emojis: "🧵🪡🔑",
      actors: ["Dakota Fanning (doblaje)", "Teri Hatcher (doblaje)"],
      poster: "/posters/coraline-2009.jpg",
      frame: "/frames/coraline-door.jpg",
      finalTitle: "Coraline (2009)",
      finalImage: "/final/coraline.jpg",
      synopsis:
        "Una niña curiosa descubre una puerta hacia un mundo alternativo que parece mejor que el suyo, hasta que la ‘Otra Madre’ revela sus intenciones. Fábula oscura en stop-motion con atmósfera inquietante.",
    },
    2: {
      title: "Get Out (2017)",
      emojis: "🌀🧠☕",
      actors: ["Daniel Kaluuya", "Allison Williams"],
      poster: "/posters/get-out-2017.jpg",
      frame: "/frames/getout-teacup.jpg",
      finalTitle: "Get Out (2017)",
      finalImage: "/final/getout.jpg",
      synopsis:
        "Chris visita a los padres de su novia y se topa con una hospitalidad tan perfecta como perturbadora. Un thriller psicológico con comentario social afilado y tensión que no suelta."
    },
    3: {
      title: "Pesadilla en Elm Street (1984)",
      emojis: "🔪🧤🛌",
      actors: ["Robert Englund", "Heather Langenkamp"],
      poster: "/posters/elm-street-1984.jpg",
      frame: "/frames/elmstreet-claws.jpg",
      finalTitle: "A Nightmare on Elm Street (1984)",
      finalImage: "/final/elmstreet.jpg",
      synopsis:
        "Un asesino con guante de cuchillas acecha a los adolescentes en sus sueños. Slasher sobrenatural icónico que convirtió a Freddy Krueger en leyenda del terror."
    },
    4: {
      title: "World War Z (2013)",
      emojis: "🌍🧟‍♂️✈️",
      actors: ["Brad Pitt", "Mireille Enos"],
      poster: "/posters/world-war-z-2013.jpg",
      frame: "/frames/wwz-wall.jpg",
      finalTitle: "World War Z (2013)",
      finalImage: "/final/wwz.jpg",
      synopsis:
        "Una pandemia fulminante desata enjambres de infectados. Un exinvestigador de la ONU recorre el mundo buscando una pista para detener la propagación. Acción apocalíptica a contrarreloj."
    },
    5: {
      title: "Beetlejuice (1988)",
      emojis: "👻⚰️🪲",
      actors: ["Michael Keaton", "Winona Ryder"],
      poster: "/posters/beetlejuice-1988.jpg",
      frame: "/frames/beetlejuice-sandworm.jpg",
      finalTitle: "Beetlejuice (1988)",
      finalImage: "/final/beetlejuice.jpg",
      synopsis:
        "Una pareja recién fallecida contrata a un bioexorcista para espantar a los vivos. Humor negro, estética gótica y una energía caótica inconfundible."
    },
    6: {
      title: "The Conjuring (2013)",
      emojis: "🏚️👻📸",
      actors: ["Vera Farmiga", "Patrick Wilson"],
      poster: "/posters/conjuring-2013.jpg",
      frame: "/frames/conjuring-basement.jpg",
      finalTitle: "The Conjuring (2013)",
      finalImage: "/final/conjuring.jpg",
      synopsis:
        "Los Warren investigan una presencia maligna en una granja aislada. Sustos efectivos y clasicismo de terror sobrenatural que aprieta sin descanso."
    },
    7: {
      title: "Halloween (2018)",
      emojis: "🎃🔪🏠",
      actors: ["Jamie Lee Curtis", "Judy Greer"],
      poster: "/posters/halloween-2018.jpg",
      frame: "/frames/halloween-myers.jpg",
      finalTitle: "Halloween (2018)",
      finalImage: "/final/halloween-2018.jpg",
      synopsis:
        "Laurie Strode se enfrenta a Michael Myers cuarenta años después. Secuela directa del clásico que recupera la tensión del acecho puro."
    },
    8: {
      title: "#Alive (2020)",
      emojis: "📱🏙️🧟‍♂️",
      actors: ["Yoo Ah-in", "Park Shin-hye"],
      poster: "/posters/alive-2020.jpg",
      frame: "/frames/alive-balcony.jpg",
      finalTitle: "#Alive (2020)",
      finalImage: "/final/alive.jpg",
      synopsis:
        "Un gamer queda atrapado en su apartamento durante un brote zombi y debe ingeniárselas para sobrevivir conectado al mundo por su móvil."
    },
    9: {
      title: "Hocus Pocus (1993)",
      emojis: "🧹🎃🧙‍♀️",
      actors: ["Bette Midler", "Sarah Jessica Parker"],
      poster: "/posters/hocus-pocus-1993.jpg",
      frame: "/frames/hocus-blackflame.jpg",
      finalTitle: "Hocus Pocus (1993)",
      finalImage: "/final/hocus.jpg",
      synopsis:
        "Tres brujas del siglo XVII regresan en Halloween y planean absorber la energía de los niños de Salem. Fantasía divertida con sabor a clásico familiar."
    },
    10: {
      title: "Saw X (2023)",
      emojis: "🧩🪚⛓️",
      actors: ["Tobin Bell", "Shawnee Smith"],
      poster: "/posters/saw-x-2023.jpg",
      frame: "/frames/sawx-trap.jpg",
      finalTitle: "Saw X (2023)",
      finalImage: "/final/sawx.jpg",
      synopsis:
        "John Kramer vuelve con juegos retorcidos y reglas implacables. Retoma la crudeza y el pulso moral de las primeras entregas."
    },
    11: {
      title: "The Sixth Sense (1999)",
      emojis: "👦👻🤫",
      actors: ["Bruce Willis", "Haley Joel Osment"],
      poster: "/posters/sixth-sense-1999.jpg",
      frame: "/frames/sixth-red-door.jpg",
      finalTitle: "The Sixth Sense (1999)",
      finalImage: "/final/sixth-sense.jpg",
      synopsis:
        "Un niño asegura ver a los muertos y un psicólogo intenta ayudarle. Suspense emocional con uno de los giros más célebres del cine."
    },
    12: {
      title: "Terrifier (2016)",
      emojis: "🤡🔪🩸",
      actors: ["David Howard Thornton", "Jenna Kanell"],
      poster: "/posters/terrifier-2016.jpg",
      frame: "/frames/terrifier-art.jpg",
      finalTitle: "Terrifier (2016)",
      finalImage: "/final/terrifier.jpg",
      synopsis:
        "Art the Clown aterroriza a varias víctimas en una noche sangrienta. Gore sin concesiones y estética de slasher extremo."
    },
    13: {
      title: "Train to Busan (2016)",
      emojis: "🚆🧟‍♀️🇰🇷",
      actors: ["Gong Yoo", "Ma Dong-seok"],
      poster: "/posters/train-to-busan-2016.jpg",
      frame: "/frames/busan-door.jpg",
      finalTitle: "Train to Busan (2016)",
      finalImage: "/final/busan.jpg",
      synopsis:
        "Un brote zombi estalla durante un viaje en tren. Acción trepidante con corazón y personajes que importan."
    },
    14: {
      title: "Hereditary (2018)",
      emojis: "🏠🕯️🪵",
      actors: ["Toni Collette", "Alex Wolff"],
      poster: "/posters/hereditary-2018.jpg",
      frame: "/frames/hereditary-dollhouse.jpg",
      finalTitle: "Hereditary (2018)",
      finalImage: "/final/hereditary.jpg",
      synopsis:
        "Tras la muerte de la abuela, una familia empieza a desmoronarse entre culpas y presencias. Horror psicológico denso y perturbador."
    },
    15: {
      title: "Five Nights at Freddy’s (2023)",
      emojis: "🧸🎮🔦",
      actors: ["Josh Hutcherson", "Matthew Lillard"],
      poster: "/posters/fnaf-2023.jpg",
      frame: "/frames/fnaf-animatronic.jpg",
      finalTitle: "Five Nights at Freddy’s (2023)",
      finalImage: "/final/fnaf.jpg",
      synopsis:
        "Un vigilante nocturno descubre que los animatrónicos de una pizzería están vivos y guardan un pasado siniestro."
    },
    16: {
      title: "La matanza de Texas (1974)",
      emojis: "⛓️🔨🪵",
      actors: ["Marilyn Burns", "Gunnar Hansen"],
      poster: "/posters/texas-chainsaw-1974.jpg",
      frame: "/frames/texas-leatherface.jpg",
      finalTitle: "The Texas Chain Saw Massacre (1974)",
      finalImage: "/final/texas-1974.jpg",
      synopsis:
        "Un grupo de jóvenes cae en manos de una familia caníbal en el Texas rural. Crudeza documental y terror primal."
    },
    17: {
      title: "La cura del bienestar (2016)",
      emojis: "🏛️💊🧪",
      actors: ["Dane DeHaan", "Mia Goth"],
      poster: "/posters/cure-wellness-2016.jpg",
      frame: "/frames/wellness-tank.jpg",
      finalTitle: "A Cure for Wellness (2016)",
      finalImage: "/final/wellness.jpg",
      synopsis:
        "Un ejecutivo viaja a un balneario alpino para traer de vuelta a su jefe y se topa con una institución de secretos enfermizos."
    },
    18: {
      title: "Zombieland (2009)",
      emojis: "🧟‍♂️🍔🎯",
      actors: ["Jesse Eisenberg", "Woody Harrelson", "Emma Stone"],
      poster: "/posters/zombieland-2009.jpg",
      frame: "/frames/zombieland-clown.jpg",
      finalTitle: "Zombieland (2009)",
      finalImage: "/final/zombieland.jpg",
      synopsis:
        "Cuatro supervivientes con reglas, hostilidad y humor negro recorren EE. UU. en un apocalipsis zombi repleto de gags."
    },
    19: {
      title: "Evil Dead Rise (2023)",
      emojis: "📖🩸🏢",
      actors: ["Lily Sullivan", "Alyssa Sutherland"],
      poster: "/posters/evil-dead-rise-2023.jpg",
      frame: "/frames/evildead-rise-elevator.jpg",
      finalTitle: "Evil Dead Rise (2023)",
      finalImage: "/final/evildead-rise.jpg",
      synopsis:
        "El Necronomicón desata una pesadilla en un edificio de apartamentos. Poseídos, gore creativo y ritmo endiablado."
    },
    20: {
      title: "Child’s Play (2019)",
      emojis: "🧸🔪📱",
      actors: ["Aubrey Plaza", "Gabriel Bateman"],
      poster: "/posters/childs-play-2019.jpg",
      frame: "/frames/chucky-reboot.jpg",
      finalTitle: "Child’s Play (2019)",
      finalImage: "/final/childsplay-2019.jpg",
      synopsis:
        "Nuevo origen para Chucky: un muñeco doméstico inteligente que desarrolla una peligrosa obsesión por su dueño."
    },
    21: {
      title: "28 Days Later (2002)",
      emojis: "🦠🏙️🚴",
      actors: ["Cillian Murphy", "Naomie Harris"],
      poster: "/posters/28-days-later-2002.jpg",
      frame: "/frames/28days-empty-london.jpg",
      finalTitle: "28 Days Later (2002)",
      finalImage: "/final/28days.jpg",
      synopsis:
        "Un virus de rabia convierte a los infectados en furia desatada. Londres desierto, cámara nerviosa y angustia posapocalíptica."
    },
    22: {
      title: "Insidious (2010)",
      emojis: "🛏️👥🔔",
      actors: ["Patrick Wilson", "Rose Byrne"],
      poster: "/posters/insidious-2010.jpg",
      frame: "/frames/insidious-red-faced.jpg",
      finalTitle: "Insidious (2010)",
      finalImage: "/final/insidious.jpg",
      synopsis:
        "Un niño cae en un coma misterioso y una presencia del Más Allá intenta poseerlo. Sustos de manual con identidad propia."
    },
    23: {
      title: "Scream VI (2023)",
      emojis: "🎭📞🔪",
      actors: ["Melissa Barrera", "Jenna Ortega"],
      poster: "/posters/scream-vi-2023.jpg",
      frame: "/frames/screamvi-subway.jpg",
      finalTitle: "Scream VI (2023)",
      finalImage: "/final/screamvi.jpg",
      synopsis:
        "Ghostface se muda a Nueva York para cazar a las hermanas Carpenter. Metaterror afilado con nuevas reglas."
    },
    24: {
      title: "El proyecto de la bruja de Blair (1999)",
      emojis: "📹🌲🪵",
      actors: ["Heather Donahue", "Joshua Leonard"],
      poster: "/posters/blair-witch-1999.jpg",
      frame: "/frames/blair-sticks.jpg",
      finalTitle: "The Blair Witch Project (1999)",
      finalImage: "/final/blair-1999.jpg",
      synopsis:
        "Tres estudiantes se pierden grabando una leyenda en el bosque. Found footage seminal de terror sugestivo."
    },
    25: {
      title: "Hellboy (2004)",
      emojis: "😈🔫🕯️",
      actors: ["Ron Perlman", "Selma Blair"],
      poster: "/posters/hellboy-2004.jpg",
      frame: "/frames/hellboy-horns.jpg",
      finalTitle: "Hellboy (2004)",
      finalImage: "/final/hellboy.jpg",
      synopsis:
        "Un demonio criado por humanos combate amenazas paranormales. Fantasía oscura con humor, músculo visual y mucho carisma."
    },
    26: {
      title: "El Exorcista (1973)",
      emojis: "⛪😈🛏️",
      actors: ["Ellen Burstyn", "Linda Blair"],
      poster: "/posters/exorcist-1973.jpg",
      frame: "/frames/exorcist-priest.jpg",
      finalTitle: "The Exorcist (1973)",
      finalImage: "/final/exorcist.jpg",
      synopsis:
        "La posesión de una niña lleva a dos sacerdotes a enfrentarse al Mal absoluto. Clásico mayúsculo del horror."
    },
    27: {
      title: "It (2017)",
      emojis: "🎈🤡🚲",
      actors: ["Jaeden Martell", "Bill Skarsgård"],
      poster: "/posters/it-2017.jpg",
      frame: "/frames/it-sewer.jpg",
      finalTitle: "It (2017)",
      finalImage: "/final/it-2017.jpg",
      synopsis:
        "El Club de los Perdedores se enfrenta a una entidad cambiante que despierta cada 27 años en Derry. Aventura y terror a flor de piel."
    },
    28: {
      title: "El resplandor (1980)",
      emojis: "🏨🪓👨‍👦",
      actors: ["Jack Nicholson", "Shelley Duvall"],
      poster: "/posters/shining-1980.jpg",
      frame: "/frames/shining-doors.jpg",
      finalTitle: "The Shining (1980)",
      finalImage: "/final/shining-1980.jpg",
      synopsis:
        "Un escritor acepta cuidar un hotel aislado durante el invierno y la cordura empieza a resquebrajarse. Terror hipnótico de Kubrick."
    },
    29: {
      title: "El silencio de los corderos (1991)",
      emojis: "🦋👁️‍🗨️🍷",
      actors: ["Jodie Foster", "Anthony Hopkins"],
      poster: "/posters/silence-lambs-1991.jpg",
      frame: "/frames/silence-mask.jpg",
      finalTitle: "The Silence of the Lambs (1991)",
      finalImage: "/final/silence.jpg",
      synopsis:
        "Una agente del FBI recurre a un brillante asesino caníbal para atrapar a otro criminal. Thriller psicológico impecable."
    },
    30: {
      title: "Viernes 13 (2009)",
      emojis: "🏕️🔪🛶",
      actors: ["Jared Padalecki", "Danielle Panabaker"],
      poster: "/posters/friday-13th-2009.jpg",
      frame: "/frames/friday-machete.jpg",
      finalTitle: "Friday the 13th (2009)",
      finalImage: "/final/friday2009.jpg",
      synopsis:
        "Un grupo de jóvenes acampa cerca de Crystal Lake y despierta la furia de Jason Voorhees. Reboot más crudo y directo."
    },
    31: {
      title: "Pesadilla antes de Navidad (1993)",
      emojis: "🎃🎄🎶",
      actors: ["Danny Elfman", "Catherine O'Hara"],
      poster: "/posters/nightmare-before-christmas-1993.jpg",
      frame: "/frames/nbc-jack-sally.jpg",
      finalTitle: "The Nightmare Before Christmas (1993)",
      finalImage: "/final/nbc.jpg",
      synopsis:
        "Jack Skellington, rey de Halloween, descubre la Navidad y decide apropiársela. Musical stop-motion con encanto macabro y cierre festivo."
    }
  }
};
