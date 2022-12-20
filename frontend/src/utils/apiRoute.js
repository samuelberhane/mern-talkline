const host = "http://localhost:8000";
const postRoute = `${host}/api/posts`;
const userRoute = `${host}/api/users`;
const authRoute = `${host}/api/auth`;
const messageRoute = `${host}/api/messages`;
const uploadRoute = `${host}/api/upload`;
const imageRoute = `${host}/images`;
const socketRoute = "http://localhost:3001";

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
