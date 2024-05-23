const nodemailer = require('nodemailer');

const sendReportEmail = async (email, reportData, reportType) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yonatanwork122@gmail.com',
            pass: 'qmls sqda aaqk gaws'
        }
    });

    let subject, text;

    if (reportType === 'inventory') {
        subject = 'Your Inventory Report';
        text = `Here is your inventory report:\n\n`;
        reportData.forEach(item => {
            text += `Item: ${item.name}, Quantity: ${item.quantity}\n`;
        });
    } else if (reportType === 'transactions') {
        subject = 'Your Transactions Report';
        text = `Here is your transactions report:\n\n`;
        reportData.forEach(transaction => {
            text += `Type: ${transaction.type}, Quantity: ${transaction.quantity}, Item ID: ${transaction.itemId}, User ID: ${transaction.userId}, Timestamp: ${transaction.timestamp}\n`;
        });
    } else {
        subject = 'Your Report';
        text = `Here is your report:\n\n${JSON.stringify(reportData, null, 2)}`;
    }

    let info = await transporter.sendMail({
        from: '"Yonatan" <yonatanwork122@gmail.com>',
        to: email,
        subject: subject,
        text: text
    });

    console.log("Message sent: %s", info.messageId);
};

module.exports = sendReportEmail;
