type CustomGameDetailProps = {
  params: {
    customGameId: string;
  }
};

export async function generateStaticParams() {
  return [{ customGameId: '123' }];
}

export default function CustomGameDetail({ params }: CustomGameDetailProps) {
  return (
    <div>Custom Game Detail: {params.customGameId}</div>
  );
}
