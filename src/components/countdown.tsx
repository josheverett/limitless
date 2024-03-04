import { useEffect, useState, useContext } from 'react';
import moment, { Moment } from 'moment';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { MaterialIcon } from '@/components/icon';
import { TextOffset } from '@/components/text';
import { getFontVariant } from '@/app/styles/fonts';
import { AppContext } from '@/app/context';

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
    const diff = date.diff(now, 'days');
    if (diff === 1) return `${diff} Day`;
    if (diff > 1) return `${diff} Days`;
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
  const { countdownDate: countdownDate_ } = useContext(AppContext);
  const [countdownDate, setCountdownDate] = useState(countdownDate_);
  const css = use4k();

  useEffect(() => {
    setCountdownDate(countdownDate_);
    const intervalId = setInterval(() => {
      setCountdownDate((prev) => prev.clone().subtract(1, 'seconds'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownDate_]);

  return (
    <div className={cx(
      getFontVariant(css, 'titillium_description_small'),
      css`
        display: flex;
        align-items: center;
        gap: 0.7vh; // Eyeballed, of course, like all text-related things.
        font-size: 1.852vh;
      `,
    )}>
      <MaterialIcon
        // transforms are eyeballed.
        className={css`transform: scale(1.2) translateY(-0.056vh);`}
        icon="access_time_filled"
      />
      <div>
        <TextOffset top="-0.093vh">{formatDate(period, countdownDate)}</TextOffset>
      </div>
    </div>
  );
};
