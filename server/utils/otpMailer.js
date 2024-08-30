import nodemailer from "nodemailer";
import VerificationEmail_Template, {
  Welcome_Template,
  Password_Reset_Template,
  Password_ResetSuccess_Template,
} from "./emailTemplate.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename, "e-book.png ");

const imagePath = path.join(__dirname, "static", "e-book.png");
const successIcon = path.join(__dirname, "static", "checkmark.png");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    var mailOptions = {
      from: "ebookprimary@gmail.com",
      to: email,
      subject: "Verify UserEmail",
      html: VerificationEmail_Template.replace(
        "{verificationCode}",
        verificationToken
      ),
      attachments: [
        {
          filename: "e-book.png",
          path: imagePath,
          cid: "e-book",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent :) " + info.response);
      }
    });

    console.log("Email Send Succeesfully", mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Error Sending Verification Email ", `${error}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    var mailOptions = {
      from: "ebookprimary@gmail.com",
      to: email,
      subject: "Welcome Email For E-Book",
      html: Welcome_Template.replace("{Name}", name),
      attachments: [
        {
          filename: "e-book.png",
          path: imagePath,
          cid: "e-book",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent :) " + info.response);
      }
    });

    console.log("Email Send Succeesfully", mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Error Sending Verification Email ", `${error}`);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    var mailOptions = {
      from: "ebookprimary@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: Password_Reset_Template.replace("{resetURL}", resetURL),
      attachments: [
        {
          filename: "e-book.png",
          path: imagePath,
          cid: "e-book",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent :) " + info.response);
      }
    });

    console.log("Email Send Succeesfully", mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Error Sending PasswordReset Email ", `${error}`);
  }
};

const sendResetSuccessEmail =  async (email) => {
  try {
    var mailOptions = {
      from: "ebookprimary@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: Password_ResetSuccess_Template,
      attachments: [
        {
          filename: "e-book.png",
          path: imagePath,
          cid: "e-book",
        },
        {
          filename: "checkmark.png",
          path: successIcon,
          cid: "checkmark",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent :) " + info.response);
      }
    });

    console.log("Email Send Succeesfully", mailOptions);
  } catch (error) {
    throw new Error("Error Sending ResetSuccess Email ", `${error}`);
  }
}

export { sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail };
export default sendVerificationEmail;
