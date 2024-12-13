const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.identifikasiPost = async (req, res) => {
  const { fish_id, age } = req.body;
  console.log(req.body);

  try {
    // Menggunakan Prisma untuk query data dari tabel `IndicatorFood`
    const indicators = await prisma.indicatorFood.findMany({
      where: {
        fish_id: parseInt(fish_id), // pastikan fish_id berupa integer
        age_from: { lte: parseInt(age) }, // umur lebih besar atau sama dengan age_from
        age_until: { gte: parseInt(age) }, // umur lebih kecil atau sama dengan age_until
      },
      select: {
        name: true, // memilih hanya field 'name' untuk dikembalikan
      },
    });

    // Jika tidak ada data yang ditemukan
    if (indicators.length === 0) {
      return res.json({
        success: false,
        message: "Data tidak ditemukan untuk umur tersebut",
        data: [],
      });
    }

    // Mengembalikan respons JSON dengan data yang ditemukan
    return res.json({
      success: true,
      message: "Data ditemukan",
      data: indicators,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
