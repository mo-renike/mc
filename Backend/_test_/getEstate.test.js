const request = require('supertest')
const app = require('../src/api/app')
const db = require('../src/lib/database/query')
const sequelize = require('../src/lib/database/connection')
const { Estate } = require('../src/model/estate');



const validEstate = {
  _id_user: 3,
  estate_name: "German",
  location: "Onitsha",
  description: "Estate construction",
  land_size: "225 X 225",
  no_courts: 2,
  layout_t: "https://tinyurl.com/4tkdpfs2",
  layout: "https://tinyurl.com/2pnctuym",
}



beforeAll(() => {
  return sequelize.sync()
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

describe("Fetch estate available", () => {

  test("Return 200 OK for successfull fetch request", async () => {
    await request(app).get('/api/v1/section/estates')
      .query({
        page: 0,
        size: 1
      })
      .then((res) => {
        expect(res.status).toBe(201)
      })
  })

  // test("Return list of estate with page number size of pegination and total page for all estate", async () => {
  //   await request(app).get('/api/v1/land/estate')
  //     .query({
  //       page: 0,
  //       size: 1
  //     })
  //     .then(async (res) => {
  //       const result = await parseOject(res._body);
  //       expect(Object.keys(result["content"][0])).toEqual(["_id_user", "estate_name", "location", "description", "layout_t", "layout", "land_size", "no_courts"]);
  //       expect(result.page).not.toBeNull();
  //       expect(result.totalPage).not.toBeNull();
  //       expect(result.size).not.toBeNull();
  //     })
  // })

})





