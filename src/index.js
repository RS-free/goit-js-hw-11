import './sass/main.scss';
import fetchApi from './js/fetchApi';
import { basic } from './js/basic';
import entryTemplate from './entry-template.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function galDisp(array) {
  const pictGal = array.map(item => entryTemplate(item)).join('');
  basic.gallery.insertAdjacentHTML('beforeend', pictGal);
  galOptions();
}

function addHide() {
  basic.loadMoreBtn.classList.add('is-hidden');
}
function removeHide() {
  basic.loadMoreBtn.classList.remove('is-hidden');
}
function pageIncrement() {
  page += 1;
}
function clearGalleryHTML() {
  basic.gallery.innerHTML = '';
}

basic.form.addEventListener('submit', onFormSubmit);
let dataSearch = '';
let page = 1;
let perPage = 0;

async function onFormSubmit(e) {
  e.preventDefault();
  page = 1;
  dataSearch = e.currentTarget.searchQuery.value;
  if (dataSearch.trim() === '') {
    Notify.failure('Please enter your search data.');
    return;
  }
  const response = await fetchApi(dataSearch, page);
  perPage = response.hits.length;
  if (response.totalHits <= perPage) {
    addHide();
  } else {
    removeHide();
  }
  if (response.totalHits === 0) {
    clearGalleryHTML();
    Notify.failure('Sorry, there are no images matching your search query. Please try again!');
  }
  try {
    if (response.totalHits > 0) {
      Notify.info(`Hooray! We found ${response.totalHits} images`);
      clearGalleryHTML();
      galDisp(response.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

basic.loadMoreBtn.addEventListener('click', loadMore);

async function loadMore() {
  pageIncrement();
  const response = await fetchApi(dataSearch, page);

  galDisp(response.hits);
  perPage += response.hits.length;

  if (perPage >= response.totalHits) {
    Notify.failure("We're sorry, but you've reached the end of search results.");
    addHide();
  }
}

function galOptions() {
  let galOptions = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionType: 'alt',
    scrollZoomFactor: 0.5,
    captionPosition: 'bottom',
  });
  galOptions.refresh();
}
