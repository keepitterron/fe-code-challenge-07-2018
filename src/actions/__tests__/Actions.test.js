import { removeFile, allFiles, uploadFile, UPLOAD_REQUEST, UPLOAD_LIST, UPLOAD_SUCCESS, UPLOAD_FAILURE, UPLOAD_DELETE } from '../index';

describe('Redux Actions', () => {

  describe('allFiles', () => {

    it('returns a function', () => {
      expect(typeof allFiles()).toBe('function');
    });

    it('dispatches on success', done => {
      const data = {foo: 'bar'};
      const dispatch = jest.fn();
      const api = {
        fetchAll: jest.fn().mockReturnValue(Promise.resolve(data)),
      };

      allFiles(api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_REQUEST});
          expect(dispatch.mock.calls[1][0]).toEqual({type: UPLOAD_LIST, data});
          done();
        })
        .catch(done.fail);
    });

    it('dispatches on reject', done => {
      const dispatch = jest.fn();
      const api = {
        fetchAll: jest.fn().mockReturnValue(Promise.reject()),
      };

      allFiles(api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_REQUEST});
          expect(dispatch.mock.calls[1][0]).toEqual({type: UPLOAD_FAILURE});
          done();
        });
    });
  });

  describe('removeFile', () => {

    it('returns a function', () => {
      expect(typeof removeFile(null)).toBe('function');
    });

    it('dispatches on success', done => {
      const dispatch = jest.fn();
      const key = 'abc';
      const api = {
        remove: jest.fn().mockReturnValue(Promise.resolve()),
      };

      removeFile({key}, api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_DELETE, key});
          done();
        })
        .catch(done.fail);
    });

    it('dispatches on reject', done => {
      const dispatch = jest.fn();
      const api = {
        remove: jest.fn().mockReturnValue(Promise.reject()),
      };

      removeFile(null, api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_FAILURE});
          done();
        });
    });
  });

  describe('uploadFile', () => {

    it('returns a function', () => {
      expect(typeof uploadFile(null)).toBe('function');
    });

    it('dispatches on success', done => {
      const dispatch = jest.fn();
      const data = {success: true};
      const api = {
        upload: jest.fn().mockReturnValue(Promise.resolve(data)),
      };

      uploadFile(null, api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_REQUEST});
          expect(dispatch.mock.calls[1][0]).toEqual({type: UPLOAD_SUCCESS, data});
          done();
        })
        .catch(done.fail);
    });

    it('dispatches on error', done => {
      const dispatch = jest.fn();
      const data = {success: false};
      const api = {
        upload: jest.fn().mockReturnValue(Promise.resolve(data)),
      };

      uploadFile(null, api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_REQUEST});
          expect(dispatch.mock.calls[1][0]).toEqual({type: UPLOAD_FAILURE});
          done();
        })
        .catch(done.fail);
    });

    it('dispatches on reject', done => {
      const dispatch = jest.fn();
      const api = {
        upload: jest.fn().mockReturnValue(Promise.reject()),
      };

      uploadFile(null, api)(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0]).toEqual({type: UPLOAD_REQUEST});
          expect(dispatch.mock.calls[1][0]).toEqual({type: UPLOAD_FAILURE});
          done();
        });
    });
  });

});
