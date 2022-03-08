const { Terrace, Court, Estate } = require('../../model/terraceModel/terrace');
const db = require("../../lib/database/query")
const handler = require('../../middleware/handler')
const { getImages } = require('../../../helper/imageUpload');
const { filter } = require('../../util/util')



const api_name_estate = "/api/v1/terrace/estate";
const api_name_court = "/api/v1/terrace/court";
const api_name_terraces = "/api/v1/terraces";



class TerraceServices {

  uploadTerrace = async (data, req) => {

    try {

      const {
        terrace_name,
        terrace_price,
        max_month,
        _id_user,
        no_estates,
        interest_rate,
      } = data;

      const terrace = await db.search_one("Terraces", "terrace_name", terrace_name);

      if (terrace.length > 0) {
        const responses = handler.returner([true, { message: "Terrace already exist", data: [] }], api_name_terraces, 201);
        return {
          status: 201,
          data: responses
        };
      };

      await Terrace.create({
        terrace_name,
        terrace_price,
        max_month,
        _id_user,
        no_estates,
        interest_rate,
      });

      const result = {
        terrace_name,
        terrace_price,
        max_month,
        _id_user,
        no_estates,
        interest_rate,
      };

      const responses = handler.returner([true, { message: "Terrace uploaded successfully", data: result }], api_name_terraces, 201);
      return {
        status: 201,
        data: responses
      };

    } catch (err) {
      const responses = handler.returner([true, { message: "Server Error", data: [] }], api_name_terraces, 500);
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
        terrace_name,
        _id_user,
        estate_name,
        location,
        description,
        land_size,
        no_courts,
      } = data;

      const estate = await db.search_two("Terrace_Estates", "_id_user", "estate_name", _id_user, estate_name);
      const terrace = await db.search_two("Terraces", "_id_user", "terrace_name", _id_user, terrace_name);

      if (terrace.length === 0) {
        const responses = handler.returner([true, { message: "Terrace does not exist", data: [] }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };
      }

      if (estate.length > 0) {
        const responses = handler.returner([true, { message: "Terrace etsate already exist", data: [] }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };
      } else {
        await Estate.create({
          terrace_name,
          _id_user,
          estate_name,
          location,
          description,
          land_size: land_size,
          no_courts,
          layout: threeD_site_image,
          layout_t: twoD_site_image,
        });

        const updated_data = 1;
        await db.update_one_without_2condition("Terraces", `no_estates + ${updated_data}`, "no_estates", "_id_user", "terrace_name", _id_user, terrace_name);

        const result = {
          terrace_name,
          _id_user,
          estate_name,
          location,
          description,
          land_size,
          no_courts,
          threeD_site_image,
          twoD_site_image,
        };

        const responses = handler.returner([true, { message: "Terrace etsate uploaded successfully", data: result }], api_name_estate, 201);
        return {
          status: 201,
          data: responses
        };
      }

    } catch (err) {
      const responses = handler.returner([true, { message: "Server Error", data: [] }], api_name_estate, 500);
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
        terrace_name,
        estate_name,
        description,
        court_name,
        _id_user,
        no_unit_available,
      } = data;

      const estate = await db.search_two("Terrace_Estates", "_id_user", "estate_name", _id_user, estate_name);
      const court = await db.search_two("Terrace_Courts", "_id_user", "court_name", _id_user, court_name);

      if (estate.length === 0) {
        const responses = handler.returner([true, { message: "estate does not exist", data: [] }], api_name_court, 400)
        return {
          status: 400,
          data: responses
        };
      }

      if (court.length > 0) {
        const responses = handler.returner([true, { message: "court already exist", data: [] }], api_name_court, 400)
        return {
          status: 400,
          data: responses
        };
      } else {
        await Court.create({
          terrace_name,
          _id_user,
          estate_name,
          description,
          court_name,
          no_unit_available,
          layout: threeD_site_image,
          layout_t: twoD_site_image,
        });

        const updated_data = 1;
        await db.update_one_without_2condition("Terrace_Estates", `no_courts + ${updated_data}`, "no_courts", "_id_user", "estate_name", _id_user, estate_name);

        const result = {
          terrace_name,
          _id_user,
          estate_name,
          description,
          court_name,
          no_unit_available,
          threeD_site_image,
          twoD_site_image,
        }

        const responses = handler.returner([true, { message: "Terrace court uploaded successfully", data: result }], api_name_court, 201);
        return {
          status: 201,
          data: responses
        }
      }



    } catch (err) {
      const responses = handler.returner([true, { message: "Server Error", data: [] }], api_name_court, 500)
      return {
        status: 500,
        data: responses
      }
    }
  }

  getEstates = async () => {


    try {

      let estate = await db.select_many("Terrace_Estates", [
        "estate_name",
        "terrace_name",
        "description",
        "estate_name",
        "location",
        "land_size",
        "no_courts",
        "layout",
        "layout_t"
      ]);

      let court = await db.select_many("Terrace_Courts", [
        [
          "estate_name",
          "terrace_name",
          "description",
          "court_name",
          "no_unit_available",
          "layout",
          "layout_t"
        ]
      ]);

      let terrace = await db.select_many("Terraces",
        [
          "terrace_price",
          "_id_user",
          "terrace_name",
          "no_estates"
        ]
      );

      if (estate.length > 0) {

        let terrace_poniter = 0;
        let existing_terraces = [];
        let formatResult = [];

        while (terrace_poniter < terrace.length) {
          existing_terraces.push(terrace[terrace_poniter].terrace_name);
          terrace_poniter++;
        }


        for (let i = 0; i < existing_terraces.length; i++) {

          const filterCourts = filter(court, existing_terraces[i], "terrace_name");
          const filterEstate = filter(estate, existing_terraces[i], "terrace_name");

          const format = {
            ...terrace[i],
            estates: filterEstate,
            courts: filterCourts
          }
          formatResult.push(format)
        };

        const responses = handler.returner([true, { message: "Terraces fetched successfully", data: formatResult }], api_name_terraces, 201);
        return {
          status: 201,
          data: responses
        }

      } else {
        const responses = handler.returner([true, { message: "No terrace in  database ", data: [] }], api_name_terraces, 201);
        return {
          status: 201,
          data: responses
        }
      }
    } catch (err) {
      const responses = handler.returner([false, { message: "Server Error", data: [] }], api_name_terraces, 500);
      return {
        status: 500,
        data: responses
      }

    }
  }

}

module.exports = new TerraceServices()
