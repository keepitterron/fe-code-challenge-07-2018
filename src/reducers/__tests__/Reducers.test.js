import { UPLOAD_REQUEST, UPLOAD_LIST, UPLOAD_SUCCESS, UPLOAD_FAILURE, UPLOAD_DELETE } from '../../actions';
import { items, isError, isFetching } from '../index';

describe('Redux Actions', () => {
  describe('items', () => {
    it('adds items to the state', () => {
      const data = [
        'foo',
        'bar',
        'baz',
      ];
      const action = {
        type: UPLOAD_LIST,
        data,
      };
      const state = items(undefined, action);

      expect(state).toEqual(data);
    });

    it('adds item to the state', () => {
      const expected = [
        'foo',
        'bar',
        'baz',
      ];
      const action = {
        type: UPLOAD_SUCCESS,
        data: 'baz',
      };
      const state = items(['foo', 'bar'], action);

      expect(state).toEqual(expected);
    });

    it('removes item from the state', () => {
      const data = [
        {key: 'foo'},
        {key: 'bar'},
        {key: 'baz'},
      ];
      const expected = [
        {key: 'foo'},
        {key: 'bar'},
      ];
      const action = {
        type: UPLOAD_DELETE,
        key: 'baz',
      };
      const state = items(data, action);

      expect(state).toEqual(expected);
    });
  });

  describe('isFetching', () => {
    it('returns true for UPLOAD_REQUEST', () => {
      const state = isFetching(null, {type: UPLOAD_REQUEST});
      expect(state).toBe(true);
    });

    it('returns true for !UPLOAD_REQUEST', () => {
      expect(isFetching(null, {type: UPLOAD_FAILURE})).toBe(false);
      expect(isFetching(null, {type: UPLOAD_SUCCESS})).toBe(false);
      expect(isFetching(null, {type: UPLOAD_LIST})).toBe(false);
      expect(isFetching(null, {type: 'foo'})).toBe(false);
    });
  });

  describe('isError', () => {
    it('returns true for UPLOAD_FAILURE', () => {
      const state = isError(null, {type: UPLOAD_FAILURE});
      expect(state).toBe(true);
    });

    it('returns true for !UPLOAD_FAILURE', () => {
      expect(isError(null, {type: UPLOAD_REQUEST})).toBe(false);
      expect(isError(null, {type: UPLOAD_SUCCESS})).toBe(false);
      expect(isError(null, {type: UPLOAD_LIST})).toBe(false);
      expect(isError(null, {type: 'foo'})).toBe(false);
    });

  });
});
