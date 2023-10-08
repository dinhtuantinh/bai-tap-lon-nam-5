const db = require("../models");
let createNote = (data) => {
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
        await db.Note.create({
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
let getAllNote = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Note.findAll();
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
let getDetailNoteById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errorMessage: "Missing parameter",
        });
      } else {
        let data = await db.Note.findOne({
          where: {
            id: inputId,
          },
          attributes: ["name", "descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorNote = [];
          doctorNote = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorNote = doctorNote;
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
let updateNoteData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters!`,
        });
      }
      let note = await db.Note.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (note) {
        note.name = data.name;
        note.address = data.address;
        note.descriptionHTML = data.descriptionHTML;
        note.descriptionMarkdown = data.descriptionMarkdown;
        if (data.avatar) {
          note.image = data.avatar;
        }
        await note.save();
        resolve({
          errCode: 0,
          message: "Update the note succeeds!",
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
let deleteNote = (data) => {
  return new Promise(async (resolve, reject) => {
    let foundNote = await db.Note.findOne({
      where: { id: data },
    });
    if (!foundNote) {
      resolve({
        errCode: 2,
        errMessage: `The Note isn't exist`,
      });
    }
    await db.Note.destroy({
      where: { id: data },
    });

    resolve({
      errCode: 0,
      message: `The Note is deleted`,
    });
  });
};
module.exports = {
  createNote: createNote,
  getAllNote: getAllNote,
  updateNoteData: updateNoteData,
  deleteNote: deleteNote,
  getDetailNoteById: getDetailNoteById,
};
