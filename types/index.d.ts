export interface FilterList {
  rowId: number;
  field: typeof AccountStatsType | string;
  operator: string;
  value: string;
  combine: "and" | "or";
  label: string;
}

export type Page = {
  id: string;
  title: string;
  url: string;
  description: string;
  subPages?: Page[];
};
type Pages = {
  [pageName: string]: Page;
};

export type SiteConfig = {
  name: string;
  title: string;
  businessName: string;
  description: string;
  url: string;
  logo: string;
  links: {
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  contact: {
    supportEmail: string;
  };
  emailLists: {
    [key: string]: string;
  };
  pages: Pages;
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
