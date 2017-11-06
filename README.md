# react-prefetch-image

 This library is simillar to libs which helping you lazy load your images. The difference is, it aims to provide a prefetch mecahnism, make the image loading flow smoother when having lots of images but only serval of them will display at a time (like slides or album display component). Leave the rest design flexibility to you.

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
    <div id="wrapper">
      {prefetch}
      <img src={src} className={isActive? 'active' : 'normal'} />
    </div>
  )}
</ImageManager>

```

## Props

### prefetchNext

How many following images the lib will prefetch for you. If so, it will return a prefetch component to you. (Notice that we didn't use xhr prefetch at this time, instead we returning a prefetch link)

### activeIndex

Current index in the items array. you should iterate this value in most cases.

### activeRange

The range beside current index will count as active. If a index is active, the lib will inject a isActive flag to your render function.

### items

The image urls it will manage.
