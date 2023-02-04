const host = process.env.REACT_APP_HOST;
const postRoute = `${host}/api/posts`;
const userRoute = `${host}/api/users`;
const authRoute = `${host}/api/auth`;
const messageRoute = `${host}/api/messages`;
const uploadRoute = `${host}/api/upload`;
const imageRoute = `${host}/images`;
const socketRoute = process.env.REACT_APP_SOCKET_ROUTE;

export {
  host,
  postRoute,
  imageRoute,
  userRoute,
  authRoute,
  messageRoute,
  uploadRoute,
  socketRoute,
};
