const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const renderDashboard = async (
  res,
  model,
  view,
  include = {},
  successMessage = null,
  errorMessage = null
) => {
  try {
    const data = await model.findMany({ include });
    res.render(view, {
      rekomendasi: data,
      successMessage,
      errorMessage,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};

// Fungsi dashboard (cek session login)
exports.dashboardRekomendasi = async (req, res) => {
  await renderDashboard(
    res,
    prisma.recommendation,
    "cms/rekomendasi/dashboard-rekomendasi",
    { category: true }
  );
};

exports.editRekomendasi = async (req, res) => {
  const id = parseInt(req.params.id);

  // Ambil data rekomendasi dan kategori
  const rekomendasi = await prisma.recommendation.findUnique({
    where: { id },
    include: { category: true },
  });
  const categories = await prisma.categoryRecommend.findMany();

  if (!rekomendasi) {
    return res.status(404).send("Recommendation not found");
  }

  res.render("cms/rekomendasi/edit-rekomendasi", {
    rekomendasi,
    categories,
  });
};

exports.editPostRekomendasi = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, descripton, category_id, link } = req.body;

  // Ambil data rekomendasi berdasarkan ID
  const recommendation = await prisma.recommendation.findUnique({
    where: { id },
  });

  if (!recommendation) {
    return res.status(404).send("Recommendation not found");
  }

  let image = recommendation.image;

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename;
  }

  // Update data rekomendasi
  await prisma.recommendation.update({
    where: { id },
    data: {
      title,
      descripton,
      link,
      category_id: parseInt(category_id), // Pastikan category_id adalah integer
      image,
    },
  });

  await renderDashboard(
    res,
    prisma.recommendation,
    "cms/rekomendasi/dashboard-rekomendasi",
    { category: true },
    "Berhasil Edit Rekomendasi"
  );
};

exports.addPostRekomendasi = async (req, res) => {
  const { title, descripton, link, category_id } = req.body;

  let image = "";

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename; // Menyimpan nama file gambar baru
  }

  await prisma.recommendation.create({
    data: {
      title,
      descripton,
      link,
      category_id: parseInt(category_id),
      image,
    },
  });

  await renderDashboard(
    res,
    prisma.recommendation,
    "cms/rekomendasi/dashboard-rekomendasi",
    { category: true },
    "Berhasil Tambah Rekomendasi"
  );
};
exports.deleteRekomendasi = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    // Menghapus event berdasarkan ID
    await prisma.recommendation.delete({
      where: { id: id },
    });
    await renderDashboard(
      res,
      prisma.recommendation,
      "cms/rekomendasi/dashboard-rekomendasi",
      { category: true },
      "Berhasil Delete Rekomendasi"
    );
  } catch (error) {
    console.log(error);

    res.redirect("/dashboard-rekomendasi");
  }
};
