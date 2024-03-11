import Image from 'next/image';

// Can't use any client stuff here.

export default async function NotFound() {
  return (
    <div id="404-page" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/404-bg.webp)',
      backgroundSize: 'cover',
    }}

    >
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '3vh',
        maxWidth: '90vw',
        maxHeight: '90vw',
        fontSize: '3vh',
        textAlign: 'center',
      }}>
        <h2>Not yet implemented! {`Here's`} Craig for your troubles:</h2>
        <div style={{ position: 'relative', height: '30vh' }}>
          <Image
            fill
            src={'/craig.webp'}
            alt="Craig"
            unoptimized={true}
            priority={true}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <a role="button" href="/multiplayer/play">Back to Multiplayer Page</a>
      </div>
    </div>
  );
}
