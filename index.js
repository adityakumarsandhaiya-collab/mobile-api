const axios = require("axios");

module.exports = async (req, res) => {
  const number = req.query.number;
  if (!number) {
    return res.json({
      status: false,
      message: "Please provide ?number=",
    });
  }

  const api = `https://ox-tawny.vercel.app/search_mobile?mobile=${number}&api_key=gavrawrand`;
  const result = await axios.get(api);

  res.json({
    status: true,
    number: number,
    data: result.data,
    developer: "Your Name",
  });
};
