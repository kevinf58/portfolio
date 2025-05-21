import { JSX } from 'react';
import { UrlObject } from 'url';

export type LinkProps = {
  children: JSX.Element | string;
  disabled?: boolean;
  href: string | UrlObject;
  underlined?: boolean;
  title?: string;
  target?: string;
  className?: string;
  onClick?: () => void;
};
