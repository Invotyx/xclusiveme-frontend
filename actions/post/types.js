import { createActionTypes } from '../../utils';

export const POST = createActionTypes('POST', [
  'GET',
  'GET_ONE',
  'GET_SUBSCRIBED',
  'GET_X',
  'SAVE',
  'UPDATE',
  'DELETE',
  'SUCCESS',
  'FAILURE',
  'UPLOAD_IMAGE',
  'UPLOAD_VIDEO_REQ',
  'UPLOAD_VIDEO_FINAL_REQ',
  'ADD_COMMENT',
  'GET_COMMENTS',
  'GET_LIKES',
  'ADD_LIKE',
  'COMMENT_LIKE',
  'DEL_COMMENT_LIKE',
  'DELETE_LIKES',
  'GET_REPLIES',
  'GET_NOTIFICATIONS',
  'GET_SETTING_NOTIFICATIONS',
  'ADD_SETTING_NOTIFICATIONS',
  'VIEW_NOTIFICATION',
]);

export default POST;
