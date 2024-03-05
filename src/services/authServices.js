import http from "./httpServices";
import config from "./config.json";

export const postLogin = (values) => {
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
  return await http.post(`${config.local}/api/v1/material-shape`, values, {
    timeout: 30000,
  });
};
export const deletefireproof = async (value) => {
  return await http.delete(`${config.local}/api/v1/material-shape/${value}`, {
    timeout: 30000,
  });
};
export const editfireproof = async (value, id) => {
  return await http.put(`${config.local}/api/v1/material-shape/${id}`, value, {
    timeout: 30000,
  });
};
// -----------------------------editfurnace part

export const editfurnacepart = async (values, id) => {
  return await http.put(`${config.local}/api/v1/furnace/part/${id}`, values, {
    timeout: 30000,
  });
};
export const addfurnacepart = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/part`, values, {
    timeout: 30000,
  });
};

// ------------------------------factorymanagment

export const editfactorymanagment = async (values, id) => {
  return await http.put(`${config.local}/api/v1/factory/${id}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addfactorymanagment = async (values) => {
  return await http.post(`${config.local}/api/v1/factory`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
export const editessentialgoods = async (value, id) => {
  return await http.put(`${config.local}/api/v1/material/${id}`, value, {
    timeout: 30000,
  });
};

export const deleteessentialgoods = async (value) => {
  return await http.delete(`${config.local}/api/v1/material/${value}`, {
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
  return http.put(`${config.local}/api/v1/furnace/factory/${params}`, value, {
    timeout: 30000,
  });
};
export const addfurnace = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/`, values, {
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
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deletematerial = async (value) => {
  return await http.delete(`${config.local}/api/v1/furnace-material/${value}`, {
    timeout: 30000,
  });
};

export const getfiuranceaddrowmaterial = async () => {
  return await http.get(`${config.local}/api/v1/material`, {
    timeout: 30000,
  });
};

export const getfiuranceaddrowpart = async () => {
  return await http.get(`${config.local}/api/v1/furnace/part`, {
    timeout: 30000,
  });
};
export const addrow = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace-material`, values, {
    timeout: 30000,
  });
};

export const adddimention = async (values) => {
  return await http.post(
    `${config.local}/api/v1/furnace-material/material/pershape`,
    values,
    {
      timeout: 30000,
    }
  );
};
// ---------------------------------------furnace dimention
export const getnewdimention = async (data) => {
  return await http.get(`${config.local}/api/v1/furnace-dimension/${data}`, {
    timeout: 30000,
  });
};

export const newadddimentions = async (data) => {
  return await http.post(`${config.local}/api/v1/furnace-dimension/`, data, {
    timeout: 30000,
  });
};
