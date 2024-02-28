import { useContext } from 'react';
import moment, { Moment } from 'moment';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { AppContext } from '@/app/context';
import { MaterialIcon } from '@/components/icon';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';

export type CountdownPeriod = 'daily' | 'weekly';

type CountdownProps = {
  period: CountdownPeriod;
};

type Segment = 'days' | 'hours' | 'minutes' | 'seconds';

const pad = (num: number) => num.toString().padStart(2, '0');

const formatDate = (period: CountdownPeriod, date: Moment) => {
  const segments: Segment[] = ['hours', 'minutes', 'seconds'];
  const paddedSegments = [];

  if (period === 'weekly') {
    const now = moment();
    paddedSegments.push(date.diff(now, 'days'));
  }

  // So this is... different... because we don't want to pad the first
  // segement, and we don't know what that is regardless of daily vs. weekly.
  // If you have 4 hours left, it should show '4:..' and not '04:...'.
  // If you have 0 hours left, the display should start with minutes.
  // etc.
  // I assume there's a much better way to do this with some combination of
  // durations, diff(), and format(), but I'm too tired to figure it out lol.
  for (const segment of segments) {
    const value = date[segment]();
    const hasPaddedSegments = paddedSegments.length > 0;

    if (hasPaddedSegments) {
      // We already have preceding segments, so this value needs zeroes padded.
      paddedSegments.push(pad(value));
    } else if (!!value) {
      // This is our first segment, so we don't care about padding.
      paddedSegments.push(value.toString());
    }
  }

  return paddedSegments.join(':');
};

export const Countdown = ({
  period,
}: CountdownProps) => {
  const { countdown } = useContext(AppContext);
  const css = use4k();

  return (
    <div className={cx(
      getFontVariant(css, 'titillium_description_small'),
      css`
        display: flex;
        align-items: center;
        gap: 0.7vh;
        font-size: 1.852vh;
      `,
    )}>
      <MaterialIcon
        // scale() is eyeballed.
        className={css`transform: scale(1.2);`}
        icon="access_time_filled"
      />
      <div>
        <TextOffset top="-0.093vh">{formatDate(period, countdown)}</TextOffset>
      </div>
    </div>
  );
};
