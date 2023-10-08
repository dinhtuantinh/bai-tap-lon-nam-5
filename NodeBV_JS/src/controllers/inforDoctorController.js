import inforDoctorService from '../services/inforDoctorService'

let getInforDoctor = async(req, res) => {
    try {
        let infor = await inforDoctorService.getInforDoctor();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let getDetailInforDoctorById = async(req, res) => {
    try {
        let infor = await inforDoctorService.getDetailInforDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
module.exports = {
    getInforDoctor: getInforDoctor,
    getDetailInforDoctorById: getDetailInforDoctorById,
}