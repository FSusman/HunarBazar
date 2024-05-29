import axios from "axios";

const baseUrl = "https://hunar-bak.netlify.app/.netlify/functions/app/api/courses";

const getCourses = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};


export default { getCourses };
