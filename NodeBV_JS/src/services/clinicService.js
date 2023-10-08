const db = require("../models");
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errorMessage: "Missing parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          image: data.imageBase64,
        });
        resolve({
          errCode: 0,
          errorMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errorMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errorMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errCode: 0,
          errorMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateClinicData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters!`,
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.descriptionHTML = data.descriptionHTML;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        if (data.avatar) {
          clinic.image = data.avatar;
        }
        await clinic.save();
        resolve({
          errCode: 0,
          message: "Update the clinic succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `User's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteClinic = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    let foundClinic = await db.Clinic.findOne({
      where: { id: clinicId },
    });
    if (!foundClinic) {
      resolve({
        errCode: 2,
        errMessage: `The clinic isn't exist`,
      });
    }
    await db.Clinic.destroy({
      where: { id: clinicId },
    });

    resolve({
      errCode: 0,
      message: `The clinic is deleted`,
    });
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  updateClinicData: updateClinicData,
  deleteClinic: deleteClinic,
};
