import noteService from "../services/noteService";
let createNote = async (req, res) => {
  try {
    let infor = await noteService.createNote(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
let getAllNote = async (req, res) => {
  try {
    let infor = await noteService.getAllNote();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
let getDetailNoteById = async (req, res) => {
  try {
    let infor = await noteService.getDetailNoteById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
let handleEditNote = async (req, res) => {
  let data = req.body;
  let message = await noteService.updateNoteData(data);
  return res.status(200).json(message);
};
let handleDeleteNote = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await noteService.deleteNote(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createNote: createNote,
  getAllNote: getAllNote,
  handleEditNote: handleEditNote,
  handleDeleteNote: handleDeleteNote,
  getDetailNoteById: getDetailNoteById,
};
