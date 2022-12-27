require("dotenv").config();
const { default: axios } = require("axios");
const { config } = require("dotenv");
const nodeCron = require("cron").CronJob;

var request = require("request");
require("https");

const { readData } = require("./gs_funcs");

const { getInavData } = require('./inavFetcher');

var job = new nodeCron("45 8 * * 1-5", async function getData() {
  const filters = [{ filterType: "simple" }];
  config.eodData = await readData(
    "iifl_data_mapping",
    filters,
    process.env.CRUD_MICROSERVICE_URL
  );
  //console.log(config.eodData)

  const response = await getInavData(config.eodData)
  console.log(response)

  let data = {
    type: "iifl_data_mapping",
    data: response
  }
  data = JSON.stringify(data)
  const res = await axios.post(process.env.UPDATE_DATA_URL, data)
},null,true,'Asia/Kolkata')

job.start()

