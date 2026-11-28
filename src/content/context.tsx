import { createContext, useContext } from 'react';
import { defaultContent, type SiteContent } from './site';
export const SiteContentContext = createContext<SiteContent>(defaultContent);
export const useSiteContent = () => useContext(SiteContentContext);
