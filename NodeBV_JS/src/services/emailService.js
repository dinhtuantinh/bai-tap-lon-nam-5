require('dotenv').config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Đinh Tuấn Tỉnh 👻" <tinhchuai12345@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Cám ơn bạn đã đặt lịch khám bệnh online trên Tuấn Tỉnh</p>
        <p>Thông tin lịch khám bạn đã đặt lịch:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Để xác nhận thông tin trên là đúng bạn hãy ấn vào link để hoàn tất đặt lịch khám bệnh.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>Thank you for booking an online medical examination appointment on Tuan Tinh</p>
        <p>Information about the appointment you have booked:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>To confirm the above information is correct, please click on the link to complete the appointment.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Sincerely thank!</div>
        `
    }
    return result;
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Cám ơn bạn đã đặt lịch khám bệnh online trên Tuấn Tỉnh thành công.</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>

        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>Thank you for successfully booking an online medical examination on Tuấn Tỉnh.</p>
        <p>Prescription/invoice information is sent in the attached file.</p>

        <div>Sincerely thank!</div>
        `
    }
    return result;
}
let sendAttachment = async(dataSend) => {
    return new Promise(async(resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Đinh Tuấn Tỉnh 👻" <tinhchuai12345@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [{
                    filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.jpg`,
                    content: dataSend.imgBase64.split("base64,")[1],
                    encoding: 'base64'
                }],
            });
            resolve(true)
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}