import { useEffect } from 'react';

type SeoHeadProps = {
  title: string;
  description?: string;
};

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
}

export default function SeoHead({ title, description }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMeta('description', description);
    }
  }, [description, title]);

  return null;
}
