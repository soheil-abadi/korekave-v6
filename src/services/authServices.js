import http from "./httpServices";
import config from "./config.json";

export const postLogin = (values) => {
  console.log(values, "this is valuuuuuu");
  return http.post(`${config.local}/auth/login`, values, {
    timeout: 30000,
  });
};
export const refreshuser = async (value) => {
  return await http.get(`${config.local}/auth/refresh-user/${value}`, {
    timeout: 30000,
  });
};
// --------------------------for usermanagmet
export const getUserList = async () => {
  return await http.get(`${config.local}/api/v1/user/list`, {
    timeout: 30000,
  });
};

export const deleteUser = async (value) => {
  return await http.delete(`${config.local}/api/v1/user/${value}`, {
    timeout: 30000,
  });
};

export const adduser = async (values) => {
  return await http.post(`${config.local}/api/v1/user/create`, values, {
    timeout: 30000,
  });
};
export const edituser = async (value) => {
  return await http.put(
    `${config.local}/api/v1/user/update/${localStorage.getItem("id")}`,
    value,
    {
      timeout: 30000,
    }
  );
};

// ------------------------------------for fireproof
export const getfireprooflist = async () => {
  return await http.get(`${config.local}/api/v1/material-shape`, {
    timeout: 30000,
  });
};

export const fireproofadd = async (values) => {
  return await http.post(`${config.local}/api/v1/user/create`, values, {
    timeout: 30000,
  });
};
export const deletefireproof = async (value) => {
  return await http.delete(`${config.local}/api/v1/material/shape/${value}`, {
    timeout: 30000,
  });
};
export const editfireproof = async (value) => {
  return await http.put(
    `${config.local}/api/v1/material/shape/${localStorage.getItem("id")}`,
    value,
    {
      timeout: 30000,
    }
  );
};
// ----------------------------for essential goods

export const getessentialgoods = async () => {
  return await http.get(`${config.local}/api/v1/material`, {
    timeout: 30000,
  });
};
export const essentialgoodsadd = async (values) => {
  return await http.post(`${config.local}/api/v1/material/`, values, {
    timeout: 30000,
  });
};
export const editessentialgoods = async (value) => {
  return await http.put(`${config.local}/api/v1/user/update/${value}`, {
    timeout: 30000,
  });
};

// ------------------------------------------dashboard
export const dashboardget = () => {
  return http.get(`${config.local}/api/v1/factory`, {
    timeout: 30000,
  });
};
export const dashboardfurances = (value) => {
  return http.get(`${config.local}/api/v1/furnace/factory/${value}`, {
    timeout: 30000,
  });
};
export const getsinglefurances = (value) => {
  return http.get(`${config.local}/api/v1/furnace-material/${value}`, {
    timeout: 30000,
  });
};

export const editfurnace = (params, value) => {
  return http.put(`${config.local}/api/v1/furnace/part/${params}`, value, {
    timeout: 30000,
  });
};

// -----------------------factorymanagment

export const getFactoryManagmentData = async () => {
  return await http.get(`${config.local}/api/v1/factory`, {
    timeout: 30000,
  });
};

// ------------------------------furancepart
export const getFurancePart = async () => {
  return await http.get(`${config.local}/api/v1/furnace/part`, {
    timeout: 30000,
  });
};

// -----------------------------------------------------furance observation

export const addfurnaceevent = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/event`, values, {
    timeout: 30000,
  });
};

export const finalevent = (value) => {
  return http.get(`${config.local}/api/v1/furnace/event/final/${value}`, {
    timeout: 30000,
  });
};
export const uploadephoto = async (values, token) => {
  return await http.post(
    `${config.local}/api/v1/furnace/furnace-eventpic`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
