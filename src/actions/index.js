import Api from '../services/Api';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_DELETE = 'UPLOAD_DELETE';
export const UPLOAD_LIST = 'UPLOAD_LIST';
export const UPLOAD_RESET = 'UPLOAD_RESET';

const uploadApi = new Api();

export const allFiles = (api = uploadApi) => dispatch => {
  dispatch({ type: UPLOAD_REQUEST });
  return api
    .fetchAll()
    .then(data => dispatch({ type: UPLOAD_LIST, data }))
    .catch(() => dispatch({ type: UPLOAD_FAILURE }));
};

export const resetUpload = () => dispatch => dispatch({ type: UPLOAD_RESET })

export const removeFile = (file, api = uploadApi) => dispatch => {
  return api
    .remove(file)
    .then(() => dispatch({ type: UPLOAD_DELETE, key: file.key }))
    .catch(() => dispatch({ type: UPLOAD_FAILURE }));
};

export const uploadFile = (file, api = uploadApi) => dispatch => {
  dispatch({ type: UPLOAD_REQUEST });
  return api
    .upload(file)
    .then(data => {
      if(!data.success) return dispatch({ type: UPLOAD_FAILURE });
      dispatch({ type: UPLOAD_SUCCESS, data});
    })
    .catch(() => dispatch({ type: UPLOAD_FAILURE }));
};
