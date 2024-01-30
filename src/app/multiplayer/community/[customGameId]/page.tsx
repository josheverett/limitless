type CustomGameDetailProps = {
  params: {
    customGameId: string;
  }
};

export default function CustomGameDetail({ params }: CustomGameDetailProps) {
  return (
    <div>Custom Game Detail: {params.customGameId}</div>
  );
}
