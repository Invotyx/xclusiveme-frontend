import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getAll() {
  return apiClient.get(`${SERVER_ADDRESS}/posts/`);
}

export async function getAllSubscribed() {
  return apiClient.get(`${SERVER_ADDRESS}/posts/subscribed`);
}

export async function getX(username) {
  return apiClient.get(`${SERVER_ADDRESS}/users/posts/${username}`);
}

export async function add(saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/posts`, data);
}

export async function addComment(id, commentData) {
  const data = JSON.stringify(commentData);
  return apiClient.post(`${SERVER_ADDRESS}/posts/comments/${id}`, data);
}

export async function update(id, data) {
  return apiClient.put(`${SERVER_ADDRESS}/posts/${id}`, data);
}

export async function destory(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/posts/${id}/remove`);
}

export async function uploadImage(fileObject) {
  const data = new FormData();
  data.append('images', fileObject);
  return apiClient.post(`${SERVER_ADDRESS}/posts/images`, data);
}

export async function uploadVideoReq1(fileObject) {
  const data = { totalVideos: fileObject };
  return apiClient.post(`${SERVER_ADDRESS}/posts/videos`, data);
}

export async function uploadVideoFinalReq(fileObject, url) {
  const data = new FormData();
  data.append('video', fileObject);
  return apiClient.post(`${url}`, data);
}
