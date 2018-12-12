import reducer, {
    constants
} from '../gallery';


describe('Gallery reducer', () => {
    it('should give initial state', () => {
        let state = reducer(undefined, {
            type: "FAKE"
        });
        expect(state).toMatchSnapshot();
    });
    it('should add galleries to existing', () => {
        let state = reducer({
            galleries: {
                "khbckdjw": {
                    fake: 'data'
                },
                "jehfindcs": {
                    more: 'fake'
                }
            },
            list: ["jehfindcs", "khbckdjw"],
            nextPage: 1
        }, {
            type: constants.ADD_GALLERIES,
            payload: {
                galleries: {
                    "viwuywi": {
                        new_fake: 'data'
                    },
                    "gefgegr": {
                        new_more: 'fake'
                    }
                },
                list: ["jehfindcs", "khbckdjw"]
            }
        });
        expect(state).toMatchSnapshot();
    });
    it('should replace galleries to existing', () => {
        let state = reducer({
            galleries: {
                "khbckdjw": {
                    fake: 'data'
                },
                "jehfindcs": {
                    more: 'fake'
                }
            },
            list: ["jehfindcs", "khbckdjw"],
            nextPage: 1
        }, {
            type: constants.ADD_GALLERIES,
            payload: {
                galleries: {
                    "viwuywi": {
                        new_fake: 'data'
                    },
                    "gefgegr": {
                        new_more: 'fake'
                    }
                },
                list: ["jehfindcs", "khbckdjw"],
                replace: true
            }
        });
        expect(state).toMatchSnapshot();
    });

    it('should avoid "rising" sort if is not section "user"', () => {
        let state = reducer({
            section: 'user',
            viral: false,
            window: 'day',
            sort: 'rising',
            loading: false,
            error: false,
            nextPage: 0,
            list: [],
            galleries: {}
          }, {
            type: constants.CHANGE_SECTION,
            payload: {
                section: 'top',
                sort: 'rising'
            }
        });
        expect(state).toMatchSnapshot();
    });

})