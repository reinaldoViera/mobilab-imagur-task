import PropTypes from 'prop-types';
import React from 'react';
import createCellPositioner, { imageAdapter } from '../utils/createCellPositioner';
import { Masonry, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import GalleryCard from './GalleryCard';
import { withStyles } from '@material-ui/core';

const styles = {
  Cell: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '.5rem',
    padding: '0.5rem',
    backgroundColor: '#f7f7f7',
    wordBreak: 'break-all'
  }
};

class GridExample extends React.PureComponent {
  static propTypes = {
    galeries: PropTypes.array,
    onCardClick: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
    });

    this.state = {
      columnWidth: 200,
      gutterSize: 10,
      overscanByPixels: 0,
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }

  render() {
    const { overscanByPixels } = this.state;


    return (
      <div>
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      </div>
    );
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer({ index, key, parent, style }) {
    const { galleries, onCardClick, classes } = this.props;
    const { columnWidth } = this.state;

    const gallery = galleries[index];

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          className={classes.Cell}
          style={{
            ...style,
            width: columnWidth,
          }}>
          <GalleryCard onClick={onCardClick} {...imageAdapter(gallery)} id={gallery.id} />
        </div>
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  }

  _onResize({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}>
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { overscanByPixels } = this.state;
    const { galleries } = this.props;

    return (
      <Masonry
        autoHeight={true}
        cellCount={galleries.length}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={this._height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
      />
    );
  }

  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

export default withStyles(styles)(GridExample);
