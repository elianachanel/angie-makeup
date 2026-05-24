import type { Locale } from "@/i18n/locales";
import type { AboutTabId, GalleryCategoryId } from "@/lib/data";

export type GalleryCategory = {
  id: GalleryCategoryId;
  label: string;
  tagline: string;
  images: { src: string; alt: string }[];
};

export type LocaleContent = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    services: string;
    gallery: string;
    book: string;
    reviews: string;
    contact: string;
    bookNow: string;
    openMenu: string;
    closeMenu: string;
  };
  brand: { proTitle: string; tagline: string; location: string };
  hero: {
    imageAlt: string;
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    ctaBook: string;
    ctaGallery: string;
    stats: { value: string; label: string }[];
  };
  about: {
    label: string;
    title: string;
    description: string;
    proBadge: string;
    tabs: {
      id: AboutTabId;
      label: string;
      title: string;
      content: string[];
      highlights: string[];
    }[];
  };
  services: {
    label: string;
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      price: string;
      features: string[];
    }[];
  };
  gallery: {
    label: string;
    title: string;
    description: string;
    categories: Record<
      GalleryCategoryId,
      { label: string; tagline: string; alts: string[] }
    >;
  };
  booking: {
    label: string;
    title: string;
    description: string;
    successTitle: string;
    successBody: string;
    bookAnother: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      service: string;
      date: string;
      time: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    submit: string;
    dateHintFrom: string;
    pastDatesBlocked: string;
    todayTimesHint: string;
    selectDateFirst: string;
    noTimesToday: string;
    errors: {
      pastDate: string;
      pastDatePick: string;
      pastTime: string;
      noSlotsToday: string;
    };
  };
  testimonials: {
    label: string;
    title: string;
    description: string;
    items: { name: string; role: string; quote: string }[];
  };
  contact: {
    label: string;
    title: string;
    whatsapp: string;
    fields: { name: string; email: string; message: string };
    placeholders: { name: string; email: string; message: string };
    submit: string;
    successTitle: string;
    successBody: string;
  };
  footer: { crafted: string };
  floating: { whatsapp: string; instagram: string; email: string };
};

