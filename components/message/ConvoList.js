import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../actions/chat';
import { singleChatSelector } from '../../selectors/chatSelector';
import styles from './message.module.css';

const useStyles = makeStyles(theme => ({
  mainBox: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: `calc(100vh - 435px)`,
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - 420px)`,
      minHeight: `130px`,
    },
  },
}));

const ConvoList = ({
  activeConversationId,
  current,
  refProp,
}) => {
  const singlechat = useSelector(singleChatSelector);
  const dispatch = useDispatch();
  const pageNum = 1;
  const limit = 50;

  React.useEffect(() => {
    dispatch(
      chat.getOneConversation({
        id: activeConversationId,
        pageNum: pageNum,
        limit: limit,
      })
    );
  }, [activeConversationId]);
  const classes = useStyles();
  return (
    <>
      <div className={classes.mainBox} ref={refProp}>
        {singlechat?.map((i, x) => (
          <div className={styles.container} key={`message${x}`}>
            <div className={styles.chatMessages}>
              {i.sender.id !== current?.id ? (
                <div className={styles.leftSide}>
                  <span className={styles.leftMessage}>{i.content}</span>
                  <div>{i.mediaLink && i.mediaLink}</div>
                </div>
              ) : (
                <div className={styles.rightSide}>
                  <span className={styles.rightMessage}>{i.content}</span>
                  {i.mediaLink && (
                    <div
                      style={{
                        marginTop: '10px',
                        border: '1px solid #222222',
                        borderRadius: '8px',
                      }}
                    >
                      <img
                        src={i.mediaLink}
                        alt=''
                        style={{
                          width: '200px',
                          height: '200px',
                          padding: '20px',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConvoList;
