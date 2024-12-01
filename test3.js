const axios = require("axios");

async function a() {
  const search = await axios.get(
    "https://apiv2.kenliejugarap.com/music?url=https://www.youtube.com/watch?v=1x7gzFA3_Bo",
  );
  console.log(search.data);
}
a();
