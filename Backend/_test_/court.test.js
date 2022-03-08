const request = require('supertest')
const app = require('../src/api/app')
const db = require('../src/lib/database/query')
const sequelize = require('../src/lib/database/connection')
const { Estate } = require('../src/model/estate')
const path = require("path");

const validCourt = {
  estate_name: "German",
  description: "Estate construction",
  court_name: "jarsmine",
  no_unit_available: 2,
  threeD_site_layout: "https://tinyurl.com/4tkdpfs2",
  twoD_site_layout: "https://tinyurl.com/2pnctuym",
  _id_user: 2,
}
const validEstate = {
  _id_user: 2,
  estate_name: "German",
  location: "Onitsha",
  description: "Estate construction",
  land_size: "225 X 225",
  no_courts: "2",
  layout_t: "https://tinyurl.com/4tkdpfs2",
  layout: "https://tinyurl.com/2pnctuym",

}

const url = "/api/v1/layout/section/court";

const postCourtRequest = async (url, data = {}) => {
  return await request(app).post(url).field(data)
    .attach('twoD_site_layout', path.resolve(__dirname, 'images/imge.png'))
    .attach('threeD_site_layout', path.resolve(__dirname, 'images/imge.png'))
}

beforeAll(async () => {
  await sequelize.sync();
})

beforeEach(async () => {
  await Estate.create(validEstate);
})

afterEach(async () => {
  await sequelize.truncate({ truncate: true });
});



const parseOject = async (res) => {
  const { body } = res;
  const ParseData = body ? JSON.parse(body) : {};
  return ParseData ? ParseData.data.data : {}
}


describe("Court Section", () => {

  test("Return 200 OK for successfull court request", async () => {
    await postCourtRequest(url, validCourt)
      .then((res) => {
        expect(res._body.statusCode).toBe(201);
      })
  })

  // test("Checking input form params", async () => {
  //   await postCourtRequest(url, validCourt)
  //     .then(async (res) => {
  //       const result = await parseOject(res._body)
  //       expect(Object.keys(result)).toEqual(
  //         [
  //           "_id_user",
  //           "estate_name",
  //           "description",
  //           "court_name",
  //           "no_unit_available",
  //           "threeD_site_image",
  //           "twoD_site_image"
  //         ]);
  //     }).catch((err) => {
  //       console.log("error", err)
  //     })
  // })

  // test("Checking missing fileds form params and return missing fileds", async () => {
  //   await postCourtRequest(url, {
  //     estate_name: "German",
  //     description: "Estate construction",
  //     court_name: "jarsmine",
  //     threeD_site_layout: "https://tinyurl.com/4tkdpfs2",
  //     twoD_site_layout: "https://tinyurl.com/2pnctuym",
  //     _id_user: 2,
  //   }).then(function (res) {
  //     expect(res._body.message).toBe('no_unit_available field is missing');
  //   })
  // })

  // test("Checking params validation and return validation message", async () => {
  //   await postCourtRequest(url, {
  //     estate_name: "German",
  //     description: "Estate construction",
  //     court_name: "jarsmine",
  //     no_unit_available: 2,
  //     threeD_site_layout: "https://tinyurl.com/4tkdpfs2",
  //     twoD_site_layout: "https://tinyurl.com/2pnctuym",
  //     _id_user: "",
  //   })
  //     .then(function (res) {
  //       expect(res._body.message).toBe('must not be empty')
  //     })
  // })

  // test("Params saved in database", async () => {
  //   await postCourtRequest(url, {
  //     estate_name: "German",
  //     description: "Estate construction",
  //     court_name: "jarsmine",
  //     no_unit_available: 2,
  //     threeD_site_layout: "https://tinyurl.com/4tkdpfs2",
  //     twoD_site_layout: "https://tinyurl.com/2pnctuym",
  //     _id_user: 2,
  //   }).then(async (res) => {
  //     const data = await db.select_all('Courts');
  //     expect(data[0]._id_user).toBe("2");
  //     expect(data[0].estate_name).toBe("German");
  //     expect(data[0].description).toBe("Estate construction");
  //     expect(data[0].court_name).toBe("jarsmine");
  //     expect(data[0].no_unit_available).toBe(2);
  //     expect(data[0].layout).toBeTruthy();
  //     expect(data[0].layout_t).toBeTruthy();
  //   })
  // })


})

