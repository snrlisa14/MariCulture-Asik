const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRecommendations = async (req, res) => {
  try {
    // Query untuk mendapatkan kategori dan rekomendasi terkait
    const categories = await prisma.categoryRecommend.findMany({
      include: {
        recommendations: true,
      },
    });

    // Mengirim data ke view
    res.render("rekomendasi", { categories });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getRecommendations,
};
