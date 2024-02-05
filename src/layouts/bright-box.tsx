import { useContext, useState } from 'react';
import cx from 'classnames';
import { AppContext } from '@/app/context';
import { use4k, vhCssTo4k } from '@/hooks/use-4k';

// Forgive me lord for what I am about to do...
// This is a suuuper special case, not worth updating use4k for.
// Prototyped at: https://codepen.io/puglr/pen/bGZMmJq

const defaultBorder = (transparentStart: string, transparentEnd: string) => {
  return `linear-gradient(
      to bottom,
      #f4f4f4 0%,
      #f4f4f4 ${transparentStart},
      transparent ${transparentStart},
      transparent ${transparentEnd},
      hsla(0,0%,100%,0.5) ${transparentEnd},
      hsla(0,0%,100%,0.5) calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentStart}),
      #f4f4f4 calc(100% - ${transparentStart}),
      #f4f4f4 100%
    ) 1 stretch
  `;
};

const focusBorderNotchedInner = (
  transparentStart: string,
  transparentEnd: string
) => {
  return `linear-gradient(
      to bottom,
      #f4f4f4 0%,
      #f4f4f4 calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentStart}),
      #f4f4f4 calc(100% - ${transparentStart}),
      #f4f4f4 100%
    ) 1 stretch
  `;
};

const focusBorderNotchedOuter = (
  transparentStart: string,
  transparentEnd: string
) => {
  return `linear-gradient(
      to bottom,
      #f4f4f4 0%,
      #f4f4f4 calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentEnd}),
      transparent calc(100% - ${transparentStart}),
      #f4f4f4 calc(100% - ${transparentStart}),
      #f4f4f4 100%
    ) 1 stretch
  `;
};

const focusBorderFull = () => {
  // Yeah just a solid color here, but has to fit the format. :)
  return 'linear-gradient(to bottom, #f4f4f4 0%, #f4f4f4 100%) 1 stretch';
};

const hiddenBorder = () => {
  return 'linear-gradient(to bottom, transparent 0%, transparent 100%) 1 stretch';
};

const THIN_BORDER = '0.231vh';
// const THICK_BORDER = '0.37vh';
const PADDING = '0.37vh' // Only coincidentally same as thick border.
const NEGATIVE_MARGIN = `-${THIN_BORDER}`;

type FancyBorderProps = {
  notched?: boolean;
  outer?: boolean;
  isFocused?: boolean;
  children: React.ReactNode;
};

const FancyBorder = ({
  notched = false,
  outer = false,
  isFocused = false,
  children,
}: FancyBorderProps) => {
  const { force4k } = useContext(AppContext);
  const _4k = use4k();

  let transparentStart = force4k ? vhCssTo4k('1.343vh') : '1.343vh';
  let transparentEnd = force4k ? vhCssTo4k('1.759vh') : '1.759vh';

  // These are eyeballed aren't aren't perfect under a microscope. :P
  if (outer) {
    transparentStart = force4k ? vhCssTo4k('1.53vh') : '1.53vh';
    transparentEnd = force4k ? vhCssTo4k('1.995vh') : '1.995vh';
  }

  let borderImage = outer
    ? hiddenBorder() :
    defaultBorder(transparentStart, transparentEnd);

  if (isFocused) borderImage = focusBorderFull();

  if (isFocused && notched) {
    borderImage = outer
      ? focusBorderNotchedOuter(transparentStart, transparentEnd)
      : focusBorderNotchedInner(transparentStart, transparentEnd);
  }

  return (
      <div
        // Yup animating border-image actually works, what a time to be alive.
        className="w-full border-solid transition-[border-image]"
        style={{
          ..._4k({ borderWidth: THIN_BORDER }),
          borderImage,
        }}
      >
        {children}
      </div>
  );
};

type BrightBoxProps = {
  className?: string;
  notched?: boolean; // Refers to isFocused state. Default state always notched.
  isFocused?: boolean;
  children: React.ReactNode;
};

export const BrightBox = ({
  className,
  notched = false,
  isFocused = false,
  children,
}: BrightBoxProps) => {
  const _4k = use4k();

  return (
    // TODO: Might end up needing to remove this negative margin.
    // No big deal, looks fine without it -- just not under a microscope.
    <div className={className} style={_4k({ margin: NEGATIVE_MARGIN })}>
      <FancyBorder notched={notched} isFocused={isFocused} outer>
        <FancyBorder notched={notched} isFocused={isFocused}>
          <div style={_4k({ padding: PADDING })}>
            {children}
          </div>
        </FancyBorder>
      </FancyBorder>
    </div>
  );
};
