import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Post from './post';
import ProfileImageAvatar from './profile-image-avatar';
import ProfileImage from './change-profile-image';
import CoverImage from './change-cover-image';
import UpdateCoverImage2 from './update-cover-image-2';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../layouts/layout-auth';
import UpdateProfile from './update-profile';
import Images from './images';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CreateIcon from '@material-ui/icons/Create';
import { AppBar, Toolbar } from '@material-ui/core';
import { subscription } from '../../actions/subscription';
import { Add } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { currencySymbol } from '../../services/currencySymbol';
import Videos from './videos';
import NormalCaseButton from '../NormalCaseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
  header: {
    zIndex: 2,
  },
  header2: {
    zIndex: 2,
  },
  userAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: '-80px',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile({
  user,
  profileData,
  feed,
  numberOfPosts,
  subscriptionPlans,
  afterFollow,
  me,
  followers,
  followings,
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState(user);
  const [userFeed, setUserFeed] = React.useState(feed);
  const [_numberOfPosts, set_numberOfPosts] = React.useState(numberOfPosts);
  const [imagesData, set_imagesData] = React.useState(null);
  const [videosData, set_videosData] = React.useState(null);
  const classes = useStyles();

  useEffect(() => {
    set_numberOfPosts(numberOfPosts);
  }, [numberOfPosts]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    setUserFeed(feed);
    if (feed) {
      set_imagesData(
        feed.map((f) =>
          f.media && f.media.length > 0
            ? f.media[0].type.indexOf('image/') !== -1
              ? f.media[0]
              : null
            : null
        )
      );
      set_videosData(
        feed.map((f) =>
          f.media && f.media.length > 0
            ? f.media[0].type.indexOf('video/') !== -1
              ? f.media[0]
              : null
            : null
        )
      );
    }
  }, [feed]);

  const handleFollow = (event) => {
    event.preventDefault();
    user.subscriptionPlans &&
      dispatch(subscription.add(user.subscriptionPlans?.id, afterFollow));
  };

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout
        hideMainAppBar={
          <AppBar position='relative' color='transparent' elevation={0}>
            <Box clone mt={2}>
              <Toolbar>
                <IconButton>
                  <ArrowBackIosIcon fontSize='small' />
                </IconButton>
                <Box flex={1}>
                  <Typography>
                    {profileData?.fullName || '(no name)'}
                  </Typography>
                </Box>
                <IconButton>
                  <CreateIcon fontSize='small' />
                </IconButton>
                <IconButton>
                  <MoreVertIcon fontSize='small' />
                </IconButton>
              </Toolbar>
            </Box>
          </AppBar>
        }
      >
        <Head>
          <title>xclusiveme</title>
        </Head>
        <Container maxWidth='md' disableGutters>
          <>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <Card>
                  <CoverImage profileData={profileData}>
                    <CardHeader
                      className={classes.header}
                      action={
                        <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                          {me && (
                            <>
                              <UpdateProfile />
                              <UpdateCoverImage2 />
                            </>
                          )}
                        </Box>
                      }
                    />
                  </CoverImage>
                  <CardHeader
                    className={classes.header2}
                    avatar={
                      <ProfileImage>
                        <ProfileImageAvatar
                          className={classes.userAvatar}
                          src={profileData?.profileImage}
                          alt={profileData?.fullName}
                        />
                      </ProfileImage>
                    }
                    action={
                      <Box display='flex'>
                        <Box mx={4}>
                          <NextLink passHref href='#'>
                            <ListItem component='a'>
                              <Box clone textAlign='center'>
                                <ListItemText
                                  primary={_numberOfPosts}
                                  secondary='Posts'
                                />
                              </Box>
                            </ListItem>
                          </NextLink>
                        </Box>
                        <Box mx={4}>
                          <NextLink passHref href='#'>
                            <ListItem component='a'>
                              <Box clone textAlign='center'>
                                <ListItemText
                                  primary={followers?.totalCount}
                                  secondary='Followers'
                                />
                              </Box>
                            </ListItem>
                          </NextLink>
                        </Box>
                        <Box mx={4}>
                          <NextLink passHref href='#'>
                            <ListItem component='a'>
                              <Box clone textAlign='center'>
                                <ListItemText
                                  primary={followings?.totalCount}
                                  secondary='Following'
                                />
                              </Box>
                            </ListItem>
                          </NextLink>
                        </Box>
                      </Box>
                    }
                    title={
                      <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                        <Typography variant='h6'>
                          {profileData?.fullName || '(no name)'}
                        </Typography>
                      </Box>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {profileData?.profile?.description || '(no bio)'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <List disablePadding>
                  <ListSubheader disableGutters>
                    <Paper>
                      <Tabs
                        value={tab}
                        onChange={(e, v) => setTab(v)}
                        variant='fullWidth'
                        indicatorColor='primary'
                        textColor='primary'
                      >
                        <Tab icon={<FeaturedPlayListOutlinedIcon />} />
                        <Tab icon={<ImageOutlinedIcon />} />
                        <Tab icon={<VideocamOutlinedIcon />} />
                        <Tab icon={<MonetizationOnOutlinedIcon />} />
                      </Tabs>
                    </Paper>
                  </ListSubheader>
                  <ListItem>
                    <ListItemText>
                      <TabPanel value={tab} index={0}>
                        <Box
                          ml={{ xs: 2, sm: 2, md: 8 }}
                          mr={{ xs: 2, sm: 2, md: 8 }}
                        >
                          {subscriptionPlans && (
                            <Box
                              bgcolor='#111'
                              display='flex'
                              p={2}
                              alignItems='center'
                            >
                              <Box flexGrow={1}>
                                <Typography>
                                  Follow to get posts in your News Feed.
                                </Typography>
                              </Box>

                              {subscriptionPlans.price > 0 ? (
                                <NormalCaseButton
                                  startIcon={`${currencySymbol}${subscriptionPlans.price}`}
                                  size='small'
                                  variant='outlined'
                                  onClick={(e) =>
                                    confirm(
                                      'Are you sure you want to subscribe?'
                                    ) && handleFollow(e)
                                  }
                                >
                                  <span>Subscribe</span>
                                </NormalCaseButton>
                              ) : (
                                <NormalCaseButton
                                  startIcon={<Add />}
                                  size='small'
                                  variant='outlined'
                                  onClick={(e) => handleFollow(e)}
                                >
                                  <span>Follow</span>
                                </NormalCaseButton>
                              )}
                            </Box>
                          )}
                          <CardHeader
                            action={
                              <>
                                <IconButton aria-label='sort'>
                                  <SearchIcon />
                                </IconButton>
                                <IconButton aria-label='sort'>
                                  <SortIcon />
                                </IconButton>
                              </>
                            }
                            title={`${_numberOfPosts || 0} posts`}
                          />
                          {userFeed && userFeed.length > 0 ? (
                            <Grid container spacing={2}>
                              {userFeed.map((f, ix) => (
                                <Grid item xs={12} key={ix}>
                                  <Post
                                    post={f}
                                    profileData={profileData}
                                    altHeader={false}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Box
                              textAlign='center'
                              p={4}
                              bgcolor='#222'
                              border='1px solid #111'
                            >
                              <Typography color='textSecondary'>
                                nothing to display
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TabPanel>
                      <TabPanel value={tab} index={1}>
                        <Images imagesData={imagesData} />
                      </TabPanel>
                      <TabPanel value={tab} index={2}>
                        <Videos videosData={videosData} />
                      </TabPanel>
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </>
        </Container>
      </Layout>
    </motion.div>
  );
}
