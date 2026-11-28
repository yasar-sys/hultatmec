import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/media/$filename')({
  server: { handlers: { GET: async ({ params }) => {
    if (!/^[a-f0-9-]{36}\.(png|jpg|webp|gif)$/.test(params.filename)) return new Response('Not found', { status: 404 });
    const { publicClient } = await import('@/lib/public-client.server');
    const { data, error } = await publicClient().storage.from('site-media').download(params.filename);
    if (error || !data) return new Response('Not found', { status: 404 });
    return new Response(data, { headers: { 'Content-Type': data.type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
  } } },
});
