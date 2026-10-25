export interface FaqItem {
  question: string;
  answer: string;
  /** Optional pill list shown under the answer (e.g. what to bring). */
  list?: string[];
}

const faqItems: FaqItem[] = [
  {
    question: "Can my children book different periods or times?",
    answer: "Yes. Each child picks their own period and session time.",
  },
  {
    question: "What details do I need to give?",
    answer:
      "On the last step, before payment, you enter your name, email and mobile number. We use them to confirm the booking and text you about sessions.",
  },
  {
    question: "How do I pay?",
    answer: "After you confirm your booking, the front desk texts you to arrange payment.",
  },
  {
    question: "What should my child bring?",
    answer: "Pack these for every session:",
    list: ["Swimsuit", "Swim cap", "Goggles", "Towel", "Water bottle", "Pool sandals"],
  },
];

export const en = {
  common: {
    clubName: "Tidewell Swim Club",
    currency: "KD",
    home: "Home",
    back: "Back",
    close: "Close",
    loading: "Loading…",
    offline: "You're offline. The page will carry on when your connection is back.",
    childCount: (n: number) => (n === 1 ? "1 child" : `${n} children`),
  },
  header: {
    homeAria: "Go to home page",
    darkMode: "Dark mode",
    language: "Language",
  },
  calendar: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  home: {
    hero: {
      eyebrow: "Winter Season 2026–27 · Registration open",
      title: "Swimming lessons that build confident, safe swimmers.",
      text: "Tidewell Swim Club teaches children aged 6 to 18 in age-based groups, Sunday to Thursday, this winter.",
      register: "Register now",
      viewSchedule: "View the schedule",
    },
    skills: {
      title: "What your child will learn",
      intro:
        "Lessons follow each child's level, from first strokes to confident lengths of the pool.",
      items: [
        {
          title: "Water confidence",
          text: "Getting comfortable in the water, putting their face in and floating on their own.",
        },
        { title: "Breathing", text: "Breath control and steady, rhythmic breathing while they swim." },
        {
          title: "The four strokes",
          text: "Front crawl, backstroke, breaststroke and butterfly, with good technique.",
        },
        {
          title: "Water safety",
          text: "Treading water, floating to rest and staying safe around pools and the sea.",
        },
        {
          title: "Starts and turns",
          text: "Entering the water safely, pushing off and turning at the wall.",
        },
        {
          title: "Fitness and teamwork",
          text: "Building stamina and learning to train alongside their group.",
        },
      ],
    },
    how: {
      title: "How the winter season works",
      period: {
        title: "Pick a period",
        rows: [
          { label: "Periods", value: "4, between December and January" },
          { label: "Length", value: "2 weeks each" },
          { label: "Days", value: "Sunday to Thursday" },
          { label: "Sessions", value: "10 per period, 2 hours each" },
        ],
        note: "The dates are on the calendar below.",
      },
      time: {
        title: "Choose a time",
        note: "Each child picks one time for their period.",
      },
      group: {
        title: "Join an age group",
        note: "We place your child by their age on 6 December 2026.",
      },
      fees: {
        title: "Fees and sibling discounts",
        discount: (percent: number) => `${percent}% off`,
        total: (amount: string) => `${amount} total`,
        note: "Prices are per child, per period. 4 or more children also get 15% off, and the discount applies to the whole booking.",
      },
    },
    schedule: { title: "Winter periods" },
    faq: {
      title: "Questions parents ask",
      items: faqItems,
    },
  },
  footer: {
    quickLinks: "Quick links",
    backToTop: "Back to top",
    howItWorks: "How it works",
    winterCalendar: "Winter calendar",
    faq: "FAQ",
    contact: "Contact",
    frontDesk: "Front desk",
    copy: "Copy",
    copied: "Copied",
    rights: "© 2026 Tidewell Swim Club",
  },
  booking: {
    seasonTitle: "Winter Season 2026–27",
    stepsAria: "Booking steps",
    steps: { children: "Swimmer registration", summary: "Summary & payment" },
    children: {
      title: "Book your children",
      note: "Add each child, then pick their period and session time.",
      add: "+ Add another child",
      remove: "Remove",
      removeAria: (position: number) => `Remove child ${position}`,
      name: "Child's name",
      namePlaceholder: "e.g. Yousef",
      dob: "Date of birth",
      period: "Period",
      sessionTime: "Session time",
      ageOutOfRange: "Ages 6–18 only",
      next: "Next: review booking",
    },
    price: {
      title: "Price breakdown",
      tiers: [
        { label: "1 child", note: "full price" },
        { label: "2 children", note: "10% off" },
        { label: "3 or more", note: "15% off" },
      ],
      currentTotal: "Current total",
      subtotalLine: (count: string, price: string) => `${count} × ${price}`,
      subtotal: "Subtotal",
      discount: "Sibling discount",
      discountPercent: (percent: number) => `Sibling discount (${percent}%)`,
      total: "Total",
    },
    periodPopup: { note: "10 sessions, 2 hours each" },
    errors: {
      childName: (position: number) => `Add a name for child ${position}.`,
      childAge: (name: string, position: number) =>
        `Enter a date of birth for ${name || `child ${position}`}. Children must be 6 to 18 years old on 6 December 2026.`,
    },
    parent: {
      title: "Parent details",
      lede: "We use these details to confirm your booking.",
      name: "Parent or guardian name",
      namePlaceholder: "e.g. Sarah Ahmed",
      email: "Email address",
      phone: "Mobile number",
      phoneHint: "We text you if a session is cancelled.",
      errors: {
        name: "Enter your full name.",
        email: "Enter an email like name@example.com.",
        phone: "Enter a phone number with at least 8 digits.",
      },
    },
    summary: {
      title: "Booking summary",
      confirm: "Confirm booking",
      confirming: "Confirming…",
      received: "Booking received.",
      confirmMessage: (count: number) =>
        `${count} ${count === 1 ? "child" : "children"} booked for the winter season. The front desk will text you to arrange payment.`,
      submitFailed: "We couldn't send your booking. Please try again.",
    },
  },
};

export type Dictionary = typeof en;
