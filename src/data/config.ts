// src/data/config.ts
export type DayEntry = {
  title?: string;
  emojis?: string;
  actors?: string[];
  poster?: string;
  frame?: string;
  finalTitle?: string;
  finalImage?: string;
  synopsis?: string;
};

export const CONFIG: {
  year: number;
  month: number;
  discordUrl?: string;
  days: Record<number, DayEntry>;
} = {
  year: 2025,
  month: 9, // Octubre
  discordUrl: "https://discord.com/invite/qp7HM7URKy",

  days: {
    1: {
      title: "Coraline (2009)",
      emojis: "🧵🔑🚪🕸️",
      actors: ["Dakota Fanning (voz)", "Teri Hatcher (voz)", "Keith David (voz)"],
      poster: "/posters/coraline-2009.jpg",
      frame: "/frames/coraline-door.jpg",
      finalTitle: "Coraline (2009)",
      finalImage: "/final/coraline.jpg",
      synopsis:
        "Una niña curiosa descubre una puerta secreta a un mundo paralelo ideal, pero pronto revela su lado siniestro con la manipuladora 'Otra Madre'."
    },
    2: {
      title: "Get Out (2017)",
      emojis: "🌀☕🧠🏃‍♂️",
      actors: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
      poster: "/posters/get-out-2017.jpg",
      frame: "/frames/getout-teacup.jpg",
      finalTitle: "Get Out (2017)",
      finalImage: "/final/getout.jpg",
      synopsis:
        "Un joven visita a la familia de su novia y descubre un complot perturbador que mezcla hipnosis y racismo."
    },
    3: {
      title: "Terrifier 3 (2024)",
      emojis: "🤡🔪🎄🩸",
      actors: ["David Howard Thornton", "Lauren LaVera", "Samantha Scaffidi"],
      poster: "/posters/terrifier-3-2024.jpg",
      frame: "/frames/terrifier3-art.jpg",
      finalTitle: "Terrifier 3 (2024)",
      finalImage: "/final/terrifier3.jpg",
      synopsis:
        "Art the Clown aterroriza la Navidad con asesinatos brutales y creativos en este slasher extremo."
    },
    4: {
      title: "A Nightmare on Elm Street (1984)",
      emojis: "🧤🔥🛌💤",
      actors: ["Robert Englund", "Heather Langenkamp", "Johnny Depp"],
      poster: "/posters/elm-street-1984.jpg",
      frame: "/frames/elmstreet-claws.jpg",
      finalTitle: "A Nightmare on Elm Street (1984)",
      finalImage: "/final/elmstreet.jpg",
      synopsis:
        "Freddy Krueger regresa para cazar adolescentes en sus pesadillas, donde la muerte es real."
    },
    5: {
      title: "Ghostbusters: Afterlife (2021)",
      emojis: "👻🚗⚡🏚️",
      actors: ["Mckenna Grace", "Finn Wolfhard", "Paul Rudd"],
      poster: "/posters/ghostbusters-afterlife-2021.jpg",
      frame: "/frames/ghostbusters-afterlife.jpg",
      finalTitle: "Ghostbusters: Afterlife (2021)",
      finalImage: "/final/ghostbusters-afterlife.jpg",
      synopsis:
        "Un grupo de niños descubre la conexión de su familia con los Cazafantasmas originales en un pequeño pueblo."
    },
    6: {
      title: "The Conjuring (2013)",
      emojis: "🏚️👻🕯️📖",
      actors: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor"],
      poster: "/posters/conjuring-2013.jpg",
      frame: "/frames/conjuring-basement.jpg",
      finalTitle: "The Conjuring (2013)",
      finalImage: "/final/conjuring.jpg",
      synopsis:
        "Los Warren ayudan a una familia aterrorizada por entidades demoníacas en su granja embrujada."
    },
    7: {
      title: "Nosferatu (2024/2025)",
      emojis: "🧛🌙🏰🦇",
      actors: ["Bill Skarsgård", "Nicholas Hoult", "Lily-Rose Depp"],
      poster: "/posters/nosferatu-2025.jpg",
      frame: "/frames/nosferatu-castle.jpg",
      finalTitle: "Nosferatu (2024/2025)",
      finalImage: "/final/nosferatu.jpg",
      synopsis:
        "Robert Eggers reinventa el clásico vampírico con atmósfera gótica y terror renovado."
    },
    8: {
      title: "The Sixth Sense (1999)",
      emojis: "👦👻❄️🤝",
      actors: ["Bruce Willis", "Haley Joel Osment", "Toni Collette"],
      poster: "/posters/sixth-sense-1999.jpg",
      frame: "/frames/sixth-red-door.jpg",
      finalTitle: "The Sixth Sense (1999)",
      finalImage: "/final/sixth-sense.jpg",
      synopsis:
        "Un niño con la capacidad de ver muertos busca ayuda en un psicólogo traumatizado."
    },
    9: {
      title: "Train to Busan (2016)",
      emojis: "🚆🧟‍♂️💔👨‍👧",
      actors: ["Gong Yoo", "Ma Dong-seok", "Kim Su-an"],
      poster: "/posters/train-to-busan-2016.jpg",
      frame: "/frames/busan-door.jpg",
      finalTitle: "Train to Busan (2016)",
      finalImage: "/final/busan.jpg",
      synopsis:
        "Un padre y su hija quedan atrapados en un tren durante un apocalipsis zombi en Corea."
    },
    10: {
      title: "A Quiet Place: Day One (2024)",
      emojis: "🤫👽🗽🚀",
      actors: ["Lupita Nyong'o", "Joseph Quinn", "Djimon Hounsou"],
      poster: "/posters/a-quiet-place-day-one-2024.jpg",
      frame: "/frames/dayone-nyc.jpg",
      finalTitle: "A Quiet Place: Day One (2024)",
      finalImage: "/final/dayone.jpg",
      synopsis:
        "En el primer día de la invasión alienígena, una mujer en Nueva York lucha por sobrevivir en silencio."
    },
    11: {
      title: "Five Nights at Freddy's (2023)",
      emojis: "🧸🔦🎮🕹️",
      actors: ["Josh Hutcherson", "Matthew Lillard", "Elizabeth Lail"],
      poster: "/posters/fnaf-2023.jpg",
      frame: "/frames/fnaf-animatronic.jpg",
      finalTitle: "Five Nights at Freddy's (2023)",
      finalImage: "/final/fnaf.jpg",
      synopsis:
        "Un vigilante nocturno en una pizzería descubre que los animatrónicos están poseídos."
    },
    12: {
      title: "The Texas Chain Saw Massacre (1974)",
      emojis: "🔨⛓️🩸🌵",
      actors: ["Marilyn Burns", "Gunnar Hansen", "Edwin Neal"],
      poster: "/posters/texas-chainsaw-1974.jpg",
      frame: "/frames/texas-leatherface.jpg",
      finalTitle: "The Texas Chain Saw Massacre (1974)",
      finalImage: "/final/texas-1974.jpg",
      synopsis:
        "Un grupo de amigos se topa con una familia de caníbales en Texas, liderada por Leatherface."
    },
    13: {
      title: "The Haunted Mansion (2003)",
      emojis: "🏚️👻💍😂",
      actors: ["Eddie Murphy", "Marsha Thomason", "Terence Stamp"],
      poster: "/posters/haunted-mansion-2003.jpg",
      frame: "/frames/hauntedmansion2003.jpg",
      finalTitle: "The Haunted Mansion (2003)",
      finalImage: "/final/hauntedmansion2003.jpg",
      synopsis:
        "Un agente inmobiliario y su familia visitan una mansión embrujada llena de fantasmas y secretos."
    },
    14: {
      title: "The Addams Family (1991)",
      emojis: "🏠🕷️⚰️💀",
      actors: ["Anjelica Huston", "Raul Julia", "Christina Ricci"],
      poster: "/posters/addams-family-1991.jpg",
      frame: "/frames/addams-family.jpg",
      finalTitle: "The Addams Family (1991)",
      finalImage: "/final/addams.jpg",
      synopsis:
        "Los excéntricos Addams enfrentan a un impostor que afirma ser el tío Fester."
    },
    15: {
      title: "Zombieland (2009)",
      emojis: "🧟🍔🎡🔫",
      actors: ["Jesse Eisenberg", "Woody Harrelson", "Emma Stone"],
      poster: "/posters/zombieland-2009.jpg",
      frame: "/frames/zombieland-clown.jpg",
      finalTitle: "Zombieland (2009)",
      finalImage: "/final/zombieland.jpg",
      synopsis:
        "En un mundo postapocalíptico infestado de zombis, un grupo disfuncional busca sobrevivir con reglas absurdas."
    },
    16: {
      title: "Evil Dead Rise (2023)",
      emojis: "📖🩸🏢🛗",
      actors: ["Lily Sullivan", "Alyssa Sutherland", "Gabrielle Echols"],
      poster: "/posters/evil-dead-rise-2023.jpg",
      frame: "/frames/evildead-rise-elevator.jpg",
      finalTitle: "Evil Dead Rise (2023)",
      finalImage: "/final/evildead-rise.jpg",
      synopsis:
        "Una familia libera demonios del Necronomicón en un edificio de apartamentos."
    },
    17: {
      title: "Beetlejuice (1988)",
      emojis: "👻⚰️🕸️🎩",
      actors: ["Michael Keaton", "Winona Ryder", "Geena Davis"],
      poster: "/posters/beetlejuice-1988.jpg",
      frame: "/frames/beetlejuice.jpg",
      finalTitle: "Beetlejuice (1988)",
      finalImage: "/final/beetlejuice.jpg",
      synopsis:
        "Una pareja de fantasmas contrata a Beetlejuice para asustar a los nuevos dueños de su casa."
    },
    18: {
      title: "28 Days Later (2002)",
      emojis: "🦠🚴🏙️🌫️",
      actors: ["Cillian Murphy", "Naomie Harris", "Brendan Gleeson"],
      poster: "/posters/28-days-later-2002.jpg",
      frame: "/frames/28days-empty-london.jpg",
      finalTitle: "28 Days Later (2002)",
      finalImage: "/final/28days.jpg",
      synopsis:
        "Un hombre despierta en una Londres vacía tras un brote viral que convierte a las personas en infectados rabiosos."
    },
    19: {
      title: "Insidious (2010)",
      emojis: "🛏️👿🕰️🌑",
      actors: ["Patrick Wilson", "Rose Byrne", "Ty Simpkins"],
      poster: "/posters/insidious-2010.jpg",
      frame: "/frames/insidious-red-faced.jpg",
      finalTitle: "Insidious (2010)",
      finalImage: "/final/insidious.jpg",
      synopsis:
        "Un niño en coma queda atrapado en un reino astral, atrayendo entidades malévolas."
    },
    20: {
      title: "Scream VI (2023)",
      emojis: "🎭📞🗽🔪",
      actors: ["Melissa Barrera", "Jenna Ortega", "Mason Gooding"],
      poster: "/posters/scream-vi-2023.jpg",
      frame: "/frames/screamvi-subway.jpg",
      finalTitle: "Scream VI (2023)",
      finalImage: "/final/screamvi.jpg",
      synopsis:
        "Las supervivientes de Woodsboro se mudan a Nueva York, pero Ghostface las persigue con nuevas reglas."
    },
    21: {
      title: "The Blair Witch Project (1999)",
      emojis: "📹🌲🪵🧍‍♀️",
      actors: ["Heather Donahue", "Joshua Leonard", "Michael C. Williams"],
      poster: "/posters/blair-witch-1999.jpg",
      frame: "/frames/blair-sticks.jpg",
      finalTitle: "The Blair Witch Project (1999)",
      finalImage: "/final/blair-1999.jpg",
      synopsis:
        "Tres cineastas documentan la leyenda de la Bruja de Blair y se pierden en el bosque."
    },
    22: {
      title: "Van Helsing (2004)",
      emojis: "🦇🐺⚰️🗡️",
      actors: ["Hugh Jackman", "Kate Beckinsale", "Richard Roxburgh"],
      poster: "/posters/van-helsing-2004.jpg",
      frame: "/frames/vanhelsing-castle.jpg",
      finalTitle: "Van Helsing (2004)",
      finalImage: "/final/vanhelsing.jpg",
      synopsis:
        "Van Helsing lucha contra Drácula, Frankenstein y hombres lobo en Transilvania."
    },
    23: {
      title: "The Exorcist (1973)",
      emojis: "😈⛪🛏️🕊️",
      actors: ["Ellen Burstyn", "Linda Blair", "Max von Sydow"],
      poster: "/posters/exorcist-1973.jpg",
      frame: "/frames/exorcist-priest.jpg",
      finalTitle: "The Exorcist (1973)",
      finalImage: "/final/exorcist.jpg",
      synopsis:
        "Una niña poseída por un demonio obliga a su madre a buscar ayuda en un exorcismo católico."
    },
    24: {
      title: "It (2017)",
      emojis: "🎈🤡🚲🩸",
      actors: ["Jaeden Martell", "Bill Skarsgård", "Sophia Lillis"],
      poster: "/posters/it-2017.jpg",
      frame: "/frames/it-sewer.jpg",
      finalTitle: "It (2017)",
      finalImage: "/final/it-2017.jpg",
      synopsis:
        "Un grupo de niños lucha contra Pennywise, un payaso que se alimenta de sus miedos."
    },
    25: {
      title: "The Shining (1980)",
      emojis: "🏨🪓👭❄️",
      actors: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
      poster: "/posters/shining-1980.jpg",
      frame: "/frames/shining-doors.jpg",
      finalTitle: "The Shining (1980)",
      finalImage: "/final/shining-1980.jpg",
      synopsis:
        "Un escritor se convierte en un psicópata durante un invierno aislado en el Hotel Overlook."
    },
    26: {
      title: "The Silence of the Lambs (1991)",
      emojis: "🦋👁️🍷🕵️‍♀️",
      actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
      poster: "/posters/silence-lambs-1991.jpg",
      frame: "/frames/silence-mask.jpg",
      finalTitle: "The Silence of the Lambs (1991)",
      finalImage: "/final/silence.jpg",
      synopsis:
        "Una agente del FBI consulta a Hannibal Lecter para atrapar a un asesino en serie."
    },
    27: {
      title: "Halloween (1978)",
      emojis: "🎃🔪🏠👻",
      actors: ["Jamie Lee Curtis", "Donald Pleasence", "Nick Castle"],
      poster: "/posters/halloween-1978.jpg",
      frame: "/frames/halloween-mask.jpg",
      finalTitle: "Halloween (1978)",
      finalImage: "/final/halloween.jpg",
      synopsis:
        "Michael Myers escapa del manicomio y regresa a su ciudad para sembrar el terror en la noche de Halloween."
    },
    28: {
      title: "Trick 'r Treat (2007)",
      emojis: "🍬🎃📜🩸",
      actors: ["Anna Paquin", "Brian Cox", "Dylan Baker"],
      poster: "/posters/trick-r-treat-2007.jpg",
      frame: "/frames/trickrtreat-sam.jpg",
      finalTitle: "Trick 'r Treat (2007)",
      finalImage: "/final/trickrtreat.jpg",
      synopsis:
        "Historias entrelazadas en Halloween revelan las reglas no escritas de la noche más terrorífica."
    },
    29: {
      title: "The Others (2001)",
      emojis: "🏠🌫️👻🕯️",
      actors: ["Nicole Kidman", "Fionnula Flanagan", "Christopher Eccleston"],
      poster: "/posters/los-otros-2001.jpg",
      frame: "/frames/others-candle.jpg",
      finalTitle: "The Others (2001)",
      finalImage: "/final/the-others.jpg",
      synopsis:
        "En una mansión victoriana, una madre protege a sus hijos de presencias inexplicables."
    },
    30: {
      title: "Hocus Pocus (1993)",
      emojis: "🧙‍♀️🕯️🐈🎃",
      actors: ["Bette Midler", "Sarah Jessica Parker", "Kathy Najimy"],
      poster: "/posters/hocus-pocus-1993.jpg",
      frame: "/frames/hocuspocus.jpg",
      finalTitle: "Hocus Pocus (1993)",
      finalImage: "/final/hocuspocus.jpg",
      synopsis:
        "Tres brujas del siglo XVII regresan a Salem y deben ser detenidas por un grupo de jóvenes en Halloween."
    },
    31: {
      title: "The Nightmare Before Christmas (1993)",
      emojis: "🎃🎄👻🎤",
      actors: ["Danny Elfman (voz)", "Catherine O'Hara (voz)", "Chris Sarandon (voz)"],
      poster: "/posters/nightmare-before-christmas-1993.jpg",
      frame: "/frames/nbc-jack-sally.jpg",
      finalTitle: "The Nightmare Before Christmas (1993)",
      finalImage: "/final/nbc.jpg",
      synopsis:
        "Jack Skellington secuestra la Navidad para reinventarla con su estilo macabro, aprendiendo sobre la alegría verdadera."
    }
  }
};
