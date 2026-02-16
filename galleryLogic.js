export function filterByCategory(images, category) {
  if (category === 'all') return images;
  return images.filter(img => img.category === category);
}

export function filterBySearch(images, searchText) {
  const text = searchText.trim().toLowerCase();
  if (!text) return images;
  return images.filter(img =>
    img.tags.some(tag => tag.toLowerCase().includes(text)) ||
    img.title.toLowerCase().includes(text)
  );
}

export function parseImageData(data) {
  if (!Array.isArray(data)) return [];
  return data.filter(img =>
    img.id &&
    img.category &&
    img.title &&
    img.thumbnail &&
    img.full &&
    Array.isArray(img.tags)
  );
}