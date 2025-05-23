import { UrlObject } from 'url';

export type LinkProps = {
  children: React.ReactNode;
  disabled?: boolean;
  href: string | UrlObject;
  underlined?: boolean;
  title?: string;
  target?: string;
  className?: string;
  onClick?: () => void;
};
