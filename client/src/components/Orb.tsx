/**
 * Orb — EchoAI's calm "presence" mark.
 *
 * A soft glass-marble built purely in CSS: a blurred pastel halo, a glossy
 * gradient ball with a specular sheen. It breathes slowly at rest and a little
 * quicker while the assistant is thinking. Used as the hero mark, the brand
 * mark and the assistant avatar.
 *
 * @license Apache-2.0
 */
import { FC } from 'react';

interface OrbProps {
  /** 'hero' for the large landing mark, 'sm' for an inline avatar. */
  variant?: 'hero' | 'sm';
  /** Breathes a little faster while the assistant is generating. */
  thinking?: boolean;
  className?: string;
}

const Orb: FC<OrbProps> = ({ variant = 'hero', thinking = false, className = '' }) => {
  const classes = [
    'orb',
    'orb--breathe',
    variant === 'sm' ? 'orb--sm' : '',
    thinking ? 'orb--thinking' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <span className="orb__halo" />
      <span className="orb__ball" />
      <span className="orb__sheen" />
    </div>
  );
};

export default Orb;
