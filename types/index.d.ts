export interface FilterList {
  rowId: number;
  field: typeof AccountStatsType | string;
  operator: string;
  value: string;
  combine: "and" | "or";
  label: string;
}

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  logo: string;
  links: {
    twitter: string;
    github: string;
  };
  contact: {
    supportEmail: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  cta?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};
