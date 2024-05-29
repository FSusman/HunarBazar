import axios from "axios";

const loginUrl = "http://localhost:3001/api/login";
const userUrl = "http://localhost:3001/api/users";

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response;
};

const register = async (user) => {
  const response = await axios.post(userUrl, user);
  return response.data.user;
};

const enrollCourse = async (courseId) => {
  const response = await axios.get(userUrl);
  const users = response.data;
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const user = users.find((user) => user.username === userLocal.username);
  console.log(user);
  await axios.post(`${userUrl}/enroll/${courseId}`, {
    userId: user.id,
  });
};

const enterExtras = async (userId, extras) => {
  const response = await axios.post(`${userUrl}/${userId}`, {extras});
  return response;
};

const getAll = async () => {
  const response = await axios.get(userUrl);
  return response.data;
};

export default { login, register, enrollCourse, enterExtras, getAll };
