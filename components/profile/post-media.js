import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import PostMediaVideo from './post-media-video';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
function MediaElement({ m }) {
  const classes = useStyles();
  return m.type && m.type.indexOf('video') !== -1 ? (
    <PostMediaVideo src={m.url} />
  ) : (
    <CardMedia className={classes.media} image={m.url} title='post media' />
  );
}
export default function PostMedia({ media }) {
  return (
    <>
      {(!media || media.length === 0) && (
        <MediaElement m={{ url: '/no-media.jpg' }} />
      )}
      {media && media.length > 0 && media.map((m, i) => <MediaElement m={m} />)}
    </>
  );
}
