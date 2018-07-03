import Api, { API_URL } from '../Api';

describe('Api', () => {
  const res = { json: jest.fn(), ok: true, statusText: 'foo' };
  const file = { name: 'foo', key: 'bar' };

  describe('fetchAll', () => {
    it('calls the files endpoint', done => {
      const fetcher = jest.fn().mockReturnValue(Promise.resolve(res));
      const api = new Api(fetcher);

      api
        .fetchAll()
        .then(() => {
          expect(fetcher).toHaveBeenCalledWith(`${API_URL}/files`);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('remove', () => {
    it('calls the remove endpoint with data', done => {
      res.ok = true;
      const fetcher = jest.fn().mockReturnValue(Promise.resolve(res));
      const api = new Api(fetcher);
      const body = new FormData();
      body.append('file', file.name);
      body.append('key', file.key);

      api
        .remove(file)
        .then(() => {
          expect(fetcher).toHaveBeenCalledWith(`${API_URL}/remove`, {method: 'POST', body});
          done();
        })
        .catch(done.fail);
    });

    it('throws appropriately', done => {
      res.ok = false;
      const fetcher = jest.fn().mockReturnValue(Promise.resolve(res));
      const api = new Api(fetcher);
      api
        .remove(file)
        .then(done.fail)
        .catch(err => {
          expect(err).toEqual(res.statusText);
          done();
        });
    });
  });

  describe('upload', () => {
    it('calls the upload endpoint', done => {
      const fetcher = jest.fn().mockReturnValue(Promise.resolve(res));
      const api = new Api(fetcher);
      const body = new FormData();
      body.append('file', file);

      api
        .upload(file)
        .then(() => {
          expect(fetcher).toHaveBeenCalledWith(`${API_URL}/upload`, {method: 'POST', body});
          done();
        })
        .catch(done.fail);
    });
  });
});
