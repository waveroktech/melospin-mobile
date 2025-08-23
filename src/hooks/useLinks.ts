import {useMemo} from 'react';

export const useExternalLinks = (data: any) => {
  const hasLinks = useMemo(() => {
    return Boolean(data?.externalLinks?.length);
  }, [data?.externalLinks]);

  const validLinks = useMemo(() => {
    return (
      data?.externalLinks?.filter(
        (link: {link: string}) => link?.link && link.link.trim() !== '',
      ) || []
    );
  }, [data?.externalLinks]);

  return {hasLinks, validLinks};
};
