import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGallery } from '../redux/selectors';
import { createAlbumRequest } from '../redux/gallery.actions';
import Album from '../component/Album';

export class AlbumPage extends Component {
    static propTypes = {
        data: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.bool,
    }
    constructor(){
        super();
        this.refreshAlbum = this.refreshAlbum.bind(this);
    }
    componentDidMount() {
        if (!this.props.data && !this.props.loading) {
            this.refreshAlbum();
        }
    }
    refreshAlbum(){
        this.props.fetchAlbum(this.props.match.params.id);
    }
    render() {
        const { data = {}, loading, error } = this.props;
        if (data.id && !data.images) {
            const images = [{
                link: data.link,
                title: data.title,
                id: data.id,
                description: data.description,
                type: data.type
            }]
            return (
                <Album {...data} images={images} refreshAlbum={this.refreshAlbum} loading={loading} error={error}/>
            )
        }
        return (
            <Album {...data} refreshAlbum={this.refreshAlbum} loading={loading} error={error}/>
        )
    }
}

const mapStateToProps = (state, { match }) => ({
    data: getGallery(match.params.id)(state),
    loading: state.loading,
    error: state.error
})

const mapDispatchToProps = (dispatch) => {
    const getAlbum = createAlbumRequest(dispatch);
    return {
        fetchAlbum: (id) => dispatch(getAlbum(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage)
