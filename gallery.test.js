import { filterByCategory, filterBySearch, parseImageData } from './galleryLogic.js';

const mockImages = [
  {
    id: 1,
    category: 'nature',
    title: 'Grön skog',
    thumbnail: 't1',
    full: 'f1',
    tags: ['skog', 'grön']
  },
  {
    id: 2,
    category: 'city',
    title: 'Stad på kvällen',
    thumbnail: 't2',
    full: 'f2',
    tags: ['stad', 'ljus']
  },
  {
    id: 3,
    category: 'nature',
    title: 'Berg',
    thumbnail: 't3',
    full: 'f3',
    tags: ['berg']
  }
];

//
// -------------------------
// FILTER BY CATEGORY
// -------------------------
//

test('filterByCategory returnerar korrekt urval', () => {
  const result = filterByCategory(mockImages, 'nature');
  expect(result.length).toBe(2);
  expect(result.every(img => img.category === 'nature')).toBe(true);
});

test('filterByCategory med "all" returnerar alla', () => {
  const result = filterByCategory(mockImages, 'all');
  expect(result.length).toBe(3);
});

//
// -------------------------
// FILTER BY SEARCH
// -------------------------
//

test('filterBySearch hittar bilder via taggar', () => {
  const result = filterBySearch(mockImages, 'skog');
  expect(result.length).toBe(1);
  expect(result[0].title).toBe('Grön skog');
});

test('filterBySearch hittar bilder via titel', () => {
  const result = filterBySearch(mockImages, 'stad');
  expect(result.length).toBe(1);
  expect(result[0].category).toBe('city');
});

test('filterBySearch returnerar inte tomt om det finns match', () => {
  const result = filterBySearch(mockImages, 'berg');
  expect(result.length).toBeGreaterThan(0);
});

//
// -------------------------
// PARSE IMAGE DATA
// -------------------------
//

test('parseImageData filtrerar bort ogiltiga objekt', () => {
  const badData = [
    { id: 1, category: 'nature', title: 'ok', thumbnail: 't', full: 'f', tags: [] },
    { id: 2, category: 'city' } // ogiltig
  ];
  const result = parseImageData(badData);
  expect(result.length).toBe(1);
});

test('parseImageData returnerar tom array om input inte är array', () => {
  const result = parseImageData(null);
  expect(result).toEqual([]);
});