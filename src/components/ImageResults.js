import React from 'react';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
} from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

const ImageResults = ({ images }) => {
  let imageListContent;

  if (images) {
    imageListContent = (
      <GridList cols={3}>
        {images.map((img) => (
          <GridListTile key={img.id}>
            <img src={img.largeImageURL} />
            <GridListTileBar
              title={img.tags}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton>
                  <ZoomInIcon color="white" />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    );
  } else {
    imageListContent = null;
  }

  return <div>{imageListContent}</div>;
};

export default ImageResults;
