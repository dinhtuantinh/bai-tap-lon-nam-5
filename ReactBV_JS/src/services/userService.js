import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  // temolate string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  // return axios.delete('/api/delete-user', { id: userId })
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllTopDoctorHomeService = (limit) => {
  return axios.get(`/api/all-top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get("/api/get-specialty");
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const editSpecialty = (data) => {
  return axios.put("/api/edit-specialty", data);
};
const deleteSpecialty = (specialtyId) => {
  return axios.delete("/api/delete-specialty", {
    data: {
      id: specialtyId,
    },
  });
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const editClinic = (data) => {
  console.log("data: ", data);
  return axios.put("/api/edit-clinic", data);
};
const deleteClinic = (clinicId) => {
  return axios.delete("/api/delete-clinic", {
    data: {
      id: clinicId,
    },
  });
};
const getAllClinic = () => {
  return axios.get("/api/get-clinic");
};
const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const createNewNote = (data) => {
  return axios.post("/api/create-new-note", data);
};
const getAllNote = () => {
  return axios.get("/api/get-note");
};
const getDetailNoteById = (data) => {
  return axios.get(`/api/get-detail-note-by-id?id=${data.id}`);
};
const editNote = (data) => {
  return axios.put("/api/edit-note", data);
};
const deleteNote = (noteId) => {
  return axios.delete("/api/delete-note", {
    data: {
      id: noteId,
    },
  });
};

const getInforDoctor = () => {
  return axios.get("/api/get-infor-doctor");
};
const getDetailInforDoctorById = (data) => {
  return axios.get(`/api/get-detail-infor-doctor-by-id?id=${data.id}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  editSpecialty,
  deleteSpecialty,
  createNewClinic,
  editClinic,
  deleteClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  createNewNote,
  getAllNote,
  getDetailNoteById,
  editNote,
  deleteNote,
  getInforDoctor,
  getDetailInforDoctorById,
  getAllTopDoctorHomeService,
};
