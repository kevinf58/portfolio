import { JSX } from 'react';
import { UrlObject } from 'url';

export type LinkProps = {
  children: JSX.Element | string;
  disabled?: boolean;
  href: string | UrlObject;
};
