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
        "Una niña curiosa descubre una puerta secreta a un mundo paralelo ideal, pero pronto revela su lado siniestro con la manipuladora 'Otra Madre'. Una fábula animada en stop-motion llena de fantasía oscura y lecciones sobre el hogar."
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
        "Un joven afroamericano visita a la familia de su novia blanca y desentierra un complot perturbador que combina hipnosis, racismo y control mental. Un thriller ingenioso que critica la sociedad con giros impactantes y humor negro."
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
        "Art the Clown siembra el terror en Navidad con asesinatos brutales y creativos, persiguiendo a supervivientes en un caos sangriento. Un slasher extremo que eleva el gore y el sadismo a niveles festivos e inolvidables."
    },
    4: {
      title: "Pesadilla en Elm Street (1984)",
      emojis: "🧤🔥🛌💤",
      actors: ["Robert Englund", "Heather Langenkamp", "Johnny Depp"],
      poster: "/posters/elm-street-1984.jpg",
      frame: "/frames/elmstreet-claws.jpg",
      finalTitle: "A Nightmare on Elm Street (1984)",
      finalImage: "/final/elmstreet.jpg",
      synopsis:
        "Freddy Krueger, un asesino quemado vivo, regresa para cazar a adolescentes en sus pesadillas, donde la muerte es real. Un clásico slasher sobrenatural que transforma el sueño en una trampa mortal llena de terror innovador."
    },
    5: {
      title: "World War Z (2013)",
      emojis: "🧟🌍✈️🧳",
      actors: ["Brad Pitt", "Mireille Enos", "Daniella Kertesz"],
      poster: "/posters/world-war-z-2013.jpg",
      frame: "/frames/wwz-wall.jpg",
      finalTitle: "World War Z (2013)",
      finalImage: "/final/wwz.jpg",
      synopsis:
        "Una plaga zombi global obliga a un exinvestigador de la ONU a viajar por el mundo en busca de una cura, enfrentando hordas veloces y caóticas. Una épica de supervivencia con acción intensa y escala apocalíptica."
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
        "Los parapsicólogos Ed y Lorraine Warren ayudan a una familia aterrorizada por entidades demoníacas en su granja embrujada. Un relato de posesión basado en hechos reales, con sustos escalofriantes y atmósfera opresiva."
    },
    7: {
      title: "Saw X (2023)",
      emojis: "🧩🪚🩸⛓️",
      actors: ["Tobin Bell", "Shawnee Smith", "Synnøve Macody Lund"],
      poster: "/posters/saw-x-2023.jpg",
      frame: "/frames/sawx-trap.jpg",
      finalTitle: "Saw X (2023)",
      finalImage: "/final/sawx.jpg",
      synopsis:
        "Jigsaw regresa con trampas ingeniosas y moralistas para castigar a estafadores médicos en México, explorando su origen y sed de justicia. Un capítulo sangriento que revitaliza la saga con giros sádicos y dilemas éticos."
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
        "Un niño con la capacidad de ver y comunicarse con los muertos busca ayuda de un psicólogo traumatizado, revelando secretos del más allá. Un drama sobrenatural con un giro inolvidable y exploración emocional del duelo."
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
        "Un padre y su hija quedan atrapados en un tren durante un apocalipsis zombi en Corea, luchando por sobrevivir con aliados improbables. Una mezcla emotiva de acción, sacrificio y crítica social en un viaje infernal."
    },
    10: {
      title: "Heretic (2024)",
      emojis: "⛪🗝️🕯️🧠",
      actors: ["Sophie Thatcher", "Chloe East", "Hugh Grant"],
      poster: "/posters/heretic-2024.jpg",
      frame: "/frames/heretic-hallway.jpg",
      finalTitle: "Heretic (2024)",
      finalImage: "/final/heretic.jpg",
      synopsis:
        "Dos jóvenes misioneras son invitadas a la casa de un hombre carismático que cuestiona su fe con juegos mentales y trampas mortales. Un thriller psicológico que deconstruye la religión con tensión claustrofóbica y diálogos afilados."
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
        "Un vigilante nocturno en una pizzería abandonada descubre que los animatrónicos poseídos ocultan un pasado siniestro y persiguen a intrusos. Adaptación fiel del videojuego con jumpscares y lore misterioso."
    },
    12: {
      title: "La matanza de Texas (1974)",
      emojis: "🔨⛓️🩸🌵",
      actors: ["Marilyn Burns", "Gunnar Hansen", "Edwin Neal"],
      poster: "/posters/texas-chainsaw-1974.jpg",
      frame: "/frames/texas-leatherface.jpg",
      finalTitle: "The Texas Chain Saw Massacre (1974)",
      finalImage: "/final/texas-1974.jpg",
      synopsis:
        "Un grupo de amigos se topa con una familia de caníbales en el rural Texas, liderada por el enmascarado Leatherface. Un hito del horror crudo y realista que define el slasher con brutalidad visceral y atmósfera asfixiante."
    },
    13: {
      title: "La cura del bienestar (2016)",
      emojis: "💊🧪🏞️🦌",
      actors: ["Dane DeHaan", "Mia Goth", "Jason Isaacs"],
      poster: "/posters/cure-wellness-2016.jpg",
      frame: "/frames/wellness-tank.jpg",
      finalTitle: "A Cure for Wellness (2016)",
      finalImage: "/final/wellness.jpg",
      synopsis:
        "Un ambicioso ejecutivo es enviado a un spa remoto en los Alpes para rescatar a su jefe, pero descubre tratamientos macabros y un culto a la longevidad. Un misterio gótico con visuales hipnóticos y horror corporal perturbador."
    },
    14: {
      title: "Hansel y Gretel: Cazadores de Brujas (2013)",
      emojis: "🧙🏹🍬🔥",
      actors: ["Jeremy Renner", "Gemma Arterton", "Famke Janssen"],
      poster: "/posters/hansel-gretel-2013.jpg",
      frame: "/frames/hanselgretel-crossbow.jpg",
      finalTitle: "Hansel & Gretel: Witch Hunters (2013)",
      finalImage: "/final/hanselgretel.jpg",
      synopsis:
        "Los hermanos Hansel y Gretel, traumatizados por su infancia, se convierten en cazadores de brujas armados con ingenio y armas modernas. Una fantasía oscura llena de acción explosiva, humor negro y mitología retorcida."
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
        "En un mundo postapocalíptico infestado de zombis, un grupo disfuncional de supervivientes viaja en busca de refugio, aplicando reglas hilarantes y enfrentando peligros absurdos. Comedia de horror con química irresistible y sátira zombie."
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
        "Una familia en un edificio de apartamentos libera demonios del Necronomicón, transformando a una madre en una entidad poseída y sangrienta. Un reinicio urbano con gore innovador y terror familiar intenso."
    },
    17: {
      title: "Child's Play (2019)",
      emojis: "🧸🤖🔪📱",
      actors: ["Aubrey Plaza", "Gabriel Bateman", "Brian Tyree Henry"],
      poster: "/posters/childs-play-2019.jpg",
      frame: "/frames/chucky-reboot.jpg",
      finalTitle: "Child's Play (2019)",
      finalImage: "/final/childsplay-2019.jpg",
      synopsis:
        "Un muñeco de IA defectuoso desarrolla una obsesión asesina por su joven dueño, hackeando dispositivos para sembrar el caos. Un remake moderno que fusiona tecnología, slasher y crítica a la inteligencia artificial."
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
        "Un hombre despierta de un coma en una Londres abandonada por un virus que convierte a las personas en infectados rabiosos. Un hito del horror posapocalíptico con realismo crudo, velocidad y exploración de la humanidad en crisis."
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
        "Una familia descubre que su hijo en coma está atrapado en un reino astral, atrayendo entidades malévolas al mundo real. Terror sobrenatural con proyecciones astrales, jumpscares efectivos y una mitología escalofriante."
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
        "Las supervivientes de Woodsboro se mudan a Nueva York, pero Ghostface las persigue con reglas nuevas y asesinatos más audaces. Un slasher meta que homenajea la saga mientras innova con escenarios urbanos y giros familiares."
    },
    21: {
      title: "El proyecto de la bruja de Blair (1999)",
      emojis: "📹🌲🪵🧍‍♀️",
      actors: ["Heather Donahue", "Joshua Leonard", "Michael C. Williams"],
      poster: "/posters/blair-witch-1999.jpg",
      frame: "/frames/blair-sticks.jpg",
      finalTitle: "The Blair Witch Project (1999)",
      finalImage: "/final/blair-1999.jpg",
      synopsis:
        "Tres cineastas documentan la leyenda de la Bruja de Blair en un bosque maldito, pero pronto se pierden en un terror psicológico y sobrenatural. El pionero del found footage que revolucionó el horror con realismo y sugestión."
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
        "El legendario cazador Van Helsing une fuerzas contra Drácula, Frankenstein y hombres lobo en una Transilvania gótica. Una aventura épica con efectos visuales espectaculares, acción trepidante y monstruos clásicos reinventados."
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
        "Una niña poseída por un demonio obliga a su madre a buscar ayuda en un exorcismo católico, desatando horrores físicos y espirituales. Un clásico del terror que explora la fe, el mal y lo sobrenatural con impacto duradero."
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
        "Un grupo de niños marginados en Derry une fuerzas contra Pennywise, un payaso shapeshifter que se alimenta de miedos infantiles cada 27 años. Adaptación fiel de Stephen King con amistad, terror y coming-of-age emotivo."
    },
    25: {
      title: "El resplandor (1980)",
      emojis: "🏨🪓👭❄️",
      actors: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
      poster: "/posters/shining-1980.jpg",
      frame: "/frames/shining-doors.jpg",
      finalTitle: "The Shining (1980)",
      finalImage: "/final/shining-1980.jpg",
      synopsis:
        "Un aspirante a escritor acepta cuidar un hotel aislado en invierno, pero fuerzas sobrenaturales lo llevan a la locura y la violencia familiar. Obra maestra de Kubrick que disecciona el aislamiento y el mal con imágenes icónicas."
    },
    26: {
      title: "El silencio de los corderos (1991)",
      emojis: "🦋👁️🍷🕵️‍♀️",
      actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
      poster: "/posters/silence-lambs-1991.jpg",
      frame: "/frames/silence-mask.jpg",
      finalTitle: "The Silence of the Lambs (1991)",
      finalImage: "/final/silence.jpg",
      synopsis:
        "Una joven agente del FBI consulta al caníbal Hannibal Lecter para cazar a un asesino que despelleja a sus víctimas. Un thriller psicológico magistral con actuaciones legendarias y exploración de la mente criminal."
    },
    27: {
      title: "Viernes 13 (2009)",
      emojis: "🏕️🔪🛶🏒",
      actors: ["Jared Padalecki", "Danielle Panabaker", "Derek Mears"],
      poster: "/posters/friday-13th-2009.jpg",
      frame: "/frames/friday-machete.jpg",
      finalTitle: "Friday the 13th (2009)",
      finalImage: "/final/friday2009.jpg",
      synopsis:
        "Jóvenes en busca de un amigo desaparecido despiertan la ira de Jason Voorhees en Crystal Lake, enfrentando su machete imparable. Un reboot slasher que actualiza el mito con gore moderno y tensión constante."
    },
    28: {
      title: "Speak No Evil (2022)",
      emojis: "🤐🏡🍽️😱",
      actors: ["Morten Burian", "Sidsel Siem Koch", "Fedja van Huêt"],
      poster: "/posters/speak-no-evil-2022.jpg",
      frame: "/frames/speakevil-dinner.jpg",
      finalTitle: "Speak No Evil (2022)",
      finalImage: "/final/speakevil.jpg",
      synopsis:
        "Una familia danesa acepta una invitación de vacaciones de una pareja holandesa aparentemente amigable, pero las normas sociales ocultan horrores crecientes. Un horror psicológico que critica la cortesía con escalofriante crudeza."
    },
    29: {
      title: "Los Otros (2001)",
      emojis: "🏠🌫️👻🕯️",
      actors: ["Nicole Kidman", "Fionnula Flanagan", "Christopher Eccleston"],
      poster: "/posters/los-otros-2001.jpg",
      frame: "/frames/others-candle.jpg",
      finalTitle: "The Others (2001)",
      finalImage: "/final/the-others.jpg",
      synopsis:
        "En una mansión victoriana, una madre protege a sus hijos fotosensibles de presencias inexplicables, cuestionando la realidad y lo sobrenatural. Un thriller gótico con giros ingeniosos y atmósfera de suspense clásico."
    },
    30: {
      title: "A Quiet Place: Day One (2024)",
      emojis: "🤫👽🗽🚀",
      actors: ["Lupita Nyong'o", "Joseph Quinn", "Djimon Hounsou"],
      poster: "/posters/a-quiet-place-day-one-2024.jpg",
      frame: "/frames/dayone-nyc.jpg",
      finalTitle: "A Quiet Place: Day One (2024)",
      finalImage: "/final/dayone.jpg",
      synopsis:
        "En el primer día de la invasión alienígena, una mujer en Nueva York debe navegar el caos urbano en absoluto silencio para sobrevivir a criaturas ciegas pero auditivamente letales. Precuela tensa con survival horror urbano."
    },
    31: {
      title: "Pesadilla antes de Navidad (1993)",
      emojis: "🎃🎄👻🎤",
      actors: ["Danny Elfman (voz)", "Catherine O'Hara (voz)", "Chris Sarandon (voz)"],
      poster: "/posters/nightmare-before-christmas-1993.jpg",
      frame: "/frames/nbc-jack-sally.jpg",
      finalTitle: "The Nightmare Before Christmas (1993)",
      finalImage: "/final/nbc.jpg",
      synopsis:
        "Jack Skellington, aburrido de Halloween, secuestra la Navidad para reinventarla con su estilo macabro, aprendiendo sobre la alegría verdadera. Un musical animado en stop-motion de Tim Burton, lleno de encanto festivo y oscuro."
    }
  }
};
