export const API_URL = 'http://localhost:8000';
const fetch = window.fetch && window.fetch.bind(window);

export default class Api {

  constructor(fetcher = fetch) {
    this.fetcher = fetcher;
  }

  fetchAll() {
    return this.fetcher(API_URL + '/files')
      .then(res => res.json());
  }

  remove(file) {
    const data = new FormData();
    data.append('file', file.name);
    data.append('key', file.key);

    return this.fetcher(API_URL + '/remove', {
      method: 'POST',
      body: data
    }).then(res => {
      if(!res.ok) throw res.statusText;
      return res;
    });
  }

  upload(file) {
    const data = new FormData();
    data.append('file', file);

    return this.fetcher(API_URL + '/upload', {
      method: 'POST',
      body: data
    })
    .then(res => res.json());
  }
}
