const request = require('supertest')
const app = require('../src/api/app')
const db = require('../src/lib/database/query')
const sequelize = require('../src/lib/database/connection')
const { User } = require('../src/model/user')

const url = "/api/v1/registration/signup";

const validUser = {
  first_name: "austine",
  last_name: "coded",
  user_email: "admin21@gmail.com",
  user_phone: "+2349013702523",
  marital_status: "single",
  nationality: "nigeria",
  date_of_birth: "2000/02/05",
  password: "@admin321?",
  comfirmed_password: "@admin321?",
  id_user_access_level: 5
}

const postCourtRequest = async (url, data = {}) => {
  return await request(app).post(url).send(data)
    .set('Accept', 'application/json')
}

beforeAll(() => {
  return sequelize.sync();
})


afterEach(async () => {
  await sequelize.truncate({ truncate: true });
});



const parseOject = async (res) => {
  const { body } = res;
  const ParseData = body ? JSON.parse(body) : {};
  return ParseData.data.data ? ParseData.data.data : ParseData.data;
}


describe("Registration", () => {

  test("Return 200 OK for successfull registration request", async () => {
    await postCourtRequest("/api/v1/registration/signup", validUser)
      .then((res) => {
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res._body.statusCode).toBe(201);
      })
  })

  test("Checking registration params validation", async () => {
    await postCourtRequest(url, {
      first_name: "austine",
      last_name: "coded",
      user_email: "admin21@gmail.com",
      user_phone: "+234901370252",
      marital_status: "single",
      nationality: "nigeria",
      date_of_birth: "2000/02/05",
      password: "@admin321?",
      comfirmed_password: "@admin321?",
      id_user_access_level: 5
    })
      .then((res) => {
        expect(res._body.message).toBe('must be valid mobile phone number')
      })
  })

  test("Checking registration missing params validation", async () => {
    await postCourtRequest("/api/v1/registration/signup", {
      first_name: "austine",
      user_email: "admin21@gmail.com",
      user_phone: "+2349013702523",
      marital_status: "single",
      nationality: "nigeria",
      date_of_birth: "2000/02/05",
      password: "@admin321?",
      id_user_access_level: 5,
      comfirmed_password: "@admin321?"
    })
      .then((res) => {
        expect(res._body.message).toBe('last_name field is missing');
      })
  })

  test("Checking registration null params", async () => {
    await postCourtRequest("/api/v1/registration/signup", {
      first_name: "austine",
      last_name: "coded",
      user_email: " ",
      user_phone: "+2349013702523",
      marital_status: "single",
      nationality: "nigeria",
      date_of_birth: "2000/02/05",
      password: "@admin321?",
      id_user_access_level: 5,
      comfirmed_password: "@admin321?"
    })
      .then((res) => {
        expect(res._body.message).toBe('user_email cannot be null')
      })
  })

  test("Checking registration token", async () => {
    await postCourtRequest("/api/v1/registration/signup", validUser)
      .then(async (res) => {
        const data = await db.select_all('Verifications');
        expect(data[0].token).toBeTruthy();
      })
  })

  test("Checking verification email", async () => {
    await postCourtRequest("/api/v1/registration/signup", validUser)
      .then(async (res) => {
        const result = await parseOject(res._body);
        expect(result).toBe('Verification email failed')
      })
  })

})

