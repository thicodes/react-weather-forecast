const app = require("express")();
const fetch = require("node-fetch");

app.get("/api/search-geocode/:address", async (req, res) => {
  try {
    const response = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${req.params.address}&benchmark=2020&format=json`
    ).then(async (response) => await response.json());
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(4000);

module.exports = app;
