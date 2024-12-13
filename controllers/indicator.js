const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCheckEnvirontment = async (req, res) => {
  const { temperature, salinity, oxygen, fishId } = req.body;

  // Ambil data indikator lingkungan untuk ikan yang dipilih
  const indicator = await prisma.indicatorEnvironment.findFirst({
    where: { fish_id: fishId },
  });

  if (!indicator) {
    return res.json({
      message: "Data indikator lingkungan tidak ditemukan untuk ikan ini.",
    });
  }

  // Array untuk menyimpan pesan kesalahan atau ketidaksesuaian
  let messages = [];

  // Validasi kondisi lingkungan
  if (
    temperature < indicator.temperature_from ||
    temperature > indicator.temperature_until
  ) {
    messages.push(
      `Suhu tidak sesuai. Rekomendasi: Jaga suhu antara ${indicator.temperature_from}°C - ${indicator.temperature_until}°C.`
    );
  }

  if (
    salinity < indicator.salinity_from ||
    salinity > indicator.salinity_until
  ) {
    messages.push(
      `Salinitas tidak sesuai. Rekomendasi: Jaga salinitas antara ${indicator.salinity_from} - ${indicator.salinity_until}.`
    );
  }

  if (oxygen < indicator.oxygen_from || oxygen > indicator.oxygen_until) {
    messages.push(
      `Kadar oksigen tidak sesuai. Rekomendasi: Jaga kadar oksigen antara ${indicator.oxygen_from} - ${indicator.oxygen_until}.`
    );
  }

  // Jika tidak ada pesan kesalahan, berarti semua sesuai
  if (messages.length === 0) {
    messages.push(`Kondisi lingkungan sesuai untuk ikan ini.`);
  }

  // Mengirim array pesan sebagai response
  res.json({ messages });
};

module.exports = {
  getCheckEnvirontment,
};
