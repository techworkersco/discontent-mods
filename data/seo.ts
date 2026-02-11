import { useRouter } from 'next/router';
import { projectStrings } from './site';

export const useCanonicalURL = (path?: string) => {
  const router = useRouter()
  return (new URL(path || router.asPath, projectStrings.baseUrl)).toString()
}