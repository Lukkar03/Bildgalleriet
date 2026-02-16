import { filterByCategory, filterBySearch, parseImageData } from './galleryLogic.js';

const galleryEl = document.getElementById('gallery');
const viewerImg = document.getElementById('viewer-img');
const viewerTitle = document.getElementById('viewer-title');
const tabButtons = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('search');

let allImages = [];
let currentCategory = 'all';
let currentSearch = '';

function renderGallery(images) {
  galleryEl.innerHTML = '';
  images.forEach(img => {
    const imageEl = document.createElement('img');
    imageEl.src = img.thumbnail;
    imageEl.alt = img.title;
    imageEl.loading = 'lazy';
    imageEl.addEventListener('click', () => showImage(img));
    galleryEl.appendChild(imageEl);
  });
}

function showImage(img) {
  viewerImg.src = img.full;
  viewerImg.alt = img.title;
  viewerTitle.textContent = img.title;
  viewerImg.classList.remove('hidden');
}

function applyFilters() {
  let filtered = filterByCategory(allImages, currentCategory);
  filtered = filterBySearch(filtered, currentSearch);
  renderGallery(filtered);
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    applyFilters();
  });
});

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  applyFilters();
});

fetch('images.json')
  .then(res => res.json())
  .then(data => {
    allImages = parseImageData(data);
    applyFilters();
  })
  .catch(err => console.error('Kunde inte ladda bilder:', err));