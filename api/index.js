const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const number = req.query.number;

    if (!number) {
      return res.json({
        status: false,
        message: "❌ Please provide ?number=mobile_number",
      });
    }

    const api = `https://ox-tawny.vercel.app/search_mobile?mobile=${number}&api_key=gavrawrand`;
    const result = await axios.get(api);

    const data = result.data.data?.map((item) => ({
      "📞 Mobile": item.mobile || "N/A",
      "👤 Name": item.name || "N/A",
      "🧾 Father Name": item.fname || "N/A",
      "🌍 Circle": item.circle || "N/A",
      "📌 Address": item.address?.replace(/!/g, " ") || "N/A",
      "☎️ Alternate No": item.alt || "N/A",
    }));

    res.json({
      status: true,
      number,
      count: data.length,
      data,
      developer: "🚀 Pravin Mishra",
      message: "✨ Data fetched successfully"
    });

  } catch (err) {
    res.json({
      status: false,
      message: "⚠️ API Error",
      error: err.message,
    });
  }
};
