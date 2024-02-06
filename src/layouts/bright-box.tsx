import { useContext, } from 'react';
import { AppContext } from '@/app/context';
import { use4k } from '@/hooks/use-4k';

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
  const css = use4k();

  let transparentStart = '1.343vh';
  let transparentEnd = '1.759vh';

  // These are eyeballed and aren't aren't perfect under a microscope. :P
  if (outer) {
    transparentStart = '1.53vh';
    transparentEnd = '1.995vh';
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

  // Yup animating border-image actually works, what a time to be alive.
  return (
      <div className={css`
        width: 100%;
        border-style: solid;
        border-width: ${THIN_BORDER};
        transition-property: border-image;
        border-image: ${borderImage};
      `}>
        {children}
      </div>
  );
};

type BrightBoxProps = {
  notched?: boolean; // Refers to isFocused state. Default state always notched.
  isFocused?: boolean;
  children: React.ReactNode;
};

export const BrightBox = ({
  notched = false,
  isFocused = false,
  children,
}: BrightBoxProps) => {
  const css = use4k();

  return (
    // TODO: Might end up needing to remove this negative margin.
    // No big deal, looks fine without it -- just not under a microscope.
    <div className={css`margin: -${THIN_BORDER};`}>
      <FancyBorder notched={notched} isFocused={isFocused} outer>
        <FancyBorder notched={notched} isFocused={isFocused}>
          <div className={css`padding: 0.37vh;`}>
            {children}
          </div>
        </FancyBorder>
      </FancyBorder>
    </div>
  );
};
