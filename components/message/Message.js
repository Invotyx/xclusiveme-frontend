import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../image-avatar';
import { useMediaQuery } from 'react-responsive';
import NextLink from 'next/link';
import {
  chatDataSelector,
  chatCountSelector,
} from '../../selectors/chatSelector';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import moment from 'moment';
import { chat as chatdata } from '../../actions/chat';
import queryString from 'query-string';
import { MenuItem } from '@material-ui/core';
import styles from './message.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
  },
}));

export default function Message({ subheaderPrefix }) {
  const SubheaderPrefix = () => subheaderPrefix || <></>;
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const chatData = useSelector(chatDataSelector);
  const myData = useSelector(currentUserSelector);
  const chatsCount = useSelector(chatCountSelector);
  const dispatch = useDispatch();
  const pageNum = 1;
  const limit = 50;

  const Link = ({ passQueryString, href, children, ...otherProps }) => (
    <NextLink
      href={`${href}?${queryString.stringify(passQueryString)}`}
      {...otherProps}
    >
      {children}
    </NextLink>
  );

  const handlegetone = conId => {
    dispatch(
      chatdata.getOneConversation({
        id: conId,
        pageNum: pageNum,
        limit: limit,
      })
    );
  };

  return (
    <>
      {chatsCount === 0 ? (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      ) : (
        <List>
          <ListSubheader disableGutters>
            <>
              <SubheaderPrefix />
              <Typography>All messages</Typography>
            </>
          </ListSubheader>
          {chatData?.map((i, x) => (
            <Link
              key={Math.random()}
              passHref
              href={isMobile ? '/mChat' : '/chat'}
              passQueryString={{
                conId: `${i?.id}`,
              }}
            >
              <ListItem onClick={() => handlegetone(i.id)} disableGutters>
                <ListItemAvatar>
                  <ImageAvatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    i.participants.filter(p => p?.id !== myData?.id)[0].fullName
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        style={{ color: '#757575' }}
                      >
                        {i.lastMessage.content.slice(0, 15)}...
                      </Typography>
                    </React.Fragment>
                  }
                />

                <ListItemSecondaryAction>
                  <Typography component='span' variant='caption'>
                    {moment(i.createdAt).fromNow()}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </>
  );
}
