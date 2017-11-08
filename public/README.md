# react-prefetch-image

 This library is similar to libs which helping you lazy load your images. It aims to provide a flexible prefetch mechanism, make the image loading flow smoother when having lots of images but only serval of them should display at the same time (like slides or album display component).

## Illustrate

![Illustrate by timeline](/public/figure1.png)

> Result of prefetchNext=2, activeRange=[0, 0]

## Install

```sh
$ npm install --save react-prefetch-image
```

## Usage

```jsx
import { ImageManager } from 'react-prefetch-image';

// ...

<ImageManager prefetchNext={1}
  activeIndex={currnetIndex}
  activeRange={[-1, 1]}
  items={imgSrcArray}>
  {meta.map(({ src, prefetch, isActive }, i) =>
    <div id="img-wrapper" key={`img-${i}`}>
      {prefetch}
      <img src={src} className={isActive? 'active' : 'normal'} />
    </div>
  )}
</ImageManager>

```

## Props

### prefetchNext

How many following images the lib will prefetch for you. If so, it will return a prefetch component to you. (Notice that we didn't use xhr prefetch at this time, instead, we returning a prefetch link)

### activeIndex

Current index in the items array. you should iterate this value in most cases.

### activeRange

The range beside current index will count as active. If an index is active, the lib will inject an isActive flag to your render function.

### items

The image URLs it will manage.
