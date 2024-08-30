import dotenv from "dotenv";
dotenv.config();

const VerificationEmail_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - E-Book</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
    <div style="flex align-item-center justify-content-center">
   <img src="cid:e-book" alt="E-Book Logo" style="display: block; margin: 20px auto; max-width: 100px;">
<h2 style="color:"#1810fffa"; font-weight:600;">E-Book</h2>
</div>
        <h1 style="color: #333333;">Verify Your Email Address</h1>
        <p style="color: #666666;">Hello,</p>
        <p style="color: #666666;">Your OTP for email verification is: <span style="font-size: 24px; font-weight: bold; color: #1810fffa;">{verificationCode}</span></p>
        <p style="color: #666666;">Please enter this code to verify your email address.</p>
        <p style="color: #666666;">If you didn't request this verification, please ignore this email.</p>
        <p style="color: #666666;">Thank you!</p>
        <div style="margin-top: 20px; text-align: center; color: #999999; font-size: 12px;">
            <p>© 2024 E-Book. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const Welcome_Template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to E-Book</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
     <div style="display: flex; align-items: center; justify-content: center;">
     <div style="display:flex; align-items:center; justify-content:center;">
       <img src="cid:e-book" alt="E-Book Logo" style="display: block; margin: 20px auto; max-width: 100px;">
        <h2 style="color: #1810fffa; font-weight: 600; margin:auto 0px;">E-Book</h2>
     </div>
   </div>
        <h1 style="color: #333333;">Welcome to E-Book!</h1>
        <p style="color: #666666;">Hello, "{Name}"</p>
        <p style="color: #666666;">Thank you for joining E-Book. We're excited to have you on board!</p>
        <p style="color: #666666;">At E-Book, we strive to provide you with the best reading experience. Explore our vast collection of books and find your next favorite read, also you can order a hard copy of a e book</p>
        <p style="color: #666666;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p style="color: #666666;">Happy reading!</p>
        <p style="color: #666666;">Best regards,<br>The E-Book Team</p>
        <div style="margin-top: 20px; text-align: center; color: #999999; font-size: 12px;">
            <p>© 2024 E-Book. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const Password_Reset_Template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - E-Book</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
    <div style="display: flex; align-items: center; justify-content: center;">
     <div style="display:flex; align-items:center; justify-content:center;">
       <img src="cid:e-book" alt="E-Book Logo" style="display: block; margin: 20px auto; max-width: 100px;">
        <h2 style="color: #1810fffa; font-weight: 600; margin:auto 0px;">E-Book</h2>
     </div>
   </div>
        <h1 style="color: #333333;">Reset Your Password</h1>
        <p style="color: #666666;">Hello,</p>
        <p style="color: #666666;">You recently requested to reset your password for your E-Book account.</p>
        <p style="color: #666666;">Use the button below to reset it. This password reset link is valid for the next 1 hours:</p>
      
    <div style="display: flex; align-items: center; justify-content: center; width: 100vw; margin: 10px auto;">
    <a href="{resetURL}" style="text-decoration: none; background: #1810fffa; padding: 6px; border-radius: 4px; font-weight: bold; color: #fff;">
        Reset Your Password
    </a>
</div>


        <p style="color: #666666;">If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
        <p style="color: #666666;">Thank you!</p>
        <div style="margin-top: 20px; text-align: center; color: #999999; font-size: 12px;">
            <p>© 2024 E-Book. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const Password_ResetSuccess_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success - E-Book</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
      <div style="display: flex; align-items: center; justify-content: center;">
     <div style="display:flex; align-items:center; justify-content:center;">
       <img src="cid:e-book" alt="E-Book Logo" style="display: block; margin: 20px auto; max-width: 100px;">
        <h2 style="color: #1810fffa; font-weight: 600; margin:auto 0px;">E-Book</h2>
     </div>
   </div>
        <div style="display: flex; align-items: center; justify-content: center;">
           <img src="cid:checkmark" alt="CheckMark Icon" style="display: block; margin: 20px auto; max-width: 100px;"/>
        </div>
        <h1 style="color: #333333; text-align: center;">Password Reset Successful</h1>
        <p style="color: #666666; text-align: center;">Your password has been successfully reset.</p>
        <p style="color: #666666; text-align: center;">If you did not initiate this action, please contact support.</p>
        <div style="margin-top: 20px; text-align: center; color: #999999; font-size: 12px;">
            <p>© 2024 E-Book. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export default VerificationEmail_Template;
export {
  Welcome_Template,
  Password_Reset_Template,
  Password_ResetSuccess_Template,
};
