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
