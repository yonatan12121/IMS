// utils/email.js
const nodemailer = require('nodemailer');

const sendReportEmail = async (email, reportData) => {
    console.log(email);
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yonatanwork122@gmail.com',
            pass: 'qmls sqda aaqk gaws'
        }
    });

    const subject = 'Your Task Report';
    const text = `Here is your task report:\n\nTotal Tasks: ${reportData.totalTasks}\nCompleted Tasks: ${reportData.completedTasks}\nPending Tasks: ${reportData.pendingTasks}\nFor Review Tasks: ${reportData.forReviewTasks}\nCompletion Rate: ${reportData.completionRate}%\nOverdue Tasks: ${reportData.overdueTasks}`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Yonatan" <yonatanwork122@gmail.com>',
        to: email,
        subject: subject,
        text: text
    });

    console.log("Message sent: %s", info.messageId);
};

module.exports = sendReportEmail;
