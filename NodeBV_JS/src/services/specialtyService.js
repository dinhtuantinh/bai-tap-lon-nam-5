const db = require("../models");
let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errorMessage: "Missing parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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
let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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
let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errorMessage: "Missing parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
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
let updateSpecialtyData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters!`,
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (specialty) {
        specialty.name = data.name;
        specialty.address = data.address;
        specialty.descriptionHTML = data.descriptionHTML;
        specialty.descriptionMarkdown = data.descriptionMarkdown;
        if (data.avatar) {
          specialty.image = data.avatar;
        }
        await specialty.save();
        resolve({
          errCode: 0,
          message: "Update the specialty succeeds!",
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
let deleteSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    let foundSpecialty = await db.Specialty.findOne({
      where: { id: data },
    });
    if (!foundSpecialty) {
      resolve({
        errCode: 2,
        errMessage: `The Specialty isn't exist`,
      });
    }
    await db.Specialty.destroy({
      where: { id: data },
    });

    resolve({
      errCode: 0,
      message: `The Specialty is deleted`,
    });
  });
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  updateSpecialtyData: updateSpecialtyData,
  deleteSpecialty: deleteSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
