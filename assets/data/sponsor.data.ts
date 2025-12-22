export interface Sponsor {
  name: string;
  logo: string;
  website?: string;
  tier: "diamond" | "platinum" | "gold" | "silver" | "bronze" | "partner";
}

export const sponsors: Sponsor[] = [
  {
    name: "Universitas Negeri Malang",
    logo: "/lambang-um.webp",
    website: "https://um.ac.id",
    tier: "platinum",
  },
  {
    name: "Cloudflare",
    logo: "/lambang-cloudflare.png",
    website: "https://cloudflare.com",
    tier: "gold",
  },
  {
    name: "Idcloudhost",
    logo: "/lambang-idcloudhost.webp",
    website: "https://idcloudhost.com",
    tier: "gold",
  },
];

export const tierConfig = {
  diamond: {
    title: "Diamond Sponsor",
    badgeClass: "badge-info",
    logoSize: "h-20 md:h-24",
    gridCols: "grid-cols-1 md:grid-cols-2",
  },
  platinum: {
    title: "Platinum Sponsor",
    badgeClass: "badge-primary",
    logoSize: "h-16 md:h-20",
    gridCols: "grid-cols-2 md:grid-cols-3",
  },
  gold: {
    title: "Gold Sponsor",
    badgeClass: "badge-secondary",
    logoSize: "h-12 md:h-16",
    gridCols: "grid-cols-3 md:grid-cols-4",
  },
  silver: {
    title: "Silver Sponsor",
    badgeClass: "badge-accent",
    logoSize: "h-10 md:h-12",
    gridCols: "grid-cols-4 md:grid-cols-5",
  },
  bronze: {
    title: "Bronze Sponsor",
    badgeClass: "badge-warning",
    logoSize: "h-8 md:h-10",
    gridCols: "grid-cols-5 md:grid-cols-6",
  },
  partner: {
    title: "Partner",
    badgeClass: "badge-neutral",
    logoSize: "h-6 md:h-8",
    gridCols: "grid-cols-6 md:grid-cols-8",
  },
};
