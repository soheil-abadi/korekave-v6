import http from "./httpServices";
import config from "./config.json";
import { token } from "../components/auth/Login";

console.log(token());

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
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const deleteUser = async (value) => {
  return await http.delete(`${config.local}/api/v1/user/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const adduser = async (values) => {
  return await http.post(`${config.local}/api/v1/user/create`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const edituser = async (value, id) => {
  return await http.put(`${config.local}/api/v1/user/update/${id}`, value, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// ------------------------------------for fireproof
export const getfireprooflist = async () => {
  return await http.get(`${config.local}/api/v1/material-shape`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const fireproofadd = async (values) => {
  return await http.post(`${config.local}/api/v1/material-shape`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const deletefireproof = async (value) => {
  return await http.delete(`${config.local}/api/v1/material-shape/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const editfireproof = async (value, id) => {
  return await http.put(`${config.local}/api/v1/material-shape/${id}`, value, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
// -----------------------------editfurnace part

export const editfurnacepart = async (values, id) => {
  return await http.put(`${config.local}/api/v1/furnace/part/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const addfurnacepart = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/part`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// ------------------------------factorymanagment

export const editfactorymanagment = async (values, id) => {
  return await http.put(`${config.local}/api/v1/factory/${id}`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addfactorymanagment = async (values) => {
  return await http.post(`${config.local}/api/v1/factory`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ----------------------------for essential goods

export const getessentialgoods = async () => {
  return await http.get(`${config.local}/api/v1/material`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const essentialgoodsadd = async (values) => {
  return await http.post(`${config.local}/api/v1/material/`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const editessentialgoods = async (value, id) => {
  return await http.put(`${config.local}/api/v1/material/${id}`, value, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const deleteessentialgoods = async (value) => {
  return await http.delete(`${config.local}/api/v1/material/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// ------------------------------------------dashboard
export const dashboardget = () => {
  return http.get(`${config.local}/api/v1/factory`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const dashboardfurances = (value) => {
  return http.get(`${config.local}/api/v1/furnace/factory/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const getsinglefurances = (value) => {
  return http.get(`${config.local}/api/v1/furnace-material/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const editfurnace = (params, value) => {
  return http.put(`${config.local}/api/v1/furnace/factory/${params}`, value, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const addfurnace = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// -----------------------factorymanagment

export const getFactoryManagmentData = async () => {
  return await http.get(`${config.local}/api/v1/factory`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// ------------------------------furancepart
export const getFurancePart = async () => {
  return await http.get(`${config.local}/api/v1/furnace/part`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// -----------------------------------------------------furance observation

export const addfurnaceevent = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace/event`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const editfurnaceevent = async (values, oid) => {
  return await http.put(`${config.local}/api/v1/furnace/event/${oid}`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const finalevent = (value) => {
  return http.get(`${config.local}/api/v1/furnace/event/final/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const uploadephoto = async (values) => {
  return await http.post(
    `${config.local}/api/v1/furnace/furnace-eventpic`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deletematerial = async (value) => {
  return await http.delete(`${config.local}/api/v1/furnace-material/${value}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const getfiuranceaddrowmaterial = async () => {
  return await http.get(`${config.local}/api/v1/material`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const getfiuranceaddrowpart = async () => {
  return await http.get(`${config.local}/api/v1/furnace/part`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};
export const addrow = async (values) => {
  return await http.post(`${config.local}/api/v1/furnace-material`, values, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const editrow = (value, params) => {
  return http.put(`${config.local}/api/v1/furnace-material/${params}`, value, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const adddimention = async (values) => {
  return await http.post(
    `${config.local}/api/v1/furnace-material/material/pershape`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      timeout: 30000,
    }
  );
};
// ---------------------------------------furnace dimention
export const getnewdimention = async (data) => {
  return await http.get(`${config.local}/api/v1/furnace-dimension/${data}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

export const newadddimentions = async (data) => {
  return await http.post(`${config.local}/api/v1/furnace-dimension/`, data, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    timeout: 30000,
  });
};

// ----------------------------------uloade photo sub table

export const uploadephotosubtable = async (values) => {
  return await http.post(
    `${config.local}/api/v1/furnace-material/pdf`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getsubtableimg = async (data) => {
  return await http.get(
    `${config.local}/api/v1/furnace-material/getpdf/${data}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      timeout: 30000,
    }
  );
};
