import type { ReactElement } from 'react';
import classes from './Logo.module.css';
import type React from 'react';
import { Star } from '../Figuras';
export default function Logo(props: React.ComponentProps<'div'>): ReactElement {
  const classWrapper = (props.className ?? '') + ' ' + classes['logo-wrapper'];
  const wrapperProps = {
    ...props,
    className: classWrapper,
  };
  return (
    <div {...wrapperProps}>
      <div className={classes.star}></div>
      <Star
        nPointed={6}
        style={{ translate: '0 -20px', position: 'relative' }}
      ></Star>
    </div>
  );
}
