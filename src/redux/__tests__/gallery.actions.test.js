import {
    addGalleries
} from '../gallery.actions';
import {
    fakeGallery
} from '../utils';

describe('Gallery actions ', () => {
    it('should add galleries', () => {
        let action = addGalleries(fakeGallery);
        expect(action).toMatchSnapshot();
    });
});