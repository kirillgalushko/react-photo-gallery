import React from 'react';
import Gallery from 'react-photo-gallery';

const ExampleBasic = ({photos, columns, title, direction}) => {
    return (
      <div>
        <h2>{title}</h2>
        <Gallery photos={photos} columns={columns} direction={direction} oririnalFiles={{ files: [] }} />
      </div>
    );
}

export default ExampleBasic;
