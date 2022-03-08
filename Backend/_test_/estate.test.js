const request = require('supertest')
const app = require('../src/api/app')
const db = require('../src/lib/database/query')
const sequelize = require('../src/lib/database/connection');
const path = require("path")


const validEstate = {
  _id_user: 3,
  estate_name: "German",
  location: "Onitsha",
  description: "Estate construction",
  land_size: "225 X 225",
  no_courts: "2",
  layout_t: "https://tinyurl.com/4tkdpfs2",
  layout: "https://tinyurl.com/2pnctuym",
}

const url = '/api/v1/layout/section/estate';

const postCourtRequest = async (url, data = {}) => {
  return await request(app).post(url).field(data)
    .attach('twoD_site_layout', path.resolve(__dirname, 'images/imge.png'))
    .attach('threeD_site_layout', path.resolve(__dirname, 'images/imge.png'))
}


beforeAll(() => {
  return sequelize.sync()
})

afterEach(async () => {
  await sequelize.truncate({ truncate: true });
});





const parseOject = async (res) => {
  const { body } = res;
  const ParseData = body ? JSON.parse(body) : {};
  return ParseData ? ParseData.data.data : {}
}




describe("Estate Section", () => {

  test("Return 200 OK for successfull estate request", async () => {
    await postCourtRequest(url, validEstate)
      .then((res) => {
        expect(res._body.statusCode).toBe(201);
      })
  })

  test("Checking input form params", async () => {
    await postCourtRequest(url, validEstate)
      .then(async (res) => {
        const result = await parseOject(res._body);
        expect(Object.keys(result)).toEqual(
          ['_id_user',
            'estate_name',
            'location',
            'description',
            'land_size',
            'no_courts',
            'threeD_site_image',
            'twoD_site_image']
        );
      })
  })



  test("Checking missing fileds form params and return missing fileds", async () => {
    await postCourtRequest(url, {
      _id_user: 3,
      estate_name: "German",
      location: "Onitsha",
      description: "Estate construction",
      land_size: "225 X 225",
      layout_t: "https://tinyurl.com/4tkdpfs2",
      layout: "https://tinyurl.com/2pnctuym",
    })
      .then(function (res) {
        expect(res._body.message).toBe(`${res._body.data} field is missing`);
      })
  })

  test("Checking params validation and return validation message", async () => {
    await postCourtRequest(url, {
      _id_user: 3,
      estate_name: "German",
      location: "Onitsha",
      description: "Estate construction",
      land_size: "",
      no_courts: "2",
      layout_t: "https://tinyurl.com/4tkdpfs2",
      layout: "https://tinyurl.com/2pnctuym",
    })
      .then(function (res) {
        expect(res._body.message).toBe('must not be empty');
      })
  })

  test("Params saved in database", async () => {
    await postCourtRequest(url, validEstate).then(async () => {
      const data = await db.select_all('Estates');
      expect(data[0]._id_user).toBe("3");
      expect(data[0].estate_name).toBe("German");
      expect(data[0].location).toBe("Onitsha");
      expect(data[0].description).toBe("Estate construction");
      expect(data[0].no_courts).toBe(2);
      expect(data[0].layout).toBeTruthy();
      expect(data[0].layout_t).toBeTruthy();
    })
  })


})

