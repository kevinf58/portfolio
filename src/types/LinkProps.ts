import { SharedProps } from './SharedProps';
import { UrlObject } from 'url';

export type LinkProps = {
  disabled?: boolean;
  href: string | UrlObject;
  underlined?: boolean;
  title?: string;
  target?: string;
  onClick?: () => void;
} & SharedProps;
