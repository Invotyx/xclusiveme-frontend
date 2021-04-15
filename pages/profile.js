import React from 'react';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import LogoAuth from '../components/logo-auth';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '150px',
  },
  header: {
    zIndex: 2,
  },
  header2: {
    zIndex: 2,
  },
  media: {
    zIndex: 1,
    height: 0,
    paddingTop: '33%',
    marginTop: '-72px',
    position: 'relative',
    '&::after': {
      content: '" "',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
  },
  userAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: '-80px',
  },
}));

export default function Home() {
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Head>
        <title>xclusiveme</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <LogoAuth />
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.header}
              action={
                <>
                  <IconButton aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                </>
              }
            />
            <CardMedia
              className={classes.media}
              image='/cover.jpg'
              title='Paella dish'
            />
            <CardHeader
              className={classes.header2}
              avatar={
                <Avatar
                  className={classes.userAvatar}
                  alt='Remy Sharp'
                  src='https://material-ui.com/static/images/avatar/1.jpg'
                />
              }
              action={
                <Box display='flex' textAlign='center'>
                  <Box mx={4}>
                    <ListItemText primary='1.2k' secondary='Posts' />
                  </Box>
                  <Box mx={4}>
                    <ListItemText primary='1.2M' secondary='Followers' />
                  </Box>
                  <Box mx={4}>
                    <ListItemText primary='499' secondary='Following' />
                  </Box>
                </Box>
              }
              title={<Typography variant='h6'>Ariana Green</Typography>}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                Ariana Green 💄 Make up Artist
                <br />
                WEAR YOUR WONDERFUL
                <br />
                📸 Get featured using #GREENgals or tag @AGreen
                <br />
                🆕 @AGreen_OFFICIAL
                <br />
                ❤️ @arianagreen
                <br />
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box flexGrow={1}>
                <Tabs
                  value={tab}
                  onChange={(v) => setTab(v)}
                  variant='fullWidth'
                  indicatorColor='primary'
                  textColor='primary'
                >
                  <Tab icon={<FeaturedPlayListOutlinedIcon />} />
                  <Tab icon={<ImageOutlinedIcon />} />
                  <Tab icon={<VideocamOutlinedIcon />} />
                  <Tab icon={<MonetizationOnOutlinedIcon />} />
                </Tabs>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