const es: LocaleContent = {
  meta: {
    title: "Angie Makeup | Maquilladora Profesional de Lujo",
    description:
      "Maquillaje premium para novias, glam, editorial y eventos. Reserva con Angie — Makeup Artist Pro.",
  },
  nav: {
    about: "Sobre mí",
    services: "Servicios",
    gallery: "Galería",
    book: "Reservar",
    reviews: "Reseñas",
    contact: "Contacto",
    bookNow: "Reservar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  brand: {
    proTitle: "Makeup Artist Pro",
    tagline: "Arte de belleza de lujo",
    location: "Disponible en todo el mundo · Base en Miami",
  },
  hero: {
    imageAlt: "Productos de maquillaje sobre fondo rosa — flat lay de belleza",
    badge: "Makeup Artist Pro",
    line1: "Fabulosamente",
    line2: "impecable.",
    line3: "Siempre. Sin. Excepción.",
    subtitle:
      "Angie Makeup — Makeup Artist Pro. Novias, glam, editorial y eventos VIP. Tu rostro, su obra maestra.",
    ctaBook: "Reserva tu glam",
    ctaGallery: "Ver los looks",
    stats: [
      { value: "500+", label: "Rostros glam" },
      { value: "8+", label: "Años pro" },
      { value: "100%", label: "Acabado luxury" },
    ],
  },
  about: {
    label: "Sobre Angie",
    title: "Conoce a tu Makeup Artist Pro",
    description:
      "Descubre a la artista, su técnica y la filosofía glam detrás de cada rostro impecable.",
    proBadge: "Artista pro",
    tabs: [
      {
        id: "me",
        label: "Sobre mí",
        title: "Hola, soy Angie",
        content: [
          "Soy maquilladora profesional obsesionada con la piel luminosa, el glam esculpido y looks que se sienten caros desde que entras al salón.",
          "Desde mañanas de novia hasta sets editoriales, traigo calma, técnica impecable y una energía que hace sentir a cada clienta como protagonista.",
        ],
        highlights: ["Miami · viaja al mundo", "Español e inglés", "Piel primero"],
      },
      {
        id: "artist",
        label: "La artista",
        title: "Makeup Artist Pro",
        content: [
          "Angie es artista certificada en técnicas HD, cámara y larga duración para eventos de lujo y clientas fashion.",
          "Su kit solo tiene fórmulas premium: se funden en la piel, brillan en fotos y aguantan hasta el último brindis.",
        ],
        highlights: ["Certificada HD", "Kit pro premium", "En locación y set"],
      },
      {
        id: "philosophy",
        label: "Filosofía",
        title: "Belleza, elevada",
        content: [
          "Cada rostro cuenta una historia. Mi trabajo es amplificar la tuya — nunca taparla. Estructura suave, glow intencional y detalles perfectos en cada ángulo.",
          "El maquillaje de lujo debe sentirse natural: tú, pero al máximo.",
        ],
        highlights: ["Realzar, no cubrir", "Color a tu medida", "Clásico + tendencia"],
      },
      {
        id: "expertise",
        label: "Expertise",
        title: "Lo que mejor hago",
        content: [
          "Glam de novia que aguanta lágrimas y baile. Esculpido red carpet. Conceptos editoriales. Eventos con atención VIP para cada invitada.",
          "Si hay espejo, momento y cámara — te tengo.",
        ],
        highlights: ["Novias y eventos", "Editorial", "Transformaciones glam"],
      },
    ],
  },
  services: {
    label: "Servicios",
    title: "Experiencias de belleza curadas",
    description:
      "Cada servicio se adapta a tus rasgos, ocasión y visión — con productos de lujo y técnica impecable.",
    items: [
      {
        id: "bridal",
        title: "Maquillaje de novia",
        description:
          "Looks atemporales y listos para cámara, adaptados a tu piel, vestido y estética nupcial.",
        price: "Desde $350",
        features: ["Sesión de prueba", "Kit de retoque", "A domicilio"],
      },
      {
        id: "glam",
        title: "Maquillaje glam",
        description:
          "Glow de red carpet con rasgos esculpidos, piel luminosa y acabado de impacto.",
        price: "Desde $220",
        features: ["Pestañas incluidas", "Rostro completo", "Sesión 2–3 h"],
      },
      {
        id: "photoshoot",
        title: "Maquillaje editorial",
        description:
          "Arte para estudio, campañas y dirección creativa con acabado HD.",
        price: "Desde $280",
        features: ["Acabado HD", "Looks creativos", "Colaboración con fotógrafo"],
      },
      {
        id: "event",
        title: "Maquillaje para eventos",
        description:
          "Elegancia para la noche y ocasiones especiales — del atardecer al último baile.",
        price: "Desde $180",
        features: ["Larga duración", "En sitio", "Tarifas grupales"],
      },
    ],
  },
  gallery: {
    label: "Portafolio",
    title: "Looks por categoría",
    description:
      "Explora los estilos que Angie domina — toca cada tipo de maquillaje y siente la energía glam.",
    categories: {
      bridal: {
        label: "Novia",
        tagline: "Etéreo, romántico, inolvidable",
        alts: [
          "Glam nupcial romántico suave",
          "Close-up glow de novia",
          "Elegancia nupcial clásica",
          "Belleza nupcial natural",
        ],
      },
      glam: {
        label: "Glam",
        tagline: "Red carpet · impacto total",
        alts: [
          "Glam hora dorada",
          "Glam inspirado en pasarela",
          "Maquillaje glam esculpido",
          "Glam nocturno de lujo",
        ],
      },
      photoshoot: {
        label: "Editorial",
        tagline: "Creativo · editorial · HD",
        alts: [
          "Concepto beauty editorial",
          "Maquillaje de estudio",
          "Look fashion editorial",
          "Shoot beauty creativo",
        ],
      },
      event: {
        label: "Eventos",
        tagline: "Fiestas · galas · celebraciones",
        alts: [
          "Maquillaje para evento nocturno",
          "Glow lista para gala",
          "Glam ocasión especial",
          "Look luxury salida de noche",
        ],
      },
    },
  },
  booking: {
    label: "Reserva",
    title: "Reserva tu sesión",
    description: "Con Angie — Makeup Artist Pro. Solo fechas desde hoy en adelante.",
    successTitle: "Solicitud recibida",
    successBody: "Gracias, {name}. Angie — Makeup Artist Pro confirmará tu cita el",
    bookAnother: "Reservar otra fecha",
    fields: {
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      service: "Servicio",
      date: "Fecha preferida",
      time: "Hora preferida",
      message: "Mensaje",
    },
    placeholders: {
      name: "Tu nombre",
      email: "tu@email.com",
      phone: "+1 (000) 000-0000",
      message: "Cuéntanos sobre tu evento, lugar y visión...",
    },
    submit: "Enviar reserva",
    dateHintFrom: "Desde",
    pastDatesBlocked: "fechas pasadas bloqueadas",
    todayTimesHint: "Solo horarios futuros para hoy",
    selectDateFirst: "Elige una fecha primero",
    noTimesToday: "Sin horarios hoy — elige otra fecha",
    errors: {
      pastDate: "Elige hoy o una fecha futura.",
      pastDatePick: "No hay fechas pasadas. Elige hoy o después.",
      pastTime: "Esa hora ya pasó. Elige un horario más tarde.",
      noSlotsToday: "No quedan horarios hoy. Elige otra fecha.",
    },
  },
  testimonials: {
    label: "Testimonios",
    title: "Amadas por sus clientas",
    description:
      "Palabras de novias, creativas y mujeres que confiaron en Angie en sus momentos más importantes.",
    items: [
      {
        name: "Sofía M.",
        role: "Novia",
        quote:
          "Angie entendió mi visión al instante. Me sentí la versión más bella de mí — radiante, elegante y totalmente yo.",
      },
      {
        name: "Valentina R.",
        role: "Cliente editorial",
        quote:
          "Su detalle en set no tiene comparación. Cada ángulo perfecto. Una verdadera artista con ejecución de lujo.",
      },
      {
        name: "Camila L.",
        role: "Invitada de gala",
        quote:
          "Mi maquillaje duró toda la noche sin retoque. Suave, glamuroso y absolutamente impresionante.",
      },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Creemos tu look",
    whatsapp: "Escribir a Angie",
    fields: { name: "Nombre", email: "Email", message: "Mensaje" },
    placeholders: {
      name: "Tu nombre",
      email: "tu@email.com",
      message: "¿En qué podemos ayudarte?",
    },
    submit: "Enviar mensaje",
    successTitle: "Mensaje enviado",
    successBody: "Gracias por escribir. Angie te responderá muy pronto.",
  },
  footer: { crafted: "Creado con elegancia." },
  floating: { whatsapp: "WhatsApp", instagram: "Instagram", email: "Email" },
};

const en: LocaleContent = {
  meta: {
    title: "Angie Makeup | Luxury Makeup Artist",
    description:
      "Ultra-premium makeup for bridal, glam, editorial and events. Book Angie — Makeup Artist Pro.",
  },
  nav: {
    about: "About",
    services: "Services",
    gallery: "Gallery",
    book: "Book",
    reviews: "Reviews",
    contact: "Contact",
    bookNow: "Book Now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  brand: {
    proTitle: "Makeup Artist Pro",
    tagline: "Luxury Beauty Artistry",
    location: "Available worldwide · Based in Miami",
  },
  hero: {
    imageAlt: "Makeup products on pink background — beauty flat lay",
    badge: "Makeup Artist Pro",
    line1: "Fabulously",
    line2: "flawless.",
    line3: "Every. Single. Time.",
    subtitle:
      "Angie Makeup — Makeup Artist Pro. Bridal queens, glam icons, editorial muses & event royalty. Your face, her masterpiece.",
    ctaBook: "Book the glam",
    ctaGallery: "See the looks",
    stats: [
      { value: "500+", label: "Faces glam'd" },
      { value: "8+", label: "Years pro" },
      { value: "100%", label: "Luxury finish" },
    ],
  },
  about: {
    label: "About Angie",
    title: "Meet your Makeup Artist Pro",
    description:
      "Discover the artist, the craft, and the glam philosophy behind every flawless face.",
    proBadge: "Pro artist",
    tabs: [
      {
        id: "me",
        label: "About Me",
        title: "Hi, I'm Angie",
        content: [
          "I'm a professional makeup artist obsessed with luminous skin, sculpted glam, and looks that feel expensive the moment you walk in the room.",
          "From quiet bridal mornings to high-energy editorial sets, I bring calm energy, flawless technique, and a vibe that makes every client feel like the main character.",
        ],
        highlights: ["Miami-based · travels worldwide", "English & Spanish", "Skin-first artistry"],
      },
      {
        id: "artist",
        label: "The Artist",
        title: "Makeup Artist Pro",
        content: [
          "Angie is a certified pro artist trained in HD, camera-ready, and long-wear techniques for luxury events and fashion-forward clients.",
          "Her kit features only premium formulas — the kind that melt into skin, photograph like silk, and survive champagne toasts without losing the glow.",
        ],
        highlights: ["HD & editorial certified", "Premium pro kit", "On-set & on-location"],
      },
      {
        id: "philosophy",
        label: "Philosophy",
        title: "Beauty, elevated",
        content: [
          "Every face tells a story. My job is to amplify yours — never mask it. Soft structure, intentional glow, and details that look intentional from every angle.",
          "I believe luxury makeup should feel effortless: you look like you, but turned all the way up.",
        ],
        highlights: ["Enhance, never cover", "Custom color matching", "Timeless + trendy balance"],
      },
      {
        id: "expertise",
        label: "Expertise",
        title: "What I do best",
        content: [
          "Bridal glam that lasts through tears and dancing. Red-carpet sculpting. Creative editorial concepts. Group events with VIP-level attention for every guest.",
          "If it involves a mirror, a moment, and a camera — I've got you.",
        ],
        highlights: ["Bridal & events", "Editorial & campaigns", "Glam transformations"],
      },
    ],
  },
  services: {
    label: "Services",
    title: "Curated beauty experiences",
    description:
      "Every service is tailored to your features, occasion, and vision — executed with luxury products and flawless technique.",
    items: [
      {
        id: "bridal",
        title: "Bridal Makeup",
        description:
          "Timeless, camera-ready bridal looks tailored to your skin, dress, and wedding aesthetic.",
        price: "From $350",
        features: ["Trial session", "Touch-up kit", "On-location"],
      },
      {
        id: "glam",
        title: "Glam Makeup",
        description:
          "Red-carpet glow with sculpted features, luminous skin, and statement-ready finishes.",
        price: "From $220",
        features: ["Lashes included", "Full face", "2–3 hour session"],
      },
      {
        id: "photoshoot",
        title: "Photoshoot Makeup",
        description:
          "Editorial artistry designed for studio lighting, campaigns, and creative direction.",
        price: "From $280",
        features: ["HD finish", "Creative looks", "Artist collaboration"],
      },
      {
        id: "event",
        title: "Event Makeup",
        description:
          "Elegant evening and special-occasion makeup that lasts from golden hour to last dance.",
        price: "From $180",
        features: ["Long-wear formulas", "On-site", "Group rates"],
      },
    ],
  },
  gallery: {
    label: "Portfolio",
    title: "Looks by category",
    description:
      "Browse the styles Angie masters — tap each type of makeup to explore real glam energy.",
    categories: {
      bridal: {
        label: "Bridal",
        tagline: "Ethereal, romantic, unforgettable",
        alts: [
          "Soft romantic bridal glam",
          "Bridal glow close-up",
          "Classic bridal elegance",
          "Natural bridal beauty",
        ],
      },
      glam: {
        label: "Glam",
        tagline: "Red carpet · full impact",
        alts: [
          "Golden hour glam",
          "Runway-inspired glam",
          "Sculpted glam makeup",
          "Luxury evening glam",
        ],
      },
      photoshoot: {
        label: "Photoshoot",
        tagline: "Editorial · creative · HD",
        alts: [
          "Editorial beauty concept",
          "Studio photoshoot makeup",
          "Fashion editorial look",
          "Creative beauty shoot",
        ],
      },
      event: {
        label: "Events",
        tagline: "Parties · galas · celebrations",
        alts: [
          "Evening event makeup",
          "Gala-ready glow",
          "Special occasion glam",
          "Night-out luxury look",
        ],
      },
    },
  },
  booking: {
    label: "Reservation",
    title: "Book your session",
    description: "Book with Angie — Makeup Artist Pro. Dates from today onward only.",
    successTitle: "Request received",
    successBody: "Thank you, {name}. Angie — Makeup Artist Pro will confirm your appointment on",
    bookAnother: "Book another date",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      date: "Preferred date",
      time: "Preferred time",
      message: "Message",
    },
    placeholders: {
      name: "Your name",
      email: "you@email.com",
      phone: "+1 (000) 000-0000",
      message: "Tell us about your event, venue, and vision...",
    },
    submit: "Submit reservation",
    dateHintFrom: "From",
    pastDatesBlocked: "past dates blocked",
    todayTimesHint: "Only upcoming times shown for today",
    selectDateFirst: "Select a date first",
    noTimesToday: "No times left today — pick another date",
    errors: {
      pastDate: "Please choose today or a future date.",
      pastDatePick: "Past dates are not available. Pick today or later.",
      pastTime: "That time has already passed. Choose a later slot.",
      noSlotsToday: "No times left for today. Please pick another date.",
    },
  },
  testimonials: {
    label: "Testimonials",
    title: "Loved by clients",
    description:
      "Kind words from brides, creatives, and women who trusted Angie with their most important moments.",
    items: [
      {
        name: "Sofía M.",
        role: "Bride",
        quote:
          "Angie understood my vision instantly. I felt like the most beautiful version of myself — glowing, elegant, and completely me.",
      },
      {
        name: "Valentina R.",
        role: "Editorial Client",
        quote:
          "Her attention to detail on set is unmatched. Every angle looked flawless. A true artist with luxury-level execution.",
      },
      {
        name: "Camila L.",
        role: "Gala Guest",
        quote:
          "My makeup lasted the entire night without a single touch-up. Soft, glamorous, and absolutely stunning.",
      },
    ],
  },
  contact: {
    label: "Contact",
    title: "Let's create your look",
    whatsapp: "Message Angie",
    fields: { name: "Name", email: "Email", message: "Message" },
    placeholders: {
      name: "Your name",
      email: "you@email.com",
      message: "How can we help?",
    },
    submit: "Send message",
    successTitle: "Message sent",
    successBody: "Thanks for reaching out. Angie will reply shortly.",
  },
  footer: { crafted: "Crafted with elegance." },
  floating: { whatsapp: "WhatsApp", instagram: "Instagram", email: "Email" },
};

export const localeContent: Record<Locale, LocaleContent> = { es, en };
