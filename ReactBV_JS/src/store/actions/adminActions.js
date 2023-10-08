import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  getAllClinic,
  editClinic,
  deleteClinic,
  editSpecialty,
  deleteSpecialty,
  editNote,
  deleteNote,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderFailed error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionFailed error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAIDED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleFailed error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAIDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAIDED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users error!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed error", e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIDED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete the users error!");
      dispatch(deleteUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAIDED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the users error!");
      dispatch(editUserFailed());
      console.log("EditUserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAIDED,
});

// let res1 = await getTopDoctorHomeService(3);
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAIDED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAIDED", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAIDED,
      });
    }
  };
};
export const fetchAllTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TOP_DOCTORS_FAIDED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_TOP_DOCTORS_FAIDED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_TOP_DOCTORS_FAIDED,
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAIDED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTORS_FAIDED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAIDED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save Infor Detail Doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor Detail Doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
        });
      }
    } catch (e) {
      toast.error("Save Infor Detail Doctor error!");
      console.log("SAVE_DETAIL_DOCTOR_FAIDED", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCHEDULE_TIME_FAIDED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALLCODE_SUCHEDULE_TIME_FAIDED", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SUCHEDULE_TIME_FAIDED,
      });
    }
  };
};
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchRequiredDoctorInforFailed error", e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED,
});

export const editClinicById = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinic(data);
      if (res && res.errCode === 0) {
        toast.success("Update the Clinic succeed!");
        dispatch(editClinicSuccess());
      } else {
        toast.error("Update the Clinic error!");
        dispatch(editClinicError());
      }
    } catch (e) {
      toast.error("Update the Clinic error!");
      dispatch(editClinicError());
      console.log("Clinic error", e);
    }
  };
};

export const editClinicSuccess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
});
export const editClinicError = () => ({
  type: actionTypes.EDIT_CLINIC_FAIDED,
});

export const deleteClinicById = (clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinic(clinicId);
      if (res && res.errCode === 0) {
        toast.success("Delete the clinic succeed!");
        dispatch(deleteClinicSuccess());
      } else {
        toast.error("delete the clinic error!");
        dispatch(deleteClinicFailed());
      }
    } catch (e) {
      toast.error("Delete the clinic error!");
      dispatch(deleteClinicFailed());
      console.log("saveClinicFailed error", e);
    }
  };
};
export const deleteClinicSuccess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
});
export const deleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAIDED,
});

export const editSpecialtyById = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialty(data);
      if (res && res.errCode === 0) {
        toast.success("Update the Specialty succeed!");
        dispatch(editSpecialtySuccess());
      } else {
        toast.error("Update the Specialty error!");
        dispatch(editSpecialtyError());
      }
    } catch (e) {
      toast.error("Update the Specialty error!");
      dispatch(editSpecialtyError());
      console.log("Specialty error", e);
    }
  };
};

export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});
export const editSpecialtyError = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAIDED,
});

export const deleteSpecialtyById = (SpecialtyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialty(SpecialtyId);
      if (res && res.errCode === 0) {
        toast.success("Delete the Specialty succeed!");
        dispatch(deleteSpecialtySuccess());
      } else {
        toast.error("delete the Specialty error!");
        dispatch(deleteSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Delete the specialty error!");
      dispatch(deleteSpecialtyFailed());
      console.log("saveSpecialtyFailed error", e);
    }
  };
};
export const deleteSpecialtySuccess = () => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});
export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAIDED,
});

export const editNoteById = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editNote(data);
      if (res && res.errCode === 0) {
        toast.success("Update the Note succeed!");
        dispatch(editNoteSuccess());
      } else {
        toast.error("Update the Note error!");
        dispatch(editNoteError());
      }
    } catch (e) {
      toast.error("Update the Note error!");
      dispatch(editNoteError());
      console.log("Note error", e);
    }
  };
};

export const editNoteSuccess = () => ({
  type: actionTypes.EDIT_NOTE_SUCCESS,
});
export const editNoteError = () => ({
  type: actionTypes.EDIT_NOTE_FAIDED,
});

export const deleteNoteById = (NoteId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteNote(NoteId);
      if (res && res.errCode === 0) {
        toast.success("Delete the Note succeed!");
        dispatch(deleteNoteSuccess());
      } else {
        toast.error("delete the Note error!");
        dispatch(deleteNoteFailed());
      }
    } catch (e) {
      toast.error("Delete Note error!");
      dispatch(deleteNoteFailed());
      console.log("NoteFailed error", e);
    }
  };
};
export const deleteNoteSuccess = () => ({
  type: actionTypes.DELETE_NOTE_SUCCESS,
});
export const deleteNoteFailed = () => ({
  type: actionTypes.DELETE_NOTE_FAIDED,
});
