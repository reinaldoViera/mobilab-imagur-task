import {
    constants
} from './gallery';
import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'api/imgur/', // change with http://localhost:9007/api/imgur/ for development
    timeout: 10000
});

/**
 * Actions
 */

export const addGalleries = (galleries, replace = false) => ({
    type: constants.ADD_GALLERIES,
    payload: galleries.reduce((gall, curr) => {
        return {
            galleries: { ...gall.galleries,
                [curr.id]: curr
            },
            list: [...gall.list, curr.id],
            replace
        }
    }, {
        galleries: {},
        list: []
    })
})

export const addContent = (content) => ({
  type: constants.ADD_GALLERIES,
  payload: {
    galleries: {
        [content.id]: content
    },
    list: []
  }
})


const setLoading = (loading = false) => () => ({
    type: constants.FETCHING,
    payload: {
        loading
    }
})

export const fetchStarted = setLoading(true);
export const fetchEnd = setLoading(false);

export const fetchError = (error = true) => ({
    type: constants.FETCH_ERROR,
    payload: {
        error
    }
});

const _request = (endpoint, success, error, params = {}, onFetchStart = ()=>{}, onFetchEnd=()=>{}) => {
    onFetchStart();    
    customAxios.get(endpoint, { params }).then(
        (response) => {
            onFetchEnd();
            success(response);
        }
    ).catch((err) => error(err))
}

export const getGalleries = (success, error, onFetchStart, onFetchEnd, section = 'hot', sort = 'viral', page = 0, window = 'day', showViral = false) => () => {
    _request(`gallery/${section}/${sort}/${window}/${page}`, success, error, { showViral }, onFetchStart, onFetchEnd);
};

export const getAlbum = (id, success, error, onFetchStart, onFetchEnd) => () => {
    _request(`gallery/album/${id}`, success, error, {}, onFetchStart, onFetchEnd);
}

export const createAlbumRequest = (dispatch) => (id) => {
    const onSuccess = ({data}) => {
        dispatch(addContent(data.data));
    }
    const onError = ()=>{
        dispatch(fetchError())
    }
    const onFetchStart = () => {
        dispatch(fetchStarted())
    }
    const onFetchEnd = () => {
        dispatch(fetchEnd())
    }
    return getAlbum(id, onSuccess, onError, onFetchStart, onFetchEnd);
} 

export const createGalleryRequest = (dispatch) => (replace, section, sort, page, window, showViral) => {
    const onSuccess = ({data}) => {
        dispatch(addGalleries(data.data, replace));
    }
    const onError = ()=>{
        dispatch(fetchError())
    }
    const onFetchStart = () => {
        dispatch(fetchStarted())
    }
    const onFetchEnd = () => {
        dispatch(fetchEnd())
    }
    return getGalleries(onSuccess, onError, onFetchStart, onFetchEnd, section, sort, page, window, showViral);
}

export const switchViral = () => ({
  type: constants.SWITCH_VIRAL
})

export const changeSection = (section) => ({
  type: constants.CHANGE_SECTION,
  payload: {
      section
  }
})
export const changeSort = (sort) => ({
  type: constants.CHANGE_SORT,
  payload: {
    sort
  }
})
export const changeWindow = (window) => ({
  type: constants.CHANGE_WINDOW,
  payload: {
    window
  }
})

