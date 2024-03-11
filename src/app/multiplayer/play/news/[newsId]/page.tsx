type NewsDetailProps = {
  params: {
    newsId: string;
  }
};

export async function generateStaticParams() {
  return [{ newsId: '123' }];
}

export default function NewsDetail({ params }: NewsDetailProps) {
  return (
    <div>News Id: {params.newsId}</div>
  );
}
