import { useEffect, useState, useContext, useRef } from 'react';
import { cx } from '@emotion/css';
import { use4k } from '@/hooks/use-4k';
import { useInput } from '@/hooks/use-gamepad';
import { FooterButton } from '@/components/footer/footer-button';
import { MetaButton } from '@/components/footer/meta-button';
import { Image } from '@/components/image';
import { getFontVariant } from '@/app/styles/fonts';
import { AppContext } from '@/app/context';

type SeparatorProps = { type?: 'middle' | 'end'; };

const Separator = ({ type = 'middle' }: SeparatorProps) => {
  const css = use4k();

  // Not sure if this is opaque or not in the real thing. But it looks fine
  // on all pages. Could determine this by testing different backgrounds
  // but whatevs.
  if (type == 'middle') {
    return (
      <div className={css`
        flex-grow: 0;
        flex-shrink: 0;
        min-width: 1px;
        width: 0.093vh;
        height: 5.556vh;
        background: hsla(216, 7%, 71%, 70%);
      `} />
    );
  }

  return (
    <div className={css`
      flex-grow: 0;
      flex-shrink: 0;
      min-width: 2px;
      width: 0.185vh;
      height: 100%;
      background: hsla(0, 0%, 100%, 15%);
    `} />
  );
};

const FooterNameplate = () => {
  const css = use4k();

  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          // gonna be honest the padding-left is wider than the real thing
          // and the gap is more narrow that the real thing. but looks so
          // much better with the avatar I'm using, so yeah. My real cat
          // avatar is visually misleading because of the whiksers. :)
          /* gap: 1.481vh; */
          gap: 1.296vh;
          height: 4.63vh;
          padding-left: 0.741vh;
          padding-right: 1.389vh;
          font-size: 1.9vh;
          font-style: italic;
          background: hsla(0, 0%, 0%, 0.25);
        `,
        getFontVariant(css, 'titillium'),
      )}
    >
      <div className={css`position: relative; width: 3.1vh;`}>
        <Image
          className={css`width: 100%; height: 100%;`}
          fill
          unoptimized
          aspectRatio={1}
          src="/helmet-avatar.png"
          alt="Player Icon"
        />
      </div>
      <div className={cx(
        css`flex-shrink: 0;`,
        getFontVariant(css, 'shadow_soft'),
      )}>
        a lil pug
      </div>
    </div>
  );
};

type FooterProps = {
  className?: string;
};

export const Footer = ({ className }: FooterProps) => {
  const {
    force4k,
    setForce4k,
    fullscreen,
    setFullscreen,
  } = useContext(AppContext);

  const [animate, setAnimate] = useState(false);
  const [strokeDegrees, setStrokeDegrees] = useState(0);
  const [startHold, setStartHold] = useState(Date.now());
  const animateRef = useRef(animate);

  const css = use4k();

  useInput({
    input: 'GUIDE',
    state: 'press',
    callback: () => setFullscreen(!fullscreen),
  });

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const animateStroke = () => {
    requestAnimationFrame(() => {
      if (!animateRef.current) return;
      setStrokeDegrees((prev) => prev + 0.6);
      animateStroke();
    });
  };

  return (
    <div
      className={cx(
        css`
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7.269vh;
          padding: 0 4.398vh;
          background: hsla(0, 0%, 0%, 0.4);
        `,
        className,
      )}
    >
      {/* TODO: gonna move this anyway */}
      <div className={css`
        display: flex;
        gap: 3vh;
      `}>
        <MetaButton
          icon="4k"
          label="Force 4k"
          enabled={force4k}
          onClick={() => setForce4k(!force4k)}
        />
        <MetaButton
          icon="fullscreen"
          label="Fullscreen"
          enabled={fullscreen}
          onClick={() => setFullscreen(!fullscreen)}
        />
      </div>
      <div className={css`flex-grow: 1;`} />
      <div className={css`
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        gap: 1.435vh;
        height: 100%;
        background: hsla(0, 0%, 100%, 0.02);
      `}>
        <Separator type="end" />
        <FooterNameplate />
        <Separator />
        <FooterButton
          input="START"
          icon="comment"
          state="hold"
          height={1.481}
          animate={animate}
          strokeDegrees={strokeDegrees}
          callback={() => {
            console.log('DERP START INPUT BUTTON HELD');
            // Need app context prop for chat window open.
            if (strokeDegrees >= 360) {
              console.log('DERP OPEN CHAT');
              setAnimate(false);
              return;
            }
            if (!animate) setStartHold(Date.now());
            setAnimate(true);
            animateStroke();
          }}
        />
        <Separator />
        <FooterButton
          input="SELECT"
          icon="group"
          state="press"
          height={1.157}
          label={16}
          callback={() => {
            console.log('DERP SELECT INPUT BUTTON');
          }}
        />
        <Separator />
        <FooterButton
          input="START"
          icon="settings"
          state="release"
          height={1.528}
          callback={() => {
            // TODO: Need an app context prop to keep track if chat window
            // is open. If so, this callback is a no-op.
            const holdDuration = Date.now() - startHold;
            setAnimate(false);
            setStrokeDegrees(0);
            // 220 is arbitrary, feels right
            // Meanwhile for keyboard input, the `hold` callback never runs,
            // (because I didn't implement it) and so startHold is always a
            // large number. So if holdDuration is > 1s we'll assume keyboard.
            if (holdDuration <= 220 || holdDuration > 1000) {
              console.log('DERP OPEN MENU', holdDuration);
            }
          }}
        />
        <Separator type="end" />
      </div>
    </div>
  );
};
