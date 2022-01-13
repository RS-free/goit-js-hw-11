export function fetchApi(data, page) {
  const pathUrl = 'https://pixabay.com/api/';
  const myKey = '25204075-3781bb79acf61945e34dbcf8a';
  const listOfParam = `key=${myKey}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return fetch(`${pathUrl}?${listOfParam}`).then(res => res.json());
}
