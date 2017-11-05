import React, { Component } from 'react';
import ImageManager from '../ImageManager';
import './SlidePlayer.css';

const items = [
  'http://via.placeholder.com/301x100',
  'http://via.placeholder.com/302x100',
  'http://via.placeholder.com/303x100',
  'http://via.placeholder.com/304x100',
  'http://via.placeholder.com/305x100',
  'http://via.placeholder.com/306x100',
  'http://via.placeholder.com/307x100',
  'http://via.placeholder.com/308x100',
  'http://via.placeholder.com/309x100',
  'http://via.placeholder.com/310x100'
];

export default class SlidePlayer extends Component {
  constructor(){
    super();
    this.state = {
      page: 0
    };
  }
  prev = () => {
    const { page } = this.state;
    if(page > 0)
      this.setState({ page: page - 1});
    else
      this.setState({ page: items.length - 1 });
  }
  next = () => {
    const { page } = this.state;
    if(page < items.length - 1)
      this.setState({ page: page + 1});
    else
      this.setState({ page: 0 });
  }
  render() {
    const { page } = this.state;
    return (
      <div className="slide-player">
        <ImageManager prefetchNext={1}
          activeIndex={page}
          activeRange={[0, 0]}
          items={items}>
          {(meta) =>
            <div className="wrapper">
              {meta.map(({ src, prefetch, isActive }, i) => {
                return (
                  <div key={`slide-${i}`}>
                    {prefetch}
                    <img alt={`slide-${i}`}
                      className="item" src={src}
                      style={isActive ? { transform: 'translateX(0)' } : {}}
                      onClick={this.next}/>
                  </div>
                );
              })}
            </div>}
        </ImageManager>
        {/* TIMELINE */}
        <div className="timeline">
          <div className="done" style={{
            width: `${(page) * 100 / (items.length - 1)}%`
          }}/>
        </div>
        {/* TOOLBAR */}
        <div className="toolbar">
          <button label="<" onClick={this.prev}>
            <i className="fa fa-arrow-circle-left" aria-hidden="true" />
          </button>
          <div className="page">
            <p style={{ minWidth: 52 }}>{`${this.state.page + 1} / ${items.length}`}</p>
          </div>
          <button label=">" onClick={this.next}>
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}
