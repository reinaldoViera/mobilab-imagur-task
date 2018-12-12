import {
    createSelector
} from 'reselect'

const getGalleriesEls = state => state.galleries
const getGalleriesId = state => state.list

export const getGalleries = createSelector([
    getGalleriesEls,
    getGalleriesId
], (galleriesEls = {}, galleriesId = []) => galleriesId.map(gId => galleriesEls[gId]))

export const getGallery = (id) => createSelector([
    getGalleriesEls
], (galleriesEls = {}) => {
    return galleriesEls[id];
})
