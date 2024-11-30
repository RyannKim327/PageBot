const request = require("request");

const test = () => {
  request(
    "https://graph.facebook.com/v21.0/100081698814451",
    {
      access_token:
        "EAAH40A5UDrYBO6dajLUYR77GzZAXXRMmOx80RPJKg3ZBLASqNN2cnpcc6rfr616PL6EHxSZBGwZAfYl4PK7DOZBZCwuMJNZAkMc7nWt6Q4ax5W40u2ZBHudHPQ7GDZBO176L1w3vdTrVR9y3C5cugrhL2pLqGOZAWfxbnZAwmYjrUam8EpCBGbZAyPfvkYAVM4tt1a0FWz2chsdz",
    },
    (error, response, body) => {
      console.log(response);
    },
  );
};

test();
