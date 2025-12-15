// This file contains the About section data for easy editing via admin panel
export interface AboutData {
  yearsOfTravel: number;
  imagesTaken: number;
  countriesVisited: number;
  vlogsCreated: number;
  subscribers: number;
  aboutText: string;
  images: string[]; // URLs or paths
}

export const aboutData: AboutData = {
  yearsOfTravel: 4,
  imagesTaken: 1000,
  countriesVisited: 6,
  vlogsCreated: 350,
  subscribers: 20000,
  aboutText: `We are Shahla and Noor, your one-stop shop for desi travel! TDC Khanabadosh is more than just a travel blog – it's your gateway to unforgettable experiences in Pakistan and beyond, curated especially for our desi globetrotters!

What makes us different? We understand the desi perspective! From finding halal food to navigating cultural nuances, we share tips and tricks to make your travels smooth and enjoyable. We don't just visit tourist hotspots – we delve deeper, seeking hidden gems and local experiences that capture the true essence of a place.

Expect nothing but real talk! We share our firsthand experiences, including the good, the bad, and the hilarious, to help you confidently plan your trip. We have a special love for our homeland, Pakistan, and we'll showcase its breathtaking beauty, rich culture, and warm hospitality, inspiring you to explore this incredible country.

Whether you're a seasoned traveller or a curious first-timer, we're here to guide you every step of the way. We believe that travel is not just about ticking destinations off a list; it's about creating memories, collecting experiences, and discovering new parts of yourself. Let TDC Khanabadosh be your travel companion, and together, let's embark on incredible journeys that will broaden your horizons and leave you with a heart full of stories!`,
  images: [
    "https://lh3.googleusercontent.com/sitesv/AAzXCkdeGLdmG4UY5bWB6K1RyTXNDjDv7Fv3lT-ETT09cpBN7Pz4rwF-emVTZO8cVkxjDA5iG17dDF7B0b04fjyEX7cIw5zfZRw_0uxSMknqEm_Y6EEDYs6v4fcy6aGqED9mn-UEMFbkj9X0GMcoAfKeMjkzINQlxUmbQA3gQxiUG5xrgskGkzadG_-BnMB2nZv5opUE9MGPgGvAapR1zOAJajOe83u158lnyVXV8_Q=w1280",
    "https://scontent.fisb29-1.fna.fbcdn.net/v/t39.30808-6/450103017_318768211307826_1699278895173317173_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=F4EtcNCKxMIQ7kNvwGAgN5g&_nc_oc=Adm7Zlgg8J5M5VDzSpQIcgt9c4ugrK0eIeNQvyF14TSKlcVxPw2HxfUCK53oMGR74FY&_nc_zt=23&_nc_ht=scontent.fisb29-1.fna&_nc_gid=MafLGmAp9EV9_5TLGSRncg&oh=00_AfluGIVOxJrB3Y82vC8Z-L6_qJeLTrnJL8QImZovxULqrQ&oe=69437B94"
  ],
};
