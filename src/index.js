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

basic.form.addEventListener('submit', onFormSubmit);
let dataSearch = '';
let page = 0;

function onFormSubmit(e) {
  e.preventDefault();
  dataSearch = e.currentTarget.searchQuery.value;
  page = 1;
  if (dataSearch.trim() === '') {
    Notify.failure('Please enter your search data.');
    return;
  }

  fetchApi(dataSearch, page).then(response => {
    if (response.totalHits === 0) {
      basic.gallery.innerHTML = '';
      Notify.failure('Sorry, there are no images matching your search query. Please try again!');
    }
    if (response.totalHits > 0) {
      Notify.info(`Hooray! We found ${response.totalHits} images`);
      basic.gallery.innerHTML = '';
      galDisp(response.hits);
    }
  });
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
