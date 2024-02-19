export const SEARCH_FILTER = (
  items: any[],
  query: string,
  keys: string[] = []
) => {
  if (!query || typeof query !== 'string' || !items) return items;

  const find: any = (item: any) => {
    if (item) {
      return Object.entries(item).find(
        ([key, value]) => typeof value === 'string' && value.includes(query)
      );
    } else {
      return;
    }
  };
  let q = query.toLowerCase();
  console.log('length', [
    ...items.filter(
      (item) =>
        item.country?.toLowerCase().startsWith(q) ||
        item.name?.toLowerCase().startsWith(q)
    ),
  ]);
  return [
    ...items.filter(
      (item) =>
        item.country?.toLowerCase().startsWith(q) ||
        item.name?.toLowerCase().startsWith(q)
    ),
  ];
};
