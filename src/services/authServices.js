import http from "./httpServices";
import config from "./config.json";

export const postLogin = (values) => {
  console.log(values, "this is valuuuuuu");
  return http.post(`${config.local}/auth/login`, values, {
    timeout: 30000,
  });
};

export const getUserList = async () => {
  return await http.get(`${config.local}/api/v1/user/list`, {
    timeout: 30000,
  });
};

export const deleteUser = async (values) => {
  return await http.delete(`${config.local}api/v1/user/delete/${values}`, {
    timeout: 30000,
  });
};
