'use client';

import { useContext, useEffect } from 'react';
import Script from 'next/script';
import { AppContext } from '@/app/context';

// This file exists to bootstrap the `fourk` template tag.

// TODO: This was take one, take two doesn't need this.
// This should not be commited.

export const FourK = () => {
  const { force4k } = useContext(AppContext);

  useEffect(() => {
    console.log('DERP 4K CHANGED', force4k);
    window.__FORCE_4K = force4k;
  }, [force4k]);

  return (
    <Script strategy="beforeInteractive">window.__FORCE_4K = false;</Script>
  );
};
