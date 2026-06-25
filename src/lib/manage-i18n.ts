export type ManageLocale = 'en' | 'el'

export const t = {
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      rooms: 'Rooms',
      gallery: 'Gallery',
      offers: 'Offers',
      journal: 'Journal',
      faqs: 'FAQs',
      testimonials: 'Testimonials',
      enquiries: 'Enquiries',
      settings: 'Settings',
    },
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      subtitle: 'Content overview for Althea Resorts',
      published: 'Published',
      draft: 'Draft',
      total: 'Total',
      recent: 'Recent activity',
      quickActions: 'Quick actions',
      openCms: 'Open full CMS',
      viewSite: 'View site',
    },
    // Content
    content: {
      rooms: 'Rooms & Suites',
      gallery: 'Gallery',
      offers: 'Special Offers',
      journal: 'Journal',
      faqs: 'FAQs',
      testimonials: 'Testimonials',
      enquiries: 'Enquiries',
      settings: 'Settings',
      noItems: 'No items yet.',
      editInCms: 'Edit in CMS',
      viewPage: 'View page',
    },
    // Auth
    auth: {
      signIn: 'Sign in',
      email: 'Email address',
      password: 'Password',
      signingIn: 'Signing in…',
      signOut: 'Sign out',
      error: 'Invalid email or password.',
      accessDenied: 'Access denied. Your account does not have permission to use this panel.',
    },
    // Status
    status: {
      published: 'Published',
      draft: 'Draft',
      new: 'New',
      read: 'Read',
      replied: 'Replied',
      archived: 'Archived',
    },
  },
  el: {
    nav: {
      dashboard: 'Πίνακας',
      rooms: 'Δωμάτια',
      gallery: 'Γκαλερί',
      offers: 'Προσφορές',
      journal: 'Ημερολόγιο',
      faqs: 'Συχνές Ερωτήσεις',
      testimonials: 'Αξιολογήσεις',
      enquiries: 'Αιτήματα',
      settings: 'Ρυθμίσεις',
    },
    dashboard: {
      title: 'Πίνακας Ελέγχου',
      welcome: 'Καλώς ορίσατε',
      subtitle: 'Επισκόπηση περιεχομένου για Althea Resorts',
      published: 'Δημοσιευμένα',
      draft: 'Πρόχειρα',
      total: 'Σύνολο',
      recent: 'Πρόσφατη δραστηριότητα',
      quickActions: 'Γρήγορες ενέργειες',
      openCms: 'Άνοιγμα CMS',
      viewSite: 'Προβολή ιστοσελίδας',
    },
    content: {
      rooms: 'Δωμάτια & Σουίτες',
      gallery: 'Γκαλερί',
      offers: 'Ειδικές Προσφορές',
      journal: 'Ημερολόγιο',
      faqs: 'Συχνές Ερωτήσεις',
      testimonials: 'Αξιολογήσεις',
      enquiries: 'Αιτήματα',
      settings: 'Ρυθμίσεις',
      noItems: 'Δεν υπάρχουν εγγραφές.',
      editInCms: 'Επεξεργασία στο CMS',
      viewPage: 'Προβολή σελίδας',
    },
    auth: {
      signIn: 'Σύνδεση',
      email: 'Διεύθυνση email',
      password: 'Κωδικός πρόσβασης',
      signingIn: 'Σύνδεση…',
      signOut: 'Αποσύνδεση',
      error: 'Λανθασμένο email ή κωδικός.',
      accessDenied: 'Απαγορεύεται η πρόσβαση. Ο λογαριασμός σας δεν έχει δικαίωμα χρήσης αυτού του πίνακα.',
    },
    status: {
      published: 'Δημοσιευμένο',
      draft: 'Πρόχειρο',
      new: 'Νέο',
      read: 'Αναγνωσμένο',
      replied: 'Απαντήθηκε',
      archived: 'Αρχειοθετήθηκε',
    },
  },
}

export function getLocale(cookieValue?: string | null): ManageLocale {
  if (cookieValue === 'el') return 'el'
  return 'en'
}

export function useTranslations(locale: ManageLocale) {
  return t[locale]
}
