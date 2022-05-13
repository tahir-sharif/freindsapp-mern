// const url = "http://localhost:5000/api";
const url = "https://friendsapp-mern.herokuapp.com/api";
// const url = "http://192.168.2.137:5000/api";

export const api = {
  // Authentication
  register: () => ({
    url: `${url}/users/register`,
    method: "post",
  }),

  login: () => ({
    url: `${url}/users/login`,
    method: "post",
  }),
  logout: () => ({
    url: `${url}/users/logout`,
    method: "post",
  }),
  getuser: () => ({
    url: `${url}/users/getuser`,
    method: "get",
  }),
  updateUser: () => ({
    url: `${url}/users/update`,
    method: "put",
  }),
  getUserById: (id) => ({
    url: `${url}/users/getuser/${id}`,
    method: "get",
  }),
  uploadPost: () => ({
    url: `${url}/post`,
    method: "post",
  }),
  getAllposts: () => ({
    url: `${url}/post`,
    method: "get",
  }),
  getPostsById: (id) => ({
    url: `${url}/post/${id}`,
    method: "get",
  }),
};
export const apiUrl = url;
