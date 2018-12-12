import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGalleries } from '../redux/selectors'
import Gallery from '../component/Gallery'
import { createGalleryRequest, changeSection, changeWindow, changeSort, switchViral } from '../redux/gallery.actions';
import ListModify from '../component/ListModify';
import { LinearProgress } from '@material-ui/core';


export class Home extends Component {
    static propTypes = {
        galleries: PropTypes.array,
        loading: PropTypes.bool
    }
    constructor() {
        super();
        this.loadMore = this.loadMore.bind(this);
        this.goToAlbum = this.goToAlbum.bind(this);
        this.changeModifyer = this.changeModifyer.bind(this);
    }
    componentDidMount() {
        const { galleries, loading, fetchGalleries } = this.props;
        if (!loading && !galleries.length) {
            fetchGalleries();
        }
    }
    loadMore(page) {
        const { loading, fetchGalleries, section, sort, window, viral } = this.props;
        if (!loading) {
            fetchGalleries(page, section, sort, window, viral);
        }
    }
    changeModifyer(key, value) {
        const { section, viral, window, sort } = this.props;
        switch (key) {
            case 'sort':
                this.props.changeSort(value);
                this.props.fetchGalleries(0, section, value, window, viral, true);
                break;
            case 'window':
                this.props.changeWindow(value);
                this.props.fetchGalleries(0, section, sort, value, viral, true);
                break;
            case 'section':
                this.props.changeSection(value);
                this.props.fetchGalleries(0, value, sort, window, viral, true);
                break;
            case 'viral':
                this.props.switchViral();
                this.props.fetchGalleries(0, section, sort, window, value, true);
                break;
            default:
                break;
        }
    }
    goToAlbum(id) {
        this.props.history.push(`/album/${id}`)
    }
    render() {
        const { galleries, nextPage, loading, error, section, viral, sort, window } = this.props;
        return (
            <div>
                {
                    loading && (<div style={{ flexGrow: 1 }}>
                        <LinearProgress />
                    </div>)
                }
                <ListModify section={section} viral={viral} sort={sort} window={window}
                    loading={loading}
                    changeModifyer={this.changeModifyer} />
                <Gallery galleries={galleries}
                    goToAlbum={this.goToAlbum}
                    nextPage={nextPage}
                    error={error}
                    loading={loading}
                    loadMore={this.loadMore} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    galleries: getGalleries(state),
    loading: state.loading,
    section: state.section,
    viral: state.viral,
    sort: state.sort,
    window: state.window,
    nextPage: state.nextPage,
    error: state.error
})

const mapDispatchToProps = dispatch => {
    const getGalleries = createGalleryRequest(dispatch);
    return {
        fetchGalleries: (page, section, sort, window, showViral, replace = false) => dispatch(getGalleries(replace, section, sort, page, window, showViral)),
        changeSection: (section) => dispatch(changeSection(section)),
        changeWindow: (window) => dispatch(changeWindow(window)),
        changeSort: (sort) => dispatch(changeSort(sort)),
        switchViral: () => dispatch(switchViral()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

