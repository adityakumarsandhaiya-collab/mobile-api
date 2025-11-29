const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const number = req.query.number;

    if (!number) {
      return res.send("❌ Please provide ?number= parameter");
    }

    // 👉 Change API only here
    const api = `https://ox-tawny.vercel.app/search_mobile?mobile=${number}&api_key=gavrawrand`;
    // OR any other API that returns JSON with data array

    const resp = await axios.get(api);

    const data = resp.data.data || resp.data || [];

    if (!Array.isArray(data) || data.length === 0) {
      return res.send(`📱 Number: *${number}*\n❌ No records found!`);
    }

    let final = `✨ *Mobile Information Search Result*\n\n📱 Number: *${number}*\n📊 Total Records: *${data.length}*\n\n`;

    data.forEach((record, i) => {
      final += `━━━━━━━━━━━━━━━━━━\n`;
      final += `🆔 Record: *${i + 1}*\n`;

      Object.keys(record).forEach(key => {
        final += `${key}: ${record[key] || "N/A"}\n`;
      });

      final += `━━━━━━━━━━━━━━━━━━\n\n`;
    });

    final += `👨‍💻 Developer: *🚀 Pravin Mishra*`;

    res.send(final);

  } catch (error) {
    res.send(`❌ API Error!\n\n${error.message}`);
  }
};
