import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300

function para(text: string) {
  return {
    children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
    direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1,
  }
}
function richText(...paragraphs: string[]) {
  return { root: { children: paragraphs.map(para), direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } }
}

// ─── Rooms ────────────────────────────────────────────────────────────────────
// Rooms.title is NOT localized — never include it here or it overwrites the English title.
// Lookup by `category` (fixed enum, never changes).
// Also repairs English titles that got corrupted by previous seed runs.

const ROOM_TITLE_REPAIR: Record<string, string> = {
  'standard-double':    'Standard Double',
  'deluxe-double-mv-pv': 'Deluxe Double M.V / P.V.',
  'deluxe-private-pool': 'Deluxe Double with Private Pool',
  'superior-sea-view':  'Superior Sea View Room',
  'junior-suite':       'Junior Suite with Private Pool',
  'loft-suite':         'Althea Loft Suite Outdoor Jacuzzi',
}

const ROOM_TRANSLATIONS: Record<string, Record<string, unknown>> = {
  'standard-double': {
    tagline: 'Το Σωστό Δωμάτιο στη Σωστή Θέση',
    viewType: 'Θέα Βουνό ή Κήπο',
    shortDescription: `Το Standard Double του Althea είναι ό,τι σημαίνει ένα καλά σχεδιασμένο δωμάτιο: άνετο, ήσυχο, με φυσικά υλικά και ένα μπαλκόνι που σας υπενθυμίζει πού βρίσκεστε. Ιδανικό για ζεύγη ή μεμονωμένους επισκέπτες.`,
    description: richText(
      `Το Standard Double του Althea είναι ό,τι σημαίνει ένα καλά σχεδιασμένο δωμάτιο: άνετο, ήσυχο, με φυσικά υλικά και ένα μπαλκόνι που σας υπενθυμίζει πού βρίσκεστε.`,
      `Το μπαλκόνι κοιτάζει στον κήπο. Το μπάνιο διαθέτει προϊόντα Oceanis — πιστοποιημένα βιοδιασπώμενα, vegan καλλυντικά. WiFi, κλιματισμός, επίπεδη τηλεόραση και minibar συμπληρώνουν το δωμάτιο.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size ή δύο μονά' }, { label: 'Ιδιωτικό μπαλκόνι' },
      { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Minibar' }, { label: 'Ηχομόνωση' },
    ],
  },
  'deluxe-double-mv-pv': {
    tagline: 'Ένα Δωμάτιο που Δικαιώνει τη Θέα του',
    viewType: 'Θέα βουνού ή κόλπου',
    shortDescription: `Το Deluxe Double προσφέρει περισσότερο χώρο, πλουσιότερες λεπτομέρειες, θέα στο βουνό ή στον Κόλπο. Εκεί που ο καφές στο μπαλκόνι γίνεται η καλύτερη στιγμή της μέρας.`,
    description: richText(
      `Θέα βουνού ή πισίνας από ένα γενναιόδωρο ιδιωτικό μπαλκόνι. Εκλεπτυσμένη διακόσμηση, premium καλλυντικά Oceanis και ένα δωμάτιο που αισθάνεται μεγαλύτερο από την κατηγορία του.`,
      `Στα 27 τ.μ. προσφέρει το ίδιο επίπεδο φινιρίσματος με τις σουίτες, με θέα που κάνει ολόκληρη τη δουλειά.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size ή δύο μονά' }, { label: 'Μπαλκόνι με θέα βουνού ή πισίνας' },
      { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Minibar' }, { label: 'Ηχομόνωση' },
    ],
  },
  'deluxe-private-pool': {
    tagline: 'Το Δικό σας Νερό, οι Δικές σας Ώρες',
    viewType: 'Ιδιωτική πισίνα',
    shortDescription: `Βγείτε από το δωμάτιο και η πισίνα σας περιμένει. Κανένας κοινόχρηστος χώρος, κανένα ωράριο. Μόνο εσείς, το νερό και ο λόφος γύρω σας.`,
    description: richText(
      `Βγείτε από το δωμάτιο και η πισίνα σας περιμένει. Για επισκέπτες που επιθυμούν την εμπειρία του resort χωρίς να τη μοιράζονται.`,
      `Κομψά εσωτερικά που ανοίγουν απευθείας στο νερό. Το ίδιο premium φινίρισμα και καλλυντικά Oceanis, με μια πισίνα που ανήκει μόνο σε εσάς.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size ή δύο μονά' }, { label: 'Ιδιωτική πισίνα' },
      { label: 'Μπαλκόνι' }, { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Minibar' }, { label: 'Ηχομόνωση' },
    ],
  },
  'superior-sea-view': {
    tagline: 'Ο Κόλπος, Αδιάκοπος',
    viewType: 'Θέα θάλασσας',
    shortDescription: `Η πιο εντυπωσιακή κατηγορία δωματίου στο Althea, σχεδιασμένη γύρω από ένα πράγμα: τη θέα. Μια γενναιόδωρη ιδιωτική βεράντα κοιτάζει τον Κορινθιακό Κόλπο χωρίς τίποτα να παρεμβάλλεται.`,
    description: richText(
      `Η πιο εντυπωσιακή κατηγορία δωματίου στο Althea, σχεδιασμένη γύρω από ένα πράγμα: τη θέα.`,
      `Στα 27 τ.μ. με βεράντα σχεδιασμένη για χρήση — το δωμάτιο που οι περισσότεροι επισκέπτες θέλουν να ξαναδούν την επόμενη χρονιά.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size ή δύο μονά' }, { label: 'Βεράντα με θέα θάλασσας' },
      { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Minibar' }, { label: 'Ηχομόνωση' },
    ],
  },
  'junior-suite': {
    tagline: 'Περισσότερος Χώρος. Περισσότερο Νερό. Περισσότερος Χρόνος.',
    viewType: 'Ιδιωτική πισίνα & θέα',
    shortDescription: `Η Junior Suite αναβαθμίζει τη διαμονή σε κάθε επίπεδο. Χωριστό καθιστικό, ιδιωτική πισίνα, θέα στον Κορινθιακό Κόλπο.`,
    description: richText(
      `Η Junior Suite αναβαθμίζει την εμπειρία σε κάθε κατεύθυνση. Εκλεπτυσμένες λεπτομέρειες, ιδιωτική πισίνα και ένας χώρος που αλλάζει τον τρόπο που βιώνετε τη μέρα.`,
      `Χωριστό καθιστικό και υπνοδωμάτιο δίνουν στη σουίτα μια αίσθηση αναλογίας. Η ιδιωτική πισίνα δεν είναι απλή προσθήκη — είναι το κεντρικό χαρακτηριστικό του δωματίου.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size ή δύο μονά' }, { label: 'Χωριστό καθιστικό' },
      { label: 'Ιδιωτική πισίνα' }, { label: 'Μπαλκόνι με θέα' },
      { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Ηχομόνωση' },
    ],
  },
  'loft-suite': {
    tagline: 'Το Ένα Δωμάτιο που Αλλάζει τα Πάντα',
    viewType: 'Πανοραμική θέα Κορινθιακού & Υπαίθριο Jacuzzi',
    shortDescription: `Η Althea Loft Suite είναι η καλύτερη θέση στο κατάλυμα — κυριολεκτικά. Διώροφη, με ανοιχτή θέα 180° στον Κορινθιακό Κόλπο, ιδιωτική ταράτσα και υπαίθριο Jacuzzi.`,
    description: richText(
      `Δύο επίπεδα. Υπνοδωμάτιο με φεγγίτη. Εντυπωσιακή θέα στον Κορινθιακό Κόλπο. Και έξω, ένα ιδιωτικό jacuzzi που κάνει το βράδυ αυτό που περιμένετε όλη μέρα.`,
      `Το signature δωμάτιο του resort. Στα 45 τ.μ., είναι το μεγαλύτερο κατάλυμα στο Althea.`,
      `Το ανώτερο υπνοδωμάτιο κοιτάζει τον Κόλπο μέσα από γυάλινα παράθυρα από το πάτωμα ως την οροφή. Το jacuzzi είναι θερμαινόμενο και ιδιωτικό.`,
    ),
    amenities: [
      { label: 'Κρεβάτι king size (ανώτερο επίπεδο)' }, { label: 'Καναπές-κρεβάτι στο καθιστικό' },
      { label: 'Υπαίθριο ιδιωτικό jacuzzi' }, { label: 'Πανοραμικό μπαλκόνι' },
      { label: 'Ιδιωτικό μπάνιο' }, { label: 'Καλλυντικά Oceanis' },
      { label: 'Δωρεάν WiFi' }, { label: 'Κλιματισμός' },
      { label: 'Επίπεδη τηλεόραση' }, { label: 'Minibar' }, { label: 'Ηχομόνωση' },
    ],
  },
}

// ─── Dining ───────────────────────────────────────────────────────────────────

const DINING_TRANSLATIONS: Record<string, Record<string, unknown>> = {
  'AITHER': {
    name: 'AITHER', tagline: 'Πάνω από τον Κόλπο. Πάνω από Όλα.',
    shortDescription: `Το signature εστιατόριο ταράτσας της Althea Resorts. Μεσογειακή κουζίνα με ελληνική ματιά, πανοραμική θέα στον Κορινθιακό Κόλπο.`,
    description: richText(
      `Το AITHER είναι το signature εστιατόριο του Althea Resorts. Το όνομά του προέρχεται από την αρχαία ελληνική λέξη Αιθήρ — τον καθαρό αέρα που υπάρχει πάνω από τα σύννεφα.`,
      `Η κουζίνα λειτουργεί με σημείο αναφοράς τη Μεσόγειο και πρίσμα την Ελλάδα — υλικά από αυτή τη γη και αυτή τη θάλασσα.`,
    ),
    openingHours: 'Βραδινή εξυπηρέτηση — ώρες ανά εποχή. Συνιστώνται κρατήσεις.',
  },
  'All Day Dining': {
    name: 'All Day Dining', tagline: 'Κάτι Εκλεκτό, Κάθε Ώρα της Ημέρας.',
    shortDescription: `Ανάμεσα στα γεύματα, η κουζίνα του Althea παραμένει ανοιχτή. Ελαφριά πιάτα, καθαρές γεύσεις.`,
    description: richText(`Ανάμεσα στα γεύματα, η κουζίνα του Althea παραμένει ανοιχτή. Ελαφριά πιάτα, καθαρές γεύσεις, υλικά που δεν χρειάζονται πολλά για να αναδειχθούν.`),
    openingHours: 'Καθημερινά — από το πρωινό έως αργά το απόγευμα.',
  },
  'Breakfast': {
    name: 'Πρωινό', tagline: 'Το Ελληνικό Πρωινό',
    shortDescription: `Μια αργή ιεροτελεστία. Τοπικό μέλι, φρέσκο ψωμί, τυριά από τα γύρω χωριά, αυγά, ελιές, φρούτα κομμένα στην ώρα τους.`,
    description: richText(
      `Το πρωινό στο Althea είναι μια ιεροτελεστία που απαιτεί χρόνο. Τοπικό μέλι, φρέσκο ψωμί, τυριά από τα γύρω χωριά, αυγά, ελιές, φρούτα κομμένα στην ώρα τους.`,
      `Εδώ δεν υπάρχει βιασύνη. Το πρωινό φως πάνω από τον Κορινθιακό κόλπο είναι επαρκής λόγος για να καθυστερήσετε λίγο παραπάνω.`,
    ),
    openingHours: 'Καθημερινά 07:30 – 11:00',
  },
  'Bar': {
    name: 'Bar', tagline: 'Το Bar του Althea',
    shortDescription: `Εκλεκτά αποστάγματα, καλοφτιαγμένα κοκτέιλ και η κατάλληλη ηρεμία που βοηθά μια συζήτηση να εμβαθύνει.`,
    description: richText(`Εκλεκτά αποστάγματα, καλοφτιαγμένα κοκτέιλ και η κατάλληλη ηρεμία που βοηθά μια συζήτηση να εμβαθύνει. Κρασιά από τον ελληνικό αμπελώνα, premium ποτά και κοκτέιλ φτιαγμένα με έμπνευση.`),
    openingHours: 'Καθημερινά από αργά το απόγευμα έως το βράδυ.',
  },
  'Pool Bar': {
    name: 'Bar Πισίνας', tagline: 'Δίπλα στο Νερό Όλη Μέρα',
    shortDescription: `Δροσερά ποτά, ελαφριά σνακ, ο ήχος του νερού. Το pool bar είναι το μέρος όπου το απόγευμα παρατείνεται ευχάριστα.`,
    description: richText(`Δροσερά ποτά, ελαφριά σνακ, ο ήχος του νερού. Ένας καφές που δίνει τη θέση του σε ένα κοκτέιλ, ένας φρέσκος χυμός που γίνεται η αφορμή για μια μεγάλη κουβέντα.`),
    openingHours: 'Καθημερινά κατά τις ώρες λειτουργίας πισίνας.',
  },
}

// ─── Journal ──────────────────────────────────────────────────────────────────

const JOURNAL_TRANSLATIONS: Record<string, Record<string, unknown>> = {
  'Ancient Corinth: A Morning Away From Everything': {
    title: 'Αρχαία Κόρινθος: Ένα Πρωινό Μακριά από Όλα',
    excerpt: 'Μία ώρα από μια από τις πιο ισχυρές πόλεις-κράτη της αρχαιότητας, αρκετά ήσυχη ακόμα για να νιώθεις σαν ανακάλυψη.',
    content: richText(
      `Η Αρχαία Κόρινθος απέχει σαράντα πέντε λεπτά από την Althea Resorts — αρκετά κοντά για μια πρωινή εκδρομή, αρκετά μακριά ώστε οι περισσότεροι να μην μπαίνουν στον κόπο.`,
      `Ο Ναός του Απόλλωνα: επτά δωρικοί κίονες του 6ου αιώνα π.Χ., αρχαιότεροι από τον Παρθενώνα. Η Ακροκόρινθος αγκαλιάζει τον Κορινθιακό Κόλπο και, σε καλή ορατότητα, την Ακρόπολη της Αθήνας.`,
    ),
  },
  'The Philosophy Behind Oceanis': {
    title: 'Η Φιλοσοφία Πίσω από τα Oceanis',
    excerpt: 'Ελληνική μυθολογία, πιστοποιημένα βιοδιασπώμενα σκευάσματα και μια απόφαση που δεν χρειάστηκε επεξήγηση.',
    content: richText(
      `Τα Oceanis είναι η ελληνική μάρκα που χρησιμοποιείται σε ολόκληρο το Ocean Spa του Althea. Πιστοποιημένα βιοδιασπώμενα, vegan και χωρίς δοκιμές σε ζώα. Δερματολογικά ελεγμένα.`,
      `Το όνομα προέρχεται από τον Ωκεανό — τον αρχαίο Τιτάνα που, στην ελληνική κοσμογονία, ήταν ο μεγάλος ποταμός που περιέβαλλε τον κόσμο.`,
    ),
  },
  'What the Fishermen Bring In': {
    title: 'Αυτό που Φέρνουν οι Ψαράδες',
    excerpt: 'Πώς ένα εστιατόριο ταράτσας στην Κορινθία ξεκινά τη βραδινή του ιστορία — στο λιμάνι, πριν ανατείλει ο ήλιος.',
    content: richText(
      `Τα αλιευτικά σκάφη που δουλεύουν στον Κορινθιακό Κόλπο φεύγουν πριν το χάραμα και επιστρέφουν τα μεσημέρια. Αυτό που φέρνουν εξαρτάται από την εποχή, τον καιρό και τη διάθεση των ρευμάτων.`,
      `Ο Κόλπος παράγει λαβράκι, τσιπούρα, μπαρμπούνι, χταπόδι. Η κουζίνα του AITHER ακολουθεί αυτό που φτάνει παρά να επιβάλλει σταθερό μενού.`,
    ),
  },
  'The Corinth Canal: Closer Than You Think': {
    title: `Η Διώρυγα της Κορίνθου: Πιο Κοντά Απ'ό,τι Νομίζεις`,
    excerpt: 'Ένα από τα μεγάλα επιτεύγματα της μηχανικής του 19ου αιώνα, που εξακολουθεί να σταματά τον κόσμο στα ίχνη του.',
    content: richText(
      `Η Διώρυγα της Κορίνθου απέχει σαράντα λεπτά από την Althea Resorts. Διανοίγει 6,3 χιλιόμετρα μέσα από τον ισθμό, με πλάτος 25 μέτρα και τοιχώματα που υψώνονται 90 μέτρα πάνω από το νερό.`,
      `Το έργο ξεκίνησε το 1881 και τελείωσε το 1893. Η γέφυρα στην κορυφή αξίζει να τη διασχίσεις αργά.`,
    ),
  },
  'On Althos: The Word Behind the Name': {
    title: 'Για τον Αλθό: Η Λέξη Πίσω από το Όνομα',
    excerpt: 'Πώς μια αρχαία ελληνική λέξη για θεραπεία έγινε αρχιτεκτονική σύλληψη, φιλοσοφία λειτουργίας και τόπος.',
    content: richText(
      `Το όνομα Althea προέρχεται από την αρχαία ελληνική λέξη ἄλθος — αλθός — που σημαίνει θεραπεία.`,
      `Αλθός — θεραπεία — ήταν αρκετά συγκεκριμένο για να έχει νόημα και αρκετά ανοιχτό για να μην γίνεται δεσμευτικό. Δεν σημαίνει ιατρικό. Σημαίνει αποκαταστατικό.`,
    ),
  },
  'The Case for Doing Nothing by a Pool': {
    title: `Υπέρ του «Να Μην Κάνεις Τίποτα» Δίπλα σε Μια Πισίνα`,
    excerpt: 'Μια υπεράσπιση του απογεύματος χωρίς πρόγραμμα, χωρίς δρομολόγιο και χωρίς ιδιαίτερο λόγο για κίνηση.',
    content: richText(
      `Υπάρχει μια ιδιαίτερη ποιότητα στο δεύτερο απόγευμα μιας καλής διακοπής. Σταματάς να κοιτάς την ώρα.`,
      `Στο Althea, η πισίνα infinity εκτείνεται κατά μήκος του ακρινού της ιδιοκτησίας και κοιτάζει νότια, προς τον Κορινθιακό Κόλπο. Δεν κάνουμε πολύπλοκο επιχείρημα. Η υπεράσπιση είναι απλώς ότι η πισίνα είναι εκεί και το απόγευμα είναι μακρύ.`,
    ),
  },
}

// ─── Experiences ──────────────────────────────────────────────────────────────

const EXPERIENCE_TRANSLATIONS: Record<string, Record<string, unknown>> = {
  'Ocean Spa': {
    title: 'Ocean Spa',
    tagline: 'Αρχαίες Παραδόσεις, Σύγχρονες Θεραπείες',
    shortDescription: `Το Ocean Spa εμπνέεται από την αρχαία ελληνική αντίληψη του νερού, της θερμότητας και της ξεκούρασης ως θεραπεία.`,
    description: richText(
      `Τρεις θάλαμοι θεραπείας. Ατμόλουτρο. Προϊόντα Oceanis — ελληνική μάρκα πιστοποιημένα βιοδιασπώμενη, vegan, χωρίς δοκιμές σε ζώα.`,
    ),
    ctaLabel: 'Κλείστε Θεραπεία',
    highlights: [
      { label: '3 Θάλαμοι Θεραπείας', value: 'Πλήρως εξοπλισμένοι, απολύτως ιδιωτικοί' },
      { label: 'Ατμόλουτρο', value: 'Παραδοσιακό hammam-style ατμόλουτρο' },
      { label: 'Προϊόντα Oceanis', value: 'Πιστοποιημένα βιοδιασπώμενα, vegan καλλυντικά' },
      { label: 'Θεραπείες για Ζευγάρια', value: 'Διαθέσιμες κρατήσεις δίπλα-δίπλα' },
    ],
  },
  'Activities': {
    title: 'Δραστηριότητες',
    tagline: 'Κινηθείτε με τον Δικό σας Ρυθμό',
    shortDescription: `Μονοπάτια πεζοπορίας, διαδρομές ποδηλασίας, θαλάσσια σπορ και πολιτιστικές εμπειρίες στην Κορινθία.`,
    description: richText(
      `Μονοπάτια πεζοπορίας διασχίζουν τους λόφους της Κορινθίας. Θαλάσσια σπορ, καγιάκ και εκδρομές με ιστιοφόρο. Ξεναγήσεις στην Αρχαία Κόρινθο, την Ακροκόρινθο και τη Διώρυγα.`,
    ),
    ctaLabel: 'Σχεδιάστε τη Διαμονή σας',
    highlights: [
      { label: 'Θαλάσσια Σπορ', value: 'Καγιάκ, ιστιοσανίδα και εκδρομές με ιστιοφόρο' },
      { label: 'Πεζοπορία & Ποδηλασία', value: 'Μονοπάτια στους λόφους της Κορινθίας' },
      { label: 'Πολιτιστικές Εκδρομές', value: 'Αρχαία Κόρινθος, Ακροκόρινθος, Διώρυγα Κορίνθου' },
      { label: 'Ξεναγήσεις', value: 'Οργανωμένες εκδρομές από το resort' },
    ],
  },
  'Weddings': {
    title: 'Γάμοι',
    tagline: 'Η Εκδήλωση Αξίζει Περισσότερα από Έναν Χώρο',
    shortDescription: `Η Κορινθία υπήρξε τόπος τελετών για τρεις χιλιάδες χρόνια. Η Althea Resorts προσφέρει ένα οικείο πλαίσιο για γάμους με θέα στον Κορινθιακό Κόλπο.`,
    description: richText(
      `Η Althea Resorts προσφέρει ένα οικείο πλαίσιο για γάμους — ένα κατάλυμα κλιμακωμένο για ιδιωτικότητα παρά για όγκο, με θέα στον Κορινθιακό Κόλπο.`,
    ),
    ctaLabel: 'Πληροφορίες για Γάμο',
    highlights: [
      { label: 'Χώρος Τελετής', value: 'Βεράντα με θέα στον Κορινθιακό Κόλπο' },
      { label: 'Catering', value: 'Κουζίνα AITHER για γαμήλια δεξίωση' },
      { label: 'Διαμονή Επί Τόπου', value: '41 δωμάτια και σουίτες για τους καλεσμένους' },
      { label: 'Συντονισμός Εκδήλωσης', value: 'Αποκλειστική εξυπηρέτηση για την ημέρα σας' },
    ],
  },
  'Corporate Events': {
    title: 'Εταιρικές Εκδηλώσεις',
    tagline: 'Ο Χώρος Συνεδρίων που Δεν Μοιάζει με Αίθουσα',
    shortDescription: `Πλήρως εξοπλισμένες αίθουσες με φυσικό φωτισμό, περιβαλλόμενες από το τοπίο της Κορινθίας.`,
    description: richText(
      `Πλήρως εξοπλισμένες αίθουσες, φυσικό φωτισμό, catering από την κουζίνα AITHER και στέγαση για συμμετέχοντες στο χώρο.`,
    ),
    ctaLabel: 'Αίτηση Πρότασης',
    highlights: [
      { label: 'Αίθουσες Συνεδρίων', value: 'Πλήρως εξοπλισμένες με τεχνολογία AV και φυσικό φωτισμό' },
      { label: 'Συντονιστής Εκδήλωσης', value: 'Σχεδιασμός εκδήλωσης από την αίτηση έως την ημέρα' },
      { label: 'Catering AITHER', value: 'Μεσογειακά μενού από την κουζίνα του resort' },
      { label: 'Διαμονή Επί Τόπου', value: '41 δωμάτια και σουίτες για συμμετέχοντες' },
    ],
  },
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const FAQ_TRANSLATIONS: Record<string, { question: string; answer: string }> = {
  'How many rooms does Althea Resorts have?': { question: 'Πόσα δωμάτια έχει η Althea Resorts;', answer: 'Η Althea Resorts διαθέτει 41 δωμάτια και σουίτες σε έξι κατηγορίες, από το Standard Double έως την Althea Loft Suite με Υπαίθριο Jacuzzi.' },
  'What is the best rate guarantee?': { question: 'Ποια είναι η εγγύηση καλύτερης τιμής;', answer: 'Η καλύτερη τιμή εγγυάται πάντα όταν κάνετε κράτηση απευθείας. Προσφέρουμε 10% έκπτωση σε όλες τις άμεσες κρατήσεις έως 30 Ιουνίου 2026.' },
  'Do all rooms have a view?': { question: 'Έχουν όλα τα δωμάτια θέα;', answer: 'Όλα τα δωμάτια έχουν είτε θέα βουνό, πισίνα ή θάλασσα. Το Superior Sea View και η Althea Loft Suite προσφέρουν αδιάκοπη θέα στον Κορινθιακό Κόλπο.' },
  'What are your check-in and check-out times?': { question: 'Ποιες είναι οι ώρες check-in και check-out;', answer: 'Το check-in είναι από τις 15:00 και το check-out έως τις 11:00. Πρώιμο check-in και late check-out είναι διαθέσιμα κατόπιν αιτήματος.' },
  'What is the minimum age to check in?': { question: 'Ποια είναι η ελάχιστη ηλικία για check-in;', answer: 'Οι επισκέπτες πρέπει να είναι τουλάχιστον 18 ετών για να κάνουν κράτηση. Τα παιδιά είναι ευπρόσδεκτα.' },
  'Are pets allowed?': { question: 'Επιτρέπονται τα κατοικίδια;', answer: 'Υποδεχόμαστε μικρά κατοικίδια σε ορισμένες κατηγορίες δωματίων. Παρακαλούμε επικοινωνήστε μαζί μας εκ των προτέρων.' },
  'How far is Althea Resorts from Athens?': { question: 'Πόσο μακριά είναι η Althea Resorts από την Αθήνα;', answer: 'Η Althea Resorts απέχει περίπου 60 λεπτά από την Αθήνα με αυτοκίνητο μέσω του αυτοκινητοδρόμου Αθηνών–Κορίνθου.' },
  'Do you offer airport transfers?': { question: 'Προσφέρετε μεταφορά από αεροδρόμιο;', answer: 'Ναι, μπορούμε να οργανώσουμε ιδιωτικές μεταφορές από το Διεθνές Αεροδρόμιο Αθηνών. Επικοινωνήστε μαζί μας με τα στοιχεία του ταξιδιού σας.' },
  "How do guests get to the private beach?": { question: 'Πώς φτάνουν οι επισκέπτες στην ιδιωτική παραλία;', answer: `Η ιδιωτική παραλία μας στον Κορινθιακό Κόλπο βρίσκεται 5 λεπτά από το resort. Λειτουργεί δωρεάν σερβίς μεταφοράς καθ'όλη τη διάρκεια της ημέρας.` },
  'Do I need to book AITHER in advance?': { question: 'Χρειάζεται να κάνω κράτηση στο AITHER εκ των προτέρων;', answer: 'Συνιστούμε να κάνετε κράτηση στο AITHER, ιδίως κατά την υψηλή σεζόν. Τα τραπέζια ρυθμίζονται καλώντας απευθείας το resort.' },
  'Is breakfast included?': { question: 'Περιλαμβάνεται το πρωινό;', answer: 'Το πρωινό είναι διαθέσιμο ως μέρος ορισμένων πακέτων. Ελέγξτε τις τιμές δωματίων κατά την κράτηση ή επικοινωνήστε μαζί μας.' },
  'Do you cater for dietary requirements?': { question: 'Εξυπηρετείτε διαιτητικές απαιτήσεις;', answer: 'Ναι. Η κουζίνα μας καλύπτει χορτοφαγικές, vegan και αλλεργιογόνες απαιτήσεις. Παρακαλούμε ενημερώστε μας κατά την κράτηση.' },
  'Do I need to book spa treatments in advance?': { question: 'Χρειάζεται να κλείσω θεραπείες spa εκ των προτέρων;', answer: 'Συνιστούμε να κλείνετε θεραπείες εκ των προτέρων, ιδίως κατά τη σεζόν αιχμής.' },
  'What products does the Ocean Spa use?': { question: 'Ποια προϊόντα χρησιμοποιεί το Ocean Spa;', answer: 'Το Ocean Spa χρησιμοποιεί καλλυντικά Oceanis — ελληνική μάρκα πιστοποιημένα βιοδιασπώμενη, vegan, χωρίς δοκιμές σε ζώα.' },
  'Is the spa open to non-resident guests?': { question: 'Είναι το spa ανοιχτό σε μη διαμένοντες επισκέπτες;', answer: 'Το spa είναι κυρίως για τους επισκέπτες του ξενοδοχείου. Επικοινωνήστε μαζί μας εκ των προτέρων για ημερήσιες επισκέψεις.' },
}

// ─── Seed functions ────────────────────────────────────────────────────────────

type P = Awaited<ReturnType<typeof getPayload>>
const updated: string[] = []
const notFound: string[] = []
const errors: string[] = []

async function seedRooms(payload: P) {
  const res = await (payload.find as Function)({ collection: 'rooms', limit: 50 })
  for (const doc of res.docs) {
    const cat = doc.category as string
    // 1. Repair English title if it was corrupted by a previous run
    const correctTitle = ROOM_TITLE_REPAIR[cat]
    if (correctTitle && doc.title !== correctTitle) {
      try {
        // db.updateOne bypasses full-document validation — title is not localized
        // so no locale param needed; avoids amenity label validation errors
        await (payload.db as any).updateOne({ collection: 'rooms', id: doc.id, data: { title: correctTitle } })
        updated.push(`room title repaired: "${cat}" → "${correctTitle}"`)
      } catch (e: any) { errors.push(`repair title "${cat}": ${e?.message}`) }
    }
    // 2. Set Greek locale fields (no title — not localized)
    const t = ROOM_TRANSLATIONS[cat]
    if (!t) { notFound.push(`room cat: "${cat}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'rooms', id: doc.id, locale: 'el', data: t })
      updated.push(`room el: "${cat}"`)
    } catch (e: any) { errors.push(`room el "${cat}": ${e?.message}`) }
  }
}

async function seedDining(payload: P) {
  const res = await (payload.find as Function)({ collection: 'dining', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.name ?? doc.title
    const t = DINING_TRANSLATIONS[key]
    if (!t) { notFound.push(`dining: "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'dining', id: doc.id, locale: 'el', data: { ...t, slug: doc.slug } })
      updated.push(`dining: "${key}"`)
    } catch (e: any) { errors.push(`dining "${key}": ${e?.message}`) }
  }
}

async function seedJournal(payload: P) {
  const res = await (payload.find as Function)({ collection: 'journal', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const t = JOURNAL_TRANSLATIONS[doc.title]
    if (!t) { notFound.push(`journal: "${doc.title}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'journal', id: doc.id, locale: 'el', data: t })
      updated.push(`journal: "${doc.title}"`)
    } catch (e: any) { errors.push(`journal "${doc.title}": ${e?.message}`) }
  }
}

async function seedExperiences(payload: P) {
  const res = await (payload.find as Function)({ collection: 'experiences', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const t = EXPERIENCE_TRANSLATIONS[doc.title]
    if (!t) { notFound.push(`experience: "${doc.title}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'experiences', id: doc.id, locale: 'el', data: { ...t, slug: doc.slug } })
      updated.push(`experience: "${doc.title}"`)
    } catch (e: any) { errors.push(`experience "${doc.title}": ${e?.message}`) }
  }
}

async function seedFAQs(payload: P) {
  const res = await (payload.find as Function)({ collection: 'faqs', limit: 50, locale: 'en' })
  for (const doc of res.docs) {
    const t = FAQ_TRANSLATIONS[doc.question]
    if (!t) { notFound.push(`faq: "${doc.question?.slice(0, 50)}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'faqs', id: doc.id, locale: 'el', data: { question: t.question, answer: richText(t.answer) } })
      updated.push(`faq: "${doc.question?.slice(0, 40)}"`)
    } catch (e: any) { errors.push(`faq: ${e?.message}`) }
  }
}

async function seedOffers(payload: P) {
  const res = await (payload.find as Function)({ collection: 'offers', limit: 10, locale: 'en' })
  for (const doc of res.docs) {
    try {
      await (payload.update as Function)({
        collection: 'offers', id: doc.id, locale: 'el',
        data: {
          title: '10% Έκπτωση για Άμεσες Κρατήσεις',
          tagline: 'Ένας Λόγος να Κλείσετε Τώρα και Απευθείας',
          description: richText(`Για τα εγκαίνια της Althea Resorts, προσφέρουμε δέκα τοις εκατό έκπτωση σε όλες τις άμεσες κρατήσεις. Ισχύει για κρατήσεις έως το τέλος Ιουνίου 2026.`),
          ctaLabel: 'Κλείστε Τώρα — 10% Έκπτωση',
          conditions: [
            { condition: 'Ισχύει μόνο για άμεσες κρατήσεις' },
            { condition: 'Υπόκειται σε διαθεσιμότητα' },
            { condition: 'Δεν συνδυάζεται με άλλες προσφορές' },
            { condition: 'Ισχύει έως 30 Ιουνίου 2026' },
          ],
          slug: doc.slug,
        },
      })
      updated.push(`offer: "${doc.title}"`)
    } catch (e: any) { errors.push(`offer: ${e?.message}`) }
  }
}

// ─── Greek meta (seoPlugin fields) ───────────────────────────────────────────

const ROOM_META_EL: Record<string, { title: string; description: string; keywords: string }> = {
  'standard-double': {
    title: 'Standard Double Δωμάτιο — Θέα Βουνό & Κήπο | Althea Resorts',
    description: 'Άνετο διπλό δωμάτιο με ιδιωτικό μπαλκόνι και θέα βουνό ή κήπο στην Althea Resorts, Ξυλόκαστρο, Κορινθία. 60 λεπτά από Αθήνα.',
    keywords: 'ξενοδοχείο Ξυλόκαστρο, δωμάτιο Κορινθία, διαμονή Κορινθιακός, Althea Resorts',
  },
  'deluxe-double-mv-pv': {
    title: 'Deluxe Διπλό Δωμάτιο — Θέα Βουνού ή Κόλπου | Althea Resorts',
    description: 'Ευρύχωρο Deluxe Double 27 τ.μ. με ιδιωτικό μπαλκόνι και θέα βουνού ή Κορινθιακού Κόλπου στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'deluxe δωμάτιο Κορινθία, ξενοδοχείο θέα κόλπος, Althea Resorts διαμονή, πολυτελές δωμάτιο Ξυλόκαστρο',
  },
  'deluxe-private-pool': {
    title: 'Deluxe Δωμάτιο με Ιδιωτική Πισίνα | Althea Resorts',
    description: 'Πολυτελές διπλό δωμάτιο με ιδιωτική πισίνα στην Althea Resorts, Ξυλόκαστρο. Αποκλειστική εμπειρία resort, 60 λεπτά από Αθήνα.',
    keywords: 'δωμάτιο ιδιωτική πισίνα Ελλάδα, ξενοδοχείο Κορινθία, Althea Resorts πισίνα, πολυτελής διαμονή Ξυλόκαστρο',
  },
  'superior-sea-view': {
    title: 'Superior Sea View Δωμάτιο — Κορινθιακός Κόλπος | Althea Resorts',
    description: 'Superior δωμάτιο 27 τ.μ. με πανοραμική θέα στον Κορινθιακό Κόλπο και ιδιωτική βεράντα στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'δωμάτιο θέα θάλασσα Κορινθία, ξενοδοχείο Κορινθιακός Κόλπος, superior δωμάτιο Ξυλόκαστρο, Althea Resorts',
  },
  'junior-suite': {
    title: 'Junior Suite με Ιδιωτική Πισίνα | Althea Resorts',
    description: 'Πολυτελής Junior Suite με ιδιωτική πισίνα, θέα Κορινθιακού Κόλπου και χωριστό καθιστικό στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'junior suite ιδιωτική πισίνα Ελλάδα, σουίτα Κορινθία, πολυτελής σουίτα Ξυλόκαστρο, Althea Resorts',
  },
  'loft-suite': {
    title: 'Althea Loft Suite — Υπαίθριο Jacuzzi & Θέα Κόλπου | Althea Resorts',
    description: 'Signature loft σουίτα 45 τ.μ. με πανοραμική θέα Κορινθιακού Κόλπου, ιδιωτική ταράτσα και υπαίθριο jacuzzi στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'loft σουίτα jacuzzi Ελλάδα, καλύτερο δωμάτιο Κορινθία, πολυτελής σουίτα Ξυλόκαστρο, Althea Resorts',
  },
}

const DINING_META_EL: Record<string, { title: string; description: string; keywords: string }> = {
  'AITHER': {
    title: 'AITHER Εστιατόριο Ταράτσας — Μεσογειακή Κουζίνα | Althea Resorts',
    description: 'Το signature εστιατόριο ταράτσας της Althea Resorts στο Ξυλόκαστρο. Σύγχρονη μεσογειακή κουζίνα με πανοραμική θέα στον Κορινθιακό Κόλπο.',
    keywords: 'εστιατόριο ταράτσα Ξυλόκαστρο, εστιατόριο Κορινθία, AITHER εστιατόριο, Althea Resorts φαγητό',
  },
  'All Day Dining': {
    title: 'All Day Dining — Ελαφριά Μεσογειακά Πιάτα | Althea Resorts',
    description: 'Ελαφριά εποχιακά πιάτα και φρέσκες μεσογειακές γεύσεις καθ\'όλη τη διάρκεια της ημέρας στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'all day dining Ξυλόκαστρο, μεσημεριανό Κορινθία, εστιατόριο ξενοδοχείο Ελλάδα, Althea Resorts',
  },
  'Breakfast': {
    title: 'Ελληνικό Πρωινό στην Althea Resorts | Ξυλόκαστρο, Κορινθία',
    description: 'Ξεκινήστε τη μέρα με ελληνικό πρωινό στην Althea Resorts: τοπικό μέλι, φρέσκο ψωμί, τυριά περιοχής, εποχιακά φρούτα. Καθημερινά 07:30–11:00.',
    keywords: 'πρωινό ξενοδοχείο Ξυλόκαστρο, ελληνικό πρωινό Κορινθία, Althea Resorts πρωινό',
  },
  'Bar': {
    title: 'Bar Althea Resorts — Κοκτέιλ & Ελληνικά Αποστάγματα',
    description: 'Επιλεγμένα κοκτέιλ, εκλεκτά ελληνικά αποστάγματα και premium κρασιά στο bar της Althea Resorts. Ήσυχο τέλος για μια χαλαρή βραδιά.',
    keywords: 'bar ξενοδοχείο Ξυλόκαστρο, κοκτέιλ Κορινθία, ελληνικά αποστάγματα, Althea Resorts bar',
  },
  'Pool Bar': {
    title: 'Bar Πισίνας Althea Resorts — Ποτά δίπλα στην Infinity Πισίνα',
    description: 'Φρέσκα κοκτέιλ, χυμοί και ελαφριά σνακ δίπλα στην infinity πισίνα της Althea Resorts, Ξυλόκαστρο. Ανοιχτό καθημερινά κατά τις ώρες της πισίνας.',
    keywords: 'pool bar Ελλάδα, infinity πισίνα Κορινθία, ποτά πισίνα Ξυλόκαστρο, Althea Resorts πισίνα',
  },
}

const EXPERIENCE_META_EL: Record<string, { title: string; description: string; keywords: string }> = {
  'Ocean Spa': {
    title: 'Ocean Spa — Πολυτελής Ευεξία στο Ξυλόκαστρο | Althea Resorts',
    description: 'Ocean Spa στην Althea Resorts: 3 θάλαμοι θεραπείας, ατμόλουτρο και καλλυντικά Oceanis πιστοποιημένα βιοδιασπώμενα. Ευεξία στον Κορινθιακό.',
    keywords: 'spa Ξυλόκαστρο, Ocean Spa Κορινθία, ευεξία ξενοδοχείο Ελλάδα, Althea Resorts spa',
  },
  'Activities': {
    title: 'Δραστηριότητες & Εκδρομές στην Κορινθία | Althea Resorts',
    description: 'Πεζοπορία, θαλάσσια σπορ, καγιάκ και πολιτιστικές εκδρομές από Althea Resorts, Ξυλόκαστρο. Εξερευνήστε Αρχαία Κόρινθο και Διώρυγα.',
    keywords: 'δραστηριότητες Κορινθία, εκδρομές Ξυλόκαστρο, θαλάσσια σπορ Κορινθιακός, Althea Resorts',
  },
  'Weddings': {
    title: 'Γάμοι στην Κορινθία — Πολυτελής Χώρος | Althea Resorts',
    description: 'Οικείος χώρος γάμου με θέα στον Κορινθιακό Κόλπο, Althea Resorts, Ξυλόκαστρο. Εξατομικευμένες τελετές και δεξιώσεις, 60 λεπτά από Αθήνα.',
    keywords: 'γάμος Κορινθία Ελλάδα, χώρος γάμου Ξυλόκαστρο, πολυτελής γάμος κοντά Αθήνα, Althea Resorts γάμοι',
  },
  'Corporate Events': {
    title: 'Εταιρικές Εκδηλώσεις & Συνέδρια στην Κορινθία | Althea Resorts',
    description: 'Πλήρως εξοπλισμένες αίθουσες συνεδρίων με φυσικό φωτισμό, catering AITHER και διαμονή επί τόπου στην Althea Resorts, Ξυλόκαστρο.',
    keywords: 'συνέδριο ξενοδοχείο Κορινθία, εταιρική εκδήλωση Ξυλόκαστρο, αίθουσα συνεδριάσεων Ελλάδα, Althea Resorts',
  },
}

const JOURNAL_META_EL: Record<string, { title: string; description: string; keywords: string }> = {
  'Ancient Corinth: A Morning Away From Everything': {
    title: 'Αρχαία Κόρινθος: Μια Ημερήσια Εκδρομή από Althea Resorts',
    description: 'Επισκεφθείτε την Αρχαία Κόρινθο από Althea Resorts Ξυλόκαστρο — 45 λεπτά. Ναός Απόλλωνα, Ακροκόρινθος, αρχαιολογικό μουσείο.',
    keywords: 'Αρχαία Κόρινθος εκδρομή, αξιοθέατα Κορινθία, Ακροκόρινθος επίσκεψη, ταξίδι από Ξυλόκαστρο',
  },
  'The Philosophy Behind Oceanis': {
    title: 'Η Φιλοσοφία των Oceanis Καλλυντικών | Althea Resorts',
    description: 'Γιατί η Althea Resorts επέλεξε Oceanis: ελληνική μάρκα βιοδιασπώμενων, vegan καλλυντικών spa. Χρησιμοποιείται στο Ocean Spa.',
    keywords: 'Oceanis καλλυντικά, vegan προϊόντα spa Ελλάδα, βιοδιασπώμενα ξενοδοχείο, Ocean Spa Althea',
  },
  'What the Fishermen Bring In': {
    title: 'Αυτό που Φέρνουν οι Ψαράδες — Κουζίνα AITHER',
    description: 'Πώς το AITHER προμηθεύεται φρέσκο ψάρι από ψαράδες του Κορινθιακού Κόλπου και ακολουθεί την εποχή στο μενού του.',
    keywords: 'AITHER εστιατόριο φρέσκο ψάρι, Κορινθιακός Κόλπος θαλασσινά, μεσογειακό μενού Ξυλόκαστρο',
  },
  'The Corinth Canal: Closer Than You Think': {
    title: 'Η Διώρυγα της Κορίνθου: 40 Λεπτά από Althea Resorts',
    description: 'Οδηγός για επίσκεψη στη Διώρυγα της Κορίνθου από Ξυλόκαστρο — ένα από τα μεγάλα επιτεύγματα μηχανικής του 19ου αιώνα.',
    keywords: 'Διώρυγα Κορίνθου επίσκεψη, ημερήσια εκδρομή Ξυλόκαστρο, αξιοθέατα Κορινθία, κοντά Αθήνα',
  },
  'On Althos: The Word Behind the Name': {
    title: 'Ο Αλθός: Η Αρχαία Λέξη Πίσω από Althea Resorts',
    description: 'Η αρχαία ελληνική λέξη ἄλθος σημαίνει θεραπεία. Πώς αυτή η λέξη έγινε η φιλοσοφία και η ταυτότητα της Althea Resorts στην Κορινθία.',
    keywords: 'Althea Resorts ιστορία, αλθός ετυμολογία, ξενοδοχείο φιλοσοφία Ελλάδα, boutique resort Κορινθία',
  },
  'The Case for Doing Nothing by a Pool': {
    title: 'Υπέρ του «Να Μην Κάνεις Τίποτα» Δίπλα σε Πισίνα | Althea Resorts',
    description: 'Μια υπεράσπιση αργών απογευμάτων δίπλα στην πισίνα και της ευχαρίστησης που φέρνει μια καλά επιλεγμένη διακοπή στην Κορινθία.',
    keywords: 'χαλάρωση διακοπές Ελλάδα, infinity πισίνα ξενοδοχείο Κορινθία, αργές διακοπές Ξυλόκαστρο, Althea Resorts',
  },
}

async function seedRoomMetaEL(payload: P) {
  const res = await (payload.find as Function)({ collection: 'rooms', limit: 50 })
  for (const doc of res.docs) {
    const cat = doc.category as string
    const m = ROOM_META_EL[cat]
    if (!m) { notFound.push(`room meta el "${cat}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'rooms', id: doc.id, locale: 'el', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`room meta el: "${cat}"`)
    } catch (e: any) { errors.push(`room meta el "${cat}": ${e?.message}`) }
  }
}

async function seedDiningMetaEL(payload: P) {
  const res = await (payload.find as Function)({ collection: 'dining', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.name as string
    const m = DINING_META_EL[key]
    if (!m) { notFound.push(`dining meta el "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'dining', id: doc.id, locale: 'el', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`dining meta el: "${key}"`)
    } catch (e: any) { errors.push(`dining meta el "${key}": ${e?.message}`) }
  }
}

async function seedExperienceMetaEL(payload: P) {
  const res = await (payload.find as Function)({ collection: 'experiences', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.title as string
    const m = EXPERIENCE_META_EL[key]
    if (!m) { notFound.push(`experience meta el "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'experiences', id: doc.id, locale: 'el', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`experience meta el: "${key}"`)
    } catch (e: any) { errors.push(`experience meta el "${key}": ${e?.message}`) }
  }
}

async function seedJournalMetaEL(payload: P) {
  const res = await (payload.find as Function)({ collection: 'journal', limit: 20, locale: 'en' })
  for (const doc of res.docs) {
    const key = doc.title as string
    const m = JOURNAL_META_EL[key]
    if (!m) { notFound.push(`journal meta el "${key}"`); continue }
    try {
      await (payload.update as Function)({ collection: 'journal', id: doc.id, locale: 'el', data: { meta: { title: m.title, description: m.description, keywords: m.keywords } } })
      updated.push(`journal meta el: "${key}"`)
    } catch (e: any) { errors.push(`journal meta el "${key}": ${e?.message}`) }
  }
}

async function seedOfferMetaEL(payload: P) {
  const res = await (payload.find as Function)({ collection: 'offers', limit: 10, locale: 'en' })
  for (const doc of res.docs) {
    try {
      await (payload.update as Function)({
        collection: 'offers', id: doc.id, locale: 'el',
        data: {
          meta: {
            title: '10% Έκπτωση για Άμεσες Κρατήσεις | Althea Resorts',
            description: 'Κλείστε απευθείας στην Althea Resorts και εξοικονομήστε 10%. Εγγυημένη καλύτερη τιμή στο επίσημο site. Ισχύει έως Ιούνιο 2026.',
            keywords: 'άμεση κράτηση έκπτωση ξενοδοχείο, καλύτερη τιμή Althea Resorts, προσφορά ξενοδοχείο Κορινθία',
          },
        },
      })
      updated.push(`offer meta el: "${doc.title}"`)
    } catch (e: any) { errors.push(`offer meta el: ${e?.message}`) }
  }
}

async function seedGlobals(payload: P) {
  // Site settings
  try {
    await (payload.updateGlobal as Function)({ slug: 'site-settings', locale: 'el', data: { tagline: 'Επαναπροσδιορίζοντας τη Φιλοξενία με Διαχρονική Κομψότητα' } })
    updated.push('global: site-settings (el)')
  } catch (e: any) { errors.push(`global site-settings: ${e?.message}`) }

  // Booking settings
  try {
    await (payload.updateGlobal as Function)({ slug: 'booking-settings', locale: 'el', data: { stickyBarText: 'Κλείστε τη διαμονή σας — 60 λεπτά από Αθήνα' } })
    updated.push('global: booking-settings (el)')
  } catch (e: any) { errors.push(`global booking-settings: ${e?.message}`) }

  // SEO settings — localized fields in Greek
  try {
    await (payload.updateGlobal as Function)({
      slug: 'seo-settings',
      locale: 'el',
      data: {
        defaultTitle: 'Althea Resorts — 5 Αστέρων Boutique Ξενοδοχείο στην Κορινθία, Ελλάδα',
        titleSuffix: '| Althea Resorts',
        defaultDescription: 'Πολυτελές boutique resort 5 αστέρων στο Άνω Λουτρό, Ξυλόκαστρο, Κορινθία. 41 δωμάτια και σουίτες με θέα Κορινθιακού Κόλπου, Ocean Spa, εστιατόριο AITHER. 60 λεπτά από Αθήνα.',
        defaultKeywords: 'πολυτελές ξενοδοχείο Ελλάδα, boutique resort Κορινθία, ξενοδοχείο Ξυλόκαστρο, Althea Resorts, 5 αστέρων ξενοδοχείο Πελοπόννησος',
        entityDescription: 'Η Althea Resorts είναι ένα πολυτελές boutique ξενοδοχείο 5 αστέρων στο Άνω Λουτρό, Ξυλόκαστρο, Κορινθία, Ελλάδα, στη βόρεια ακτή της Πελοποννήσου. Διαθέτει 41 δωμάτια και σουίτες με θέα στον Κορινθιακό Κόλπο, το Ocean Spa με πιστοποιημένα βιοδιασπώμενα καλλυντικά Oceanis, το signature εστιατόριο ταράτσας AITHER, infinity πισίνα, αίθουσες συνεδρίων και σέρβις μεταφοράς στην ιδιωτική παραλία. Βρίσκεται 60 λεπτά από την Αθήνα με αυτοκίνητο.',
      },
    })
    updated.push('global: seo-settings (el)')
  } catch (e: any) { errors.push(`global seo-settings el: ${e?.message}`) }

  // GEO settings — localized fields in Greek
  try {
    await (payload.updateGlobal as Function)({
      slug: 'geo-settings',
      locale: 'el',
      data: {
        brandName: 'Althea Resorts',
        description: 'Πολυτελές boutique resort στους λόφους του Άνω Λουτρού, κοντά στο Ξυλόκαστρο, Κορινθία, Ελλάδα. 60 λεπτά από Αθήνα. 41 δωμάτια και σουίτες, Ocean Spa, εστιατόριο AITHER, infinity πισίνα, αίθουσες συνεδρίων και σέρβις παραλίας.',
        seasonalNote: 'Ανοιχτά όλο το χρόνο. Πισίνα και σέρβις παραλίας διαθέσιμα Μάιο–Οκτώβριο.',
      },
    })
    updated.push('global: geo-settings (el)')
  } catch (e: any) { errors.push(`global geo-settings el: ${e?.message}`) }

  // Contact info — directions in Greek
  try {
    await (payload.updateGlobal as Function)({
      slug: 'contact-info',
      locale: 'el',
      data: { directions: '60 λεπτά από Αθήνα με αυτοκίνητο. Ακολουθήστε τον αυτοκινητόδρομο Αθηνών–Κορίνθου προς Πελοπόννησο, έξοδος Ξυλόκαστρο. Ακολουθήστε τις πινακίδες προς Άνω Λουτρό.' },
    })
    updated.push('global: contact-info (el)')
  } catch (e: any) { errors.push(`global contact-info el: ${e?.message}`) }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = await getPayload({ config })
  await seedRooms(payload)
  await seedDining(payload)
  await seedJournal(payload)
  await seedExperiences(payload)
  await seedFAQs(payload)
  await seedOffers(payload)
  await seedRoomMetaEL(payload)
  await seedDiningMetaEL(payload)
  await seedExperienceMetaEL(payload)
  await seedJournalMetaEL(payload)
  await seedOfferMetaEL(payload)
  await seedGlobals(payload)
  return NextResponse.json({
    message: 'Greek locale seed complete',
    summary: { updated: updated.length, notFound: notFound.length, errors: errors.length },
    detail: { updated, notFound, errors },
  })
}
