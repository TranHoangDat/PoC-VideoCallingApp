import { signUp } from "./api";

const signUpHandler = async (values: any) => {
  try {
    const response = await signUp(values);
    const data = response.data;
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export default signUpHandler;
