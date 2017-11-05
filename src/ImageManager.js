
import React, { Component } from 'react';
import _ from 'lodash';

const EMPTY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'

export default class ImageManager extends Component {
  props: {
    children: () => object,
    items: Array<string>,
    prefetchNext: number,
    activeIndex: Array<number>,
    activeRange: Array<number>
  }
  state: {
    meta: object
  }
  constructor(props) {
    super(props);
    this.cached = [];
    this.state = {
      meta: this.getNewMeta(props)
    }
  }
  getNewMeta = (props) => {
    const { items, prefetchNext, activeIndex, activeRange } = props;
    // get boundary
    const boundLeft = activeIndex + activeRange[0];
    const boundRight = activeIndex + activeRange[1];
    // set cached
    items
    .forEach((v, i) => {
      if(_.inRange(i, boundLeft, boundRight + 1))
        this.cached[i] = true
    });
    // return result
    return items.map((src, i) => {
      // const isActive = i === activeIndex;
      const isActive = _.inRange(i, boundLeft, boundRight + 1);
      const isPrefetch = !isActive && _.inRange(i, boundLeft, boundRight + prefetchNext + 1);
      const isCached = this.cached[i];
      return {
        prefetch: (isPrefetch && !isCached) ? <link rel="prefetch" href={src} /> : null,
        src: (isCached || isActive) ? src : EMPTY,
        isActive
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    const { items } = this.props;

    // Handle Items Change
    if(items !== nextProps.items) {
      // clear cached array
      this.cached = [];
    }

    // Run Everytime
    const meta = this.getNewMeta(nextProps);
    this.setState({ meta });
  }
  render() {
    const renderedChildren = this.props.children(this.state.meta);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
