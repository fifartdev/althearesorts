const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

export type JournalSection = {
  heading?: string
  paragraphs: string[]
}

export type JournalPost = {
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  image: string
  imageAlt: string
  image2?: string
  image2Alt?: string
  sections?: JournalSection[]
}

export const JOURNAL_POSTS_EL: JournalPost[] = [
  {
    slug: 'ancient-corinth',
    category: 'Τοπικοί Οδηγοί',
    title: 'Αρχαία Κόρινθος: Ένα Πρωί Μακριά από Όλα',
    excerpt: 'Μία ώρα από έναν από τους πιο ισχυρούς πόλεις-κράτη της αρχαιότητας, ακόμα αρκετά ήσυχη για να νιώθεις σαν ανακάλυψη.',
    readTime: '5 λεπτά ανάγνωση',
    date: 'Μάιος 2025',
    image: 'https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Αρχαίοι κίονες στον Ναό του Απόλλωνα, Κόρινθος, Ελλάδα',
  },
  {
    slug: 'oceanis-philosophy',
    category: 'Ευεξία',
    title: 'Η Φιλοσοφία Πίσω από την Oceanis',
    excerpt: 'Ελληνική μυθολογία, πιστοποιημένα βιοδιασπώμενες φόρμουλες, και μια απόφαση που δεν χρειάστηκε εξήγηση.',
    readTime: '4 λεπτά ανάγνωση',
    date: 'Απρίλιος 2025',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Τελετουργικό spa ευεξίας Oceanis, Althea Resorts Ocean Spa, Κορινθία',
  },
  {
    slug: 'fishermen-harvest',
    category: 'Γαστρονομία',
    title: 'Αυτό που Φέρνουν οι Ψαράδες',
    excerpt: 'Πώς ένα εστιατόριο ταράτσας στην Κορινθία αρχίζει την ιστορία της βραδιάς του — στο λιμάνι, πριν την ανατολή.',
    readTime: '6 λεπτά ανάγνωση',
    date: 'Απρίλιος 2025',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Φρέσκα θαλασσινά από τον Κορινθιακό Κόλπο για το εστιατόριο AITHER, Althea Resorts',
  },
  {
    slug: 'corinth-canal',
    category: 'Κορινθία',
    title: `Η Διώρυγα της Κορίνθου: Πιο Κοντά απ' όσο Νομίζετε`,
    excerpt: 'Ένα από τα μεγαλύτερα έργα μηχανικής του δέκατου ένατου αιώνα, που εξακολουθεί να αφήνει τους επισκέπτες άφωνους.',
    readTime: '3 λεπτά ανάγνωση',
    date: 'Μάρτιος 2025',
    image: `${S}/Gallery-9VZMNYN.jpg`,
    imageAlt: 'Τοπίο Κορινθίας και ακτογραμμή κοντά στο Ξυλόκαστρο',
  },
  {
    slug: 'althos-meaning',
    category: 'Άρθρα Ξενοδοχείου',
    title: 'Περί Άλθους: Η Λέξη Πίσω από το Όνομα',
    excerpt: 'Πώς μια αρχαία ελληνική λέξη για θεραπεία έγινε σχέδιο, λειτουργική φιλοσοφία και ένας τόπος.',
    readTime: '7 λεπτά ανάγνωση',
    date: 'Μάρτιος 2025',
    image: `${S}/1.jpg`,
    imageAlt: 'Althea Resorts — το κατάλυμα στο Άνω Λουτρό, Ξυλόκαστρο, Κορινθία',
  },
  {
    slug: 'pool-afternoon',
    category: 'Ευεξία',
    title: 'Υπέρ του να Μην Κάνεις Τίποτα Δίπλα σε μια Πισίνα',
    excerpt: 'Μια υπεράσπιση του απογεύματος χωρίς σχέδιο, χωρίς πρόγραμμα και χωρίς ιδιαίτερο λόγο να κουνηθείς.',
    readTime: '3 λεπτά ανάγνωση',
    date: 'Φεβρουάριος 2025',
    image: '/images/outdoor-pool/althea-indoor-outdoor-15.jpg',
    imageAlt: 'Βεράντα πισίνας, Althea Resorts, Ξυλόκαστρο, Κορινθία',
  },
]

export const EL_JOURNAL_SLUGS = new Set(JOURNAL_POSTS_EL.map((p) => p.slug))
