// C:\Users\hanos\nextall\backend\src\controllers\auth.js

const User = require('../models/User');
const Products = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const fs = require('fs');
const path = require('path');
const { getUser } = require('../config/getUser');

// Replace Nodemailer with Postmark:
const postmark = require("postmark");
// Use an environment variable for the token if available, otherwise fallback to the provided token.
const postmarkClient = new postmark.ServerClient(
  process.env.POSTMARK_SERVER_TOKEN || "2214dcca-9d7f-4fb9-8cbb-1f16c216d10b"
);

const registerUser = async (req, res) => {
  try {
    // Create user in the database
    const request = req.body; // No need to use await here
    const UserCount = await User.countDocuments();
    const existingUser = await User.findOne({ email: request.email });

    if (existingUser) {
      return res.status(400).json({
        UserCount,
        success: false,
        message: 'User With This Email Already Exists',
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    // Create user with the generated OTP
    const user = await User.create({
      ...request,
      otp,
      role: Boolean(UserCount) ? request.role || 'user' : 'super admin',
    });

    // Generate JWT token (optional here if not used for login)
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );
    // Path to the HTML file
    const htmlFilePath = path.join(
      process.cwd(),
      'src/email-templates',
      'otp.html'
    );

    // Read HTML file content
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Replace the placeholder with the OTP and user email
    htmlContent = htmlContent.replace(/<h1>[\s\d]*<\/h1>/g, `<h1>${otp}</h1>`);
    htmlContent = htmlContent.replace(/usingyourmail@gmail\.com/g, user.email);

    // Send email using Postmark
    await postmarkClient.sendEmail({
      From: process.env.RECEIVING_EMAIL, // Your sending email
      To: user.email, // User's email
      Subject: 'Verify your email',
      HtmlBody: htmlContent,
      TextBody: `Your OTP is: ${otp}`,
      MessageStream: "outbound"
    });

    res.status(201).json({
      success: true,
      message: 'Created User Successfully',
      otp,
      token, // you may remove token here if not needed on the client side
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }

    if (!user.password) {
      return res
        .status(404)
        .json({ success: false, message: 'User Password Not Found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect Password' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // Set the JWT in an HttpOnly cookie (7-day expiration)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    const products = await Products.aggregate([
      {
        $match: {
          _id: { $in: user.wishlist },
        },
      },
      {
        $lookup: {
          from: 'productreviews',
          localField: 'productreviews',
          foreignField: '_id',
          as: 'productreviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$productreviews.rating' },
          image: { $arrayElemAt: ['$images', 0] },
        },
      },
      {
        $project: {
          image: { url: '$image.url', blurDataURL: '$image.blurDataURL' },
          name: 1,
          slug: 1,
          colors: 1,
          discount: 1,
          likes: 1,
          priceSale: 1,
          price: 1,
          averageRating: 1,
          vendor: 1,
          shop: 1,
          createdAt: 1,
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: 'Login Successfully',
      // token is no longer sent to the client as it’s stored in the cookie
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cover: user.cover,
        gender: user.gender,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        zip: user.zip,
        state: user.state,
        about: user.about,
        role: user.role,
        wishlist: products,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const request = req.body;
    const user = await User.findOne({ email: request.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found ' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // Constructing the link with the token
    const resetPasswordLink = `${request.origin}/auth/reset-password/${token}`;

    // Path to the HTML file
    const htmlFilePath = path.join(
      process.cwd(),
      'src/email-templates',
      'forget.html'
    );

    // Read HTML file content
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Replace the href attribute of the <a> tag with the reset password link
    htmlContent = htmlContent.replace(
      /href="javascript:void\(0\);"/g,
      `href="${resetPasswordLink}"`
    );

    // Send email using Postmark
    await postmarkClient.sendEmail({
      From: process.env.RECEIVING_EMAIL,
      To: user.email,
      Subject: 'Reset your password',
      HtmlBody: htmlContent,
      TextBody: `Reset your password using this link: ${resetPasswordLink}`,
      MessageStream: "outbound"
    });

    return res.status(200).json({
      success: true,
      message: 'Forgot Password Email Sent Successfully.',
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Or Expired Token. Please Request A New One.',
      });
    }

    // Find the user by ID from the token
    const user = await User.findById(decoded._id).select('password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found ',
      });
    }
    if (!newPassword || !user.password) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid Data. Both NewPassword And User Password Are Required.',
      });
    }

    // Check if the new password is the same as the old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New Password Must Be Different From The Old Password.',
      });
    }
    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'Password Updated Successfully.',
      user,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await getUser(req, res, 'not-verified');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }
    // Check if OTP has already been verified
    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: 'OTP Has Already Been Verified' });
    }

    let message = '';
    // Verify the OTP
    if (otp === user.otp) {
      user.isVerified = true;
      await user.save();
      message = 'OTP Verified Successfully';
      return res.status(200).json({ success: true, message });
    } else {
      message = 'Invalid OTP';
      return res.status(400).json({ success: false, message });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

const resendOtp = async (req, res) => {
  try {
    const user = await getUser(req, res, 'not-verified');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'OTP Has Already Been Verified',
      });
    }
    // Generate new OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    // Update the user's OTP
    await User.findByIdAndUpdate(user._id, {
      otp: otp.toString(),
    });

    // Path to the HTML file
    const htmlFilePath = path.join(
      process.cwd(),
      'src/email-templates',
      'otp.html'
    );

    // Read HTML file content
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Replace the placeholder with the OTP and user email
    htmlContent = htmlContent.replace(/<h1>[\s\d]*<\/h1>/g, `<h1>${otp}</h1>`);
    htmlContent = htmlContent.replace(/usingyourmail@gmail\.com/g, user.email);

    // Send email using Postmark
    await postmarkClient.sendEmail({
      From: process.env.RECEIVING_EMAIL,
      To: user.email,
      Subject: 'Verify your email',
      HtmlBody: htmlContent,
      TextBody: `Your OTP is: ${otp}`,
      MessageStream: "outbound"
    });

    // Return the response
    return res.status(200).json({
      success: true,
      message: 'OTP Resent Successfully',
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
};
