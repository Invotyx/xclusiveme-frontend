import { OutlinedInput } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../actions/chat';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import UploadImageModal from './/uploadImageModal';
import useMediaRecorder from '@wmik/use-media-recorder';
import { snackbar } from '../../actions/snackbar';
import AudioSend from './audioSend';

export default function MessageSend({ conId }) {
  let { status, mediaBlob, stopRecording, startRecording } = useMediaRecorder({
    recordScreen: false,
    mediaStreamConstraints: { audio: true, video: false },
  });
  const [seconds, setSeconds] = useState(0);
  const countRef = useRef(null);
  const current = useSelector(currentUserSelector);
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [imageModal, setImageModal] = useState(false);
  const [addVoice, setAddVoice] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const dispatch = useDispatch();

  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);

    dispatch(
      chat.sendOneMessage({
        conversationId: Number(conId),
        saveData: {
          // receiver: current.id,
          content: msgText,
          // sentTo: chatsData
          //   .filter(list => list.id == conId)[0]
          //   ?.participants.filter(p => p.id !== current.id)[0].id,
          type: 'text',
          isPaid: false,
        },
        callback: () => {
          setMsgText('');
        },
      })
    );
  }

  useEffect(() => {
    if (status === 'recording') {
      timer();
    } else if (status === 'stopped') {
      clearInterval(countRef.current);
      setSeconds(0);
    } else if (status === 'failed') {
      dispatch(
        snackbar.update({
          open: true,
          message: `MicroPhone Permission Denied `,
          severity: 'error',
        })
      );
      setProgress(0);
      setAddVoice(false);
    }
  }, [status]);

  const handleImageModal = () => {
    if (!msgText || msgText.trim() === '') {
      return;
    }
    setImageModal(true);
  };

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMsgText(msgText + emoji);
  };

  const showEmoji = () => {
    setShow(!show);
  };
  const progressHandler = () => {
    progressRef.current = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        return oldProgress + 0.3;
      });
    }, 300);
  };

  const startRecordingHandler = () => {
    setAddVoice(true);
    progressHandler();
    startRecording();
  };

  const timer = () => {
    countRef.current = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  };

  return (
    <>
      <CardActions
        style={{
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '30%',
            opacity: addVoice ? 0 : 1,
          }}
        >
          <img src='/camera.svg' alt='camera' />
          <img src='/imageBtn.svg' alt='image' onClick={handleImageModal} />
          <img src='/videoBtn.svg' alt='video' />
          <img
            src='/voiceBtn.svg'
            alt='voice'
            onClick={startRecordingHandler}
          />
          <UploadImageModal
            imageModal={imageModal}
            setImageModal={setImageModal}
            msgText={msgText}
            setMsgText={setMsgText}
            conId={conId}
          />
        </div>
      </CardActions>

      <CardActions style={{ padding: 0 }}>
        {!addVoice ? (
          <OutlinedInput
            value={msgText}
            onChange={e => setMsgText(e.target.value)}
            name='msgText'
            margin='dense'
            fullWidth
            multiline
            // disabled={post.media.length === 0}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                if (!event.shiftKey) {
                  handleOnEnter(e);
                }
              }
            }}
            // inputRef={searchInput}
            placeholder='Write a message'
            startAdornment={
              <ProfileImageAvatar
                user={current}
                style={{ marginRight: '10px' }}
              />
            }
            endAdornment={
              <>
                <IconButton onClick={showEmoji}>
                  <InsertEmoticonIcon />
                </IconButton>
                <IconButton onClick={handleOnEnter}>
                  <img
                    src='/send.png'
                    alt='send button'
                    style={{ marginRight: '10px' }}
                  />
                </IconButton>
              </>
            }
          />
        ) : (
          <AudioSend
            stopRecording={stopRecording}
            mediaBlob={mediaBlob}
            progress={progress}
            progressRef={progressRef.current}
            seconds={seconds}
            setProgress={setProgress}
            setAddVoice={setAddVoice}
          />
        )}
      </CardActions>

      {show && (
        <span>
          <Picker
            onSelect={addEmoji}
            set='facebook'
            emoji='point_up'
            theme='dark'
            skin='1'
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '150px',
              maxWidth: '300px',
              with: '100%',
              outline: 'none',
            }}
          />
        </span>
      )}
    </>
  );
}
