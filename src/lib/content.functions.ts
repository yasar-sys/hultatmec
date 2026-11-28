import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { mergeContent } from './content-schema';
export const getWebsiteContent = createServerFn({ method: 'GET' }).handler(async () => {
  const { publicClient } = await import('./public-client.server');
  const { data, error } = await publicClient().from('site_content').select('content').eq('id', 'main').single();
  if (error) throw new Error('Could not load website content');
  return mergeContent(data.content);
});
export const websiteContentOptions = () => queryOptions({ queryKey: ['website-content'], queryFn: () => getWebsiteContent(), staleTime: 0 });
