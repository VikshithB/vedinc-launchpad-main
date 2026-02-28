"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEnrollmentEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEnrollmentEmail = async (data) => {
    // Email to User
    await transporter.sendMail({
        from: `"VEDINC" <${process.env.EMAIL_USER}>`,
        to: data.userEmail,
        subject: `Enrollment Confirmed - ${data.courseTitle}`,
        html: `
      <h2>Welcome to VEDINC 🎉</h2>
      <p>Hi ${data.userName},</p>
      <p>You have successfully enrolled in:</p>
      <h3>${data.courseTitle}</h3>
      <p><strong>Amount Paid:</strong> ₹${data.price}</p>
      <br/>
      <a href="${process.env.APP_URL}/industry-hub">
        Start Learning
      </a>
      <br/><br/>
      <p>Thank you for choosing VEDINC.</p>
    `,
    });
    // Email to Admin
    await transporter.sendMail({
        from: `"VEDINC" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Enrollment - ${data.courseTitle}`,
        html: `
      <h3>New Enrollment</h3>
      <p><strong>Name:</strong> ${data.userName}</p>
      <p><strong>Email:</strong> ${data.userEmail}</p>
      <p><strong>Course:</strong> ${data.courseTitle}</p>
      <p><strong>Amount:</strong> ₹${data.price}</p>
    `,
    });
};
exports.sendEnrollmentEmail = sendEnrollmentEmail;
