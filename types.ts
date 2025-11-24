export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeroSection {
  greeting: string;
  date: string;
  subTitle: string;
  image: string;
}

export interface InvitationSection {
  title: string;
  subTitle: string;
  guestPlaceholder: string;
  message: string;
  timeLabel: string;
  dateDisplay: string;
  timeSubLabel: string;
  timeDescription: string;
  locationTitle: string;
  locationAddress: string;
  mapLink: string;
  mapLabel: string;
  image: string;
}

export interface CoupleSection {
  sectionTitle: string;
  mainTitle: string;
  groomRole: string;
  groomQuote: string;
  groomImage: string;
  brideRole: string;
  brideQuote: string;
  brideImage: string;
}

export interface CountdownSection {
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  quote: string;
  bgImage: string;
}

export interface StoryItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface StorySection {
  sectionTitle: string;
  mainTitle: string;
  items: StoryItem[];
}

export interface GallerySection {
  sectionTitle: string;
  mainTitle: string;
  items: string[];
}

export interface RSVPForm {
  successTitle: string;
  successMessage: string;
  successButton: string;
  nameLabel: string;
  namePlaceholder: string;
  attendanceLabel: string;
  attendanceOptions: {
    yes: string;
    maybe: string;
    no: string;
  };
  wishLabel: string;
  wishPlaceholder: string;
  submitButton: string;
  submitting: string;
}

export interface BankItem {
  owner: string;
  bank: string;
  number: string;
}

export interface RSVPBanking {
  title: string;
  message: string;
  items: BankItem[];
}

export interface RSVPSection {
  sectionTitle: string;
  mainTitle: string;
  message: string;
  form: RSVPForm;
  banking: RSVPBanking;
}

export interface FooterSection {
  thankYou: string;
  copyright: string;
}

export interface Names {
  groom: string;
  bride: string;
  groomShort: string;
  brideShort: string;
}

export interface WeddingData {
  meta: {
    title: string;
    description: string;
  };
  names: Names;
  date: string;
  navigation: NavigationItem[];
  hero: HeroSection;
  invitation: InvitationSection;
  couple: CoupleSection;
  countdown: CountdownSection;
  story: StorySection;
  gallery: GallerySection;
  rsvp: RSVPSection;
  footer: FooterSection;
  audio: string;
}

export interface RSVPData {
  name: string;
  attendance: string;
  wish: string;
  timestamp: number;
}

export interface RSVPStats {
  total: number;
  yes: number;
  maybe: number;
  no: number;
}