import { SharedProps } from './SharedProps';

export type CardProps = {
  cardType: 'project' | 'blog' | 'award' | 'technology';
} & SharedProps;