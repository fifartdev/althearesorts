export interface FaqItem { q: string; a: string }
export interface FaqCategory { category: string; items: FaqItem[] }

export const faqs: FaqCategory[] = [
  {
    category: 'Rooms & Rates',
    items: [
      { q: 'How many rooms does Althea Resorts have?', a: 'Althea Resorts has 41 rooms and suites across six categories, from the Standard Double to the Althea Loft Suite with Outdoor Jacuzzi.' },
      { q: 'What is the best rate guarantee?', a: 'The best rate is always guaranteed when you book directly through our website or by contacting us by phone or email. Booking direct means no intermediary fees and access to any exclusive rates we offer.' },
      { q: 'Do all rooms have a view?', a: 'All rooms feature either mountain, pool, or sea views. The Superior Sea View Room and Althea Loft Suite offer uninterrupted views of the Corinthian Gulf from generous terraces.' },
    ],
  },
  {
    category: 'Check-in & Stay',
    items: [
      { q: 'What are your check-in and check-out times?', a: 'Check-in is from 15:00 and check-out is by 11:00. Early check-in and late check-out are available upon request, subject to availability.' },
      { q: 'What is the minimum age to check in?', a: 'Guests must be at least 18 years of age to make a reservation. Children are welcome and the resort is family-friendly.' },
      { q: 'Are pets allowed?', a: 'We welcome small pets in certain room categories. Please contact us in advance to make arrangements.' },
    ],
  },
  {
    category: 'Location & Transport',
    items: [
      { q: 'How far is Althea Resorts from Athens?', a: 'Althea Resorts is approximately 60 minutes from Athens by car on the Athens–Corinth motorway. We can assist with private transfer arrangements upon request.' },
      { q: 'Do you offer airport transfers?', a: 'Yes, we can arrange private transfers from Athens International Airport. Please contact us with your travel details and we will organize the rest.' },
    ],
  },
  {
    category: 'Dining',
    items: [
      { q: 'Do I need to book AITHER in advance?', a: 'We recommend making a reservation for AITHER, our rooftop restaurant, particularly during the high season. Tables can be arranged by calling the resort directly.' },
      { q: 'Is breakfast included?', a: 'Breakfast is available as part of certain packages. Please check room rates at time of booking or contact us to add breakfast to your reservation.' },
      { q: 'Do you cater for dietary requirements?', a: 'Yes. Our kitchen can accommodate most dietary requirements including vegetarian, vegan, and allergen-specific needs. Please inform us at the time of booking.' },
    ],
  },
  {
    category: 'Spa & Wellness',
    items: [
      { q: 'Do I need to book spa treatments in advance?', a: 'We recommend booking treatments in advance, especially during peak season. Contact us or ask the reception team upon arrival.' },
      { q: 'What products does the Ocean Spa use?', a: 'The Ocean Spa uses Oceanis cosmetics — a Greek brand certified biodegradable, vegan, cruelty-free, and dermatologically tested. The full range is available to purchase in the spa boutique.' },
      { q: 'Is the spa open to non-resident guests?', a: 'The spa is primarily reserved for hotel guests. Please contact us in advance if you would like to enquire about day visits.' },
    ],
  },
]
