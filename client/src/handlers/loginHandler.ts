import { login } from "./api";

const loginHandler = async (values: any): Promise<any> => {
  try {
    const response = await login(values);
    const data = response.data;
    console.log(data);
    if (data.token && data.token.length > 0) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);

      return true;
    } else {
      return false;
    }
  } catch (e) {
    alert("Incorrect email or password!");
    return false;
  }
};

export default loginHandler;
