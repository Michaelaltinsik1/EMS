import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://ems-t05h.onrender.com/';
axios.defaults.withCredentials = true;

interface CreateProject {
  name: string;
  start_date: Date;
  deadline: Date;
  description: string;
}
interface UpdateProject extends CreateProject {
  projectId: string;
}

interface AddEmployeeToProject {
  userId: string;
  projectId: string;
}
export async function postNewProject({
  name,
  start_date,
  deadline,
  description,
}: CreateProject) {
  const response = await axios
    .post(`/projects`, { name, start_date, deadline, description })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function getAllProjects() {
  const response = await axios
    .get(`/projects`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function updateProjectById({
  name,
  start_date,
  deadline,
  description,
  projectId,
}: UpdateProject) {
  const response = await axios
    .put(`/projects/${projectId}`, { name, start_date, deadline, description })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function getProjectsWithEmployeeID(id: string) {
  const response = await axios
    .get(`/projects/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function addEmployeeToProject({
  userId,
  projectId,
}: AddEmployeeToProject) {
  const response = await axios
    .put(`/projects/${projectId}/users/${userId}`, {})
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}

export async function deleteProjectById(projectId: string) {
  const response = await axios
    .delete(`/projects/${projectId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return e?.response?.data;
    });
  return response;
}
