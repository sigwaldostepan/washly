export const slugify = (str: string, id?: number) => {
  let slug = str.toLowerCase().replace(/\s+/g, '-');

  if (id) {
    slug += `-id.${id}`;
  }

  return slug;
};

export const unslugify = (slug: string) => {
  const [name, id] = slug.split('-id.');

  const parsedName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const parsedId = parseInt(id);

  return { name: parsedName, id: parsedId };
};
