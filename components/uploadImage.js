import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../actions/post';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#666',
  },
}));

export default function FormDialog({ children, imageHandler }) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);
  const [img, setImg] = React.useState(null);
  const classes = useStyles();

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch(
      post.uploadImage({
        fileObject: image,
        callback: (source_url) => {
          if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setImg(e.target.result);
              imageHandler(e.target.result, image, source_url);
            };
            reader.readAsDataURL(event.target.files[0]);
          }
        },
      })
    );
  };

  return (
    <>
      <input
        accept='image/*'
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />

      <IconButton
        size='small'
        onClick={() => {
          inputFile.current.click();
        }}
      >
        <WallpaperOutlinedIcon className={classes.icon} />
      </IconButton>
    </>
  );
}
