const bcrypt = require('bcrypt');
const genID = require('shortid');
const moment = require('moment');

const genToken = require('../middleware/token_handler');
const db = require("../lib/database/query");
const handler = require('../middleware/handler');
const { User } = require('../model/user');
const { userExceptionError } = require('../../helper/exceptionErrors')
const { Varification } = require('../model/verification')
const mailServices = require('../lib/template/email_services');
const { response } = require('express');



const custom_error = [
  "user already exist",
  "Phone already taken",
  "body is empty",
  "user not found",
  "invalid verification code",
  "invalid user password",
  "please verify account",
  "email already verified",
]

const api_name = "/api/v1/registration/signup";
const api_name_login = "/api/v1/registration/login";
const api_name_verify = "/api/v1/registration/account/verify";
const api_name_token = "/api/v1/registration/generate/token";

const hashPassword = async (plainPassword, salt = 10) => {
  const gensalt = await bcrypt.genSalt(salt)
  const passwordHash = await bcrypt.hash(plainPassword, gensalt)
  return passwordHash;

}

class RegistrationServices {

  signup = async (data) => {


    const {
      first_name,
      last_name,
      user_email,
      user_phone,
      marital_status,
      nationality,
      date_of_birth,
      password,
      id_user_access_level
    } = data;

    const user = await db.search_one("Users", "user_email", user_email);

    if (user.length > 0) {
      const responses = handler.returner([false, custom_error[0]], api_name, 400)
      return {
        status: 400,
        data: responses
      }
    }

    const phone_num = await db.search_one("Users", "user_phone", user_phone);

    if (phone_num.length > 0) {
      const responses = handler.returner([false, custom_error[1]], api_name, 400)
      return {
        status: 400,
        data: responses
      }
    }

    const id = genID.generate();
    const passwordHash = await hashPassword(password, 10);
    const verification_code = Math.random().toString(36).substring(2, 8);
    const max_time = 2;
    const datetime = moment().add(max_time, 'd');

    const userRecord = Object.assign({}, {
      first_name,
      last_name,
      user_email,
      user_phone,
      marital_status,
      nationality,
      date_of_birth,
    }, {
      password: passwordHash,
      email_verified: false,
      _id_user: id
    })

    const verificationRecord = {
      token: '',
      _id_user: id,
      id_user_access_level,
      verification_code,
      datetime_generated: datetime
    }


    await User.create(userRecord);
    await Varification.create(verificationRecord);

    const email_info = {
      user_email: "",
      first_name: "",
      subject: "Account Verification",
      message: "Here is your verification code",
    }

    email_info.first_name = first_name
    email_info.user_email = user_email
    email_info.message += `<b>${verification_code}</b>`;

    const email_sent = await mailServices.email(email_info)
    if (email_sent) {
      const responses = handler.returner([true, 'User successfully created please verify account'], api_name, 201)
      return {
        status: 201,
        data: responses
      }
    } else {
      const responses = handler.returner([true, 'Verification email failed'], api_name, 201)
      return {
        status: 201,
        data: responses
      }
    }

  }

  verifyEmail = async (data) => {

    let update = null;
    let user = null;

    const {
      user_email,
      verification_code
    } = data;


    if (user_email) {
      user =
        (await db.select_all_from_join_with_condition(
          "Users",
          "Verifications",
          "_id_user",
          user_email,
          "user_email"
        ))[0]
    }

    // if (user_phone_number) {
    //     update = { phone_verified: 1 }
    //     user = (
    //         await db.select_all_from_join3_with_condition(
    //             "verification_codes",
    //             "users",
    //             "vendors",
    //             "id_user",
    //             "id_vendor",
    //             { user_phone_number }
    //         )
    //     )[0]
    // }



    if (!user) {
      throw new userExceptionError([], custom_error[3]);
    }

    if (user.email_verified = 1) {
      throw new userExceptionError([], custom_error[7]);
    }

    const { _id_user, first_name } = user;

    if (moment().format("d:M:D:YYYY") > moment(user.datetime_generated).format("d:M:D:YYYY")) {
      const code = null;
      await db.update_one_without_condition("Verifications", code, "verification_code", "_id_user", _id_user);
      throw new userExceptionError([], 'Provided token has expired');
    };

    if (verification_code !== user.verification_code) {
      throw new userExceptionError([], custom_error[4]);
    };

    update = true;
    await db.update_one_without_condition("Users", update, "email_verified", "_id_user", _id_user);

    const email_info = {
      user_email: "",
      first_name: "",
      subject: "Account Verification",
      message: "",
    }

    email_info.first_name = first_name
    email_info.user_email = user_email
    email_info.message += `<b>email verified successfully</b>`;

    const email_sent = await mailServices.email(email_info);

    if (email_sent) {
      const responses = handler.returner([true, { message: "Email verified successfully", data: [] }], api_name_verify, 201);
      return {
        status: 201,
        data: responses
      }
    } else {
      const responses = handler.returner([true, { message: "Mail verification failed to send", data: [] }], api_name_verify, 500);
      return {
        status: 500,
        data: responses
      }
    }

  }

  generateToken = async (data) => {

    const { user_email } = data;

    const user = await db.search_one("Users", "user_email", user_email);

    if (user.length === 0) {
      const responses = handler.returner([false, custom_error[3]], api_name_token, 400)
      return {
        status: 400,
        data: responses
      }
    } else {

      const max_time = 2;
      const datetime = moment().add(max_time, 'd').format();

      const verification_code = Math.random().toString(36).substring(2, 8);
      await db.update_one_without_condition("Verifications", `"${verification_code}"`, "verification_code", "_id_user", user[0]._id_user);
      await db.update_one_without_condition("Verifications", `"${datetime}"`, "datetime_generated", "_id_user", user[0]._id_user);

      const responses = handler.returner([true, {
        message: "New generated verification code", data: [{
          verification_code
        }]
      }], api_name_token, 201);

      return {
        status: 201,
        data: responses
      };

    }


  }



  login = async (data) => {

    const {
      user_password,
      user_email
    } = data;

    const user = await db.search_one("Users", "user_email", user_email);

    if (user[0].email_verified === 0) {
      const responses = handler.returner([true, custom_error[6]], api_name, 400)
      return {
        status: 400,
        data: responses
      }
    };

    if (user.length === 0) {
      const responses = handler.returner([true, custom_error[3]], api_name, 400)
      return {
        status: 400,
        data: responses
      }
    };

    const valid_password = await bcrypt.compare(user_password, user[0].password)

    if (!valid_password) {
      const responses = handler.returner([true, custom_error[5]], api_name, 400)
      return {
        status: 400,
        data: responses
      }
    }

    const new_token = await genToken.create(user[0]._id_user);
    await db.update_one_without_condition("Verifications", `"${new_token}"`, "token", "_id_user", user[0]._id_user);
    await db.update_one_without_condition("Verifications", 4, "id_user_access_level", "_id_user", user[0]._id_user);

    const result = await db.select_all_from_join_with_condition(
      "Users",
      "Verifications",
      "_id_user",
      user_email,
      "user_email"
    )

    const {
      _id_user,
      first_name,
      last_name,
      user_phone,
      id_user_access_level,
      token
    } = result[0];


    const record = {
      _id_user,
      first_name,
      last_name,
      full_name: `${last_name} ${first_name}`,
      user_email,
      user_phone,
      id_user_access_level,
      token,
      email_verified: true
    }

    const responses = handler.returner([true, record], api_name_login, 201)
    return {
      status: 201,
      data: responses
    };

  }
}

module.exports = new RegistrationServices()