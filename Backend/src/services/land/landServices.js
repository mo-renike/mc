const { Land, Close, Estate } = require('../../model/landModel/land');
const db = require("../../lib/database/query")
const handler = require('../../middleware/handler')
const { getImages } = require('../../../helper/imageUpload');
const { filter } = require('../../util/util')



const api_name_estate = "/api/v1/land/estate";
const api_name_court = "/api/v1/land/court";
const api_name_land = "/api/v1/land";



class LandServices {

  uploadLand = async (data, req) => {

    try {

      const {
        interest_rate,
        max_month,
        no_estates,
        land_price,
        land_name,
        _id_user
      } = data;

      const land = await db.search_one("Lands", "land_name", land_name);

      if (land.length > 0) {
        const responses = handler.returner([true, { message: "Land already exist", data: [] }], api_name_land, 201);
        return {
          status: 201,
          data: responses
        };
      };

      await Land.create({
        interest_rate,
        max_month,
        no_estates,
        land_price,
        land_name,
        _id_user
      });

      const result = {
        interest_rate,
        max_month,
        no_estates,
        land_price,
        land_name,
        _id_user
      };

      const responses = handler.returner([true, { message: "Land uploaded successfully", data: result }], api_name_land, 201);
      return {
        status: 201,
        data: responses
      };

    } catch (err) {
      const responses = handler.returner([true, { message: "Server Error", data: {} }], api_name_land, 500);
      return {
        status: 500,
        data: responses
      };

    }

  }


  uploadEstate = async (data, req) => {


    try {
      const { threeD_site_image, twoD_site_image } = getImages(req)
      const {
        _id_user,
        estate_name,
        location,
        description,
        land_size,
        no_courts,
        land_name
      } = data;

      const estate = await db.search_two("Land_Estates", "_id_user", "estate_name", _id_user, estate_name);
      const land = await db.search_two("Lands", "_id_user", "land_name", _id_user, land_name);

      if (land.length === 0) {
        const responses = handler.returner([true, { message: "Land does not exist", data: {} }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };

      }

      if (estate.length > 0) {
        const responses = handler.returner([true, { message: "Land etsate already exist", data: {} }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };

      } else {
        await Estate.create({
          _id_user,
          estate_name,
          location,
          description,
          land_name,
          land_size: land_size,
          no_courts,
          layout: threeD_site_image,
          layout_t: twoD_site_image,
        });

        const updated_data = 1;
        await db.update_one_without_2condition("Lands", `no_estates + ${updated_data}`, "no_estates", "_id_user", "land_name", _id_user, land_name);

        const result = {
          _id_user,
          estate_name,
          location,
          description,
          land_size,
          land_name,
          no_courts,
          threeD_site_image,
          twoD_site_image,
        };

        const responses = handler.returner([true, { message: "Land etsate uploaded successfully", data: result }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };
      }


    } catch (err) {

      const responses = handler.returner([true, { message: "Server Error", data: {} }], api_name_estate, 500);
      return {
        status: 500,
        data: responses
      };

    }

  }

  uploadCourt = async (data, req) => {

    try {
      const { threeD_site_image, twoD_site_image } = getImages(req)
      const {
        land_name,
        estate_name,
        description,
        close_name,
        _id_user,
        no_unit_available,
      } = data;

      const estate = await db.search_two("Land_Estates", "_id_user", "estate_name", _id_user, estate_name);
      const close = await db.search_two("Land_Closes", "_id_user", "close_name", _id_user, close_name);

      if (estate.length === 0) {
        const responses = handler.returner([true, { message: "Land estate does not exist", data: {} }], api_name_court, 400)
        return {
          status: 400,
          data: responses
        };
      }

      if (close.length > 0) {
        const responses = handler.returner([true, { message: "Land close already exist", data: {} }], api_name_court, 400)
        return {
          status: 400,
          data: responses
        };
      } else {
        await Close.create({
          land_name,
          _id_user,
          estate_name,
          description,
          close_name,
          no_unit_available,
          layout: threeD_site_image,
          layout_t: twoD_site_image,
        });

        const updated_data = 1;
        await db.update_one_without_2condition("Land_Estates", `no_courts + ${updated_data}`, "no_courts", "_id_user", "estate_name", _id_user, estate_name);

        const result = {
          land_name,
          _id_user,
          estate_name,
          description,
          close_name,
          no_unit_available,
          threeD_site_image,
          twoD_site_image,
        }

        const responses = handler.returner([true, { message: "Land close uploaded successfully", data: result }], api_name_court, 201);
        return {
          status: 201,
          data: responses
        }
      }



    } catch (err) {
      const responses = handler.returner([true, { message: "Server Error", data: {} }], api_name_court, 500)
      return {
        status: 500,
        data: responses
      }
    }
  }

  getEstates = async () => {

    try {

      let estate = await db.select_many("Land_Estates", [
        "estate_name",
        "location",
        "land_name",
        "description",
        "no_courts",
        "land_size",
        "layout",
        "layout_t"
      ]);

      let close = await db.select_many("Land_Closes", [
        "estate_name",
        "land_name",
        "description",
        "close_name",
        "no_unit_available",
        "layout",
        "layout_t"
      ]);

      let land = await db.select_many("Lands", [
        "_id_user",
        "land_price",
        "land_name",
        "no_estates"
      ]);

      if (land.length > 0) {

        let land_poniter = 0;
        let existing_lands = [];
        let formatResult = [];

        while (land_poniter < land.length) {
          existing_lands.push(land[land_poniter].land_name);
          land_poniter++;
        }


        for (let i = 0; i < existing_lands.length; i++) {

          const filterClose = filter(close, existing_lands[i], "land_name");
          const filterEstate = filter(estate, existing_lands[i], "land_name");

          const format = {
            ...land[i],
            estates: filterEstate,
            closes: filterClose
          }
          formatResult.push(format)
        };

        const responses = handler.returner([true, { message: "Lands fetched successfully", data: formatResult }], api_name_land, 201);
        return {
          status: 201,
          data: responses
        }

      } else {
        const responses = handler.returner([true, { message: "No land in database ", data: {} }], api_name_land, 201);
        return {
          status: 201,
          data: responses
        }
      }
    } catch (err) {
      const responses = handler.returner([false, { message: "Server Error", data: {} }], api_name_land, 500);
      return {
        status: 500,
        data: responses
      }

    }

  }

}

module.exports = new LandServices()
