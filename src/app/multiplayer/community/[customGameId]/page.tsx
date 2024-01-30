import { MultiplayerLayout } from '@/components/layouts/multiplayer-layout';

type CustomGameDetailProps = {
  params: {
    customGameId: string;
  }
};

export default function CustomGameDetail({ params }: CustomGameDetailProps) {
  return (
    <MultiplayerLayout>
      <div>Custom Game Detail: {params.customGameId}</div>
    </MultiplayerLayout>
  );
}
