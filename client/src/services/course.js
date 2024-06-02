import axios from "axios";

const baseUrl = "https://hunarbazar.onrender.com/api/courses";

const getCourses = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};


export default { getCourses };
