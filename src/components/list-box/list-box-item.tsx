'use client';

import { useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { css } from '@emotion/css'
import { AppContext } from '@/app/context';
import { use4k, vhCssTo4k } from '@/hooks/use-4k';
import { TextOffset } from '@/components/text';
import { Teko_2_3_Wide } from '@/app/styles/fonts';

export type ListBoxItemProps = {
  href: string;
  text: string;
};

export const ListBoxItem = ({
  href,
  text,
}: ListBoxItemProps) => {
  const { force4k } = useContext(AppContext);
  const _4k = use4k();

  const translateX = vhCssTo4k('-0.463vh');
  const translateY = vhCssTo4k('-0.324vh');

  const transparentEnd = force4k ? vhCssTo4k('0.324vh') : '0.324vh';

  const focusTransparentStart = force4k ? vhCssTo4k('0.324vh') : '0.324vh';
  const focusTransparentEnd = force4k ? vhCssTo4k('0.602vh') : '0.602vh';

  return (
    // <li> has no styles because we need to rely on :focus for erethang.
    <li>
      {/* Bottom "tray" border. */}
      <Link
        href={href}
        onMouseEnter={(e) => e.currentTarget.focus()}
        className={cx(
          'relative flex items-center w-full border-solid',
          // Ah geez here I go again with the cutout borders...
          css`
          &:focus {
            .list-box-item-cutout-border {
              color: black;
              transform: translate(${translateX}, ${translateY});
              border-image: linear-gradient(
                to bottom,
                #f4f4f4 0%,
                #f4f4f4 ${focusTransparentStart},
                transparent ${focusTransparentStart},
                transparent ${focusTransparentEnd},
                hsla(0,0%,100%,0.5) ${focusTransparentEnd},
                hsla(0,0%,100%,0.5) calc(100% - ${focusTransparentEnd}),
                transparent calc(100% - ${focusTransparentEnd}),
                transparent calc(100% - ${focusTransparentStart}),
                #f4f4f4 calc(100% - ${focusTransparentStart}),
                #f4f4f4 100%
              ) 1 stretch;
            }

            .list-box-item-focus-bg {
              background: #f4f4f4;
            }
          }
        `
        )}
        style={{
          ..._4k({ borderWidth: '0.093vh' }),
          borderImage: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent calc(100% - ${transparentEnd}),
              hsl(0,0%,50%) calc(100% - ${transparentEnd}),
              hsl(0,0%,50%) 100%
            ) 1 stretch
          `,
        }}
      >
        {/* All-sides cutout border. */}
        <div
          className={`
            list-box-item-cutout-border
            flex items-center w-full h-ful
             border-solid border-transparent
             transition-transform duration-[200ms]
          `}
          style={{
            ..._4k({
              height: '4.907vh',
              borderWidth: '0.093vh',
              paddingTop: '0.231vh',
              paddingBottom: '0.231vh',
              paddingLeft: '0.231vh',
              paddingRight: '0.231vh',
              ...Teko_2_3_Wide,
              fontWeight: 400, // TODO: Consider weighted "Wide" fonts.
            }),
          }}
        >
          {/* Text padding. */}
          <div
            className="list-box-item-focus-bg flex w-full h-full items-center"
            style={{..._4k({
              // paddingLeft: '2.037vh'
              paddingLeft: '1.806vh' // Has paddingLeft from parent subtracted.
            })}}
          >
            <TextOffset top="0.2vh">{text}</TextOffset>
          </div>
        </div>
      </Link>
    </li>
  );
};
