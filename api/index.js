const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const number = req.query.number;

    if (!number) {
      return res.send("❌ Please provide ?number= parameter");
    }

    // ---- CHANGE THIS ONLY ↓ (YOUR API LINK) ----
    const api = `https://ox-tawny.vercel.app/search_mobile?mobile=${number}&api_key=gavrawrand`;
    // --------------------------------------------

    const result = await axios.get(api);
    const data = result.data.data;

    if (!data || data.length === 0) {
      return res.send(`📱 Number: *${number}*\n❌ No data found!`);
    }

    // DESIGN OUTPUT
    let finalOutput = `✨ *Mobile Information Found Successfully*\n\n📱 Number: *${number}*\n🔢 Total Records: *${data.length}*\n\n`;

    data.forEach((item, index) => {
      finalOutput += `━━━━━━━━━━━━━━━━━━\n`;
      finalOutput += `🆔 Record: *${index + 1}*\n`;
      finalOutput += `📞 Mobile: ${item["📞 Mobile"] || "N/A"}\n`;
      finalOutput += `👤 Name: ${item["👤 Name"] || "Not Available"}\n`;
      finalOutput += `🧾 Father Name: ${item["🧾 Father Name"] || "N/A"}\n`;
      finalOutput += `🌍 Circle: ${item["🌍 Circle"] || "Unknown"}\n`;
      finalOutput += `📌 Address: ${item["📌 Address"]?.trim() || "Not Provided"}\n`;
      finalOutput += `☎️ Alternate No: ${item["☎️ Alternate No"] || "None"}\n`;
      finalOutput += `━━━━━━━━━━━━━━━━━━\n\n`;
    });

    finalOutput += `👨‍💻 Developer: *🚀 Pravin Mishra*`;

    res.send(finalOutput);

  } catch (err) {
    res.send(`❌ API Error!\n\n${err.message}`);
  }
};
