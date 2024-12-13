const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Helper function untuk render dashboard kesehatan
const renderDashboard = async (
  res,
  model,
  view,
  successMessage = null,
  errorMessage = null
) => {
  try {
    const data = await model.findMany();
    res.render(view, {
      kesehatan: data,
      successMessage,
      errorMessage,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};
// Fungsi dashboard (cek session login)
exports.dashboardKesehatan = async (req, res) => {
  await renderDashboard(
    res,
    prisma.health,
    "cms/kesehatan/dashboard-kesehatan"
  );
};

exports.editKesehatan = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Mengonversi id ke integer
  try {
    // Ambil data event berdasarkan ID
    const kesehatan = await prisma.health.findUnique({
      where: { id: id },
    });
    if (kesehatan) {
      res.render("cms/kesehatan/edit-kesehatan", { kesehatan });
    } else {
      res.status(404).send("Kesehatan not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching kesehatan");
  }
};
exports.editPostKesehatan = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, descripton, link } = req.body;

  // Ambil data event berdasarkan ID
  const kesehatan = await prisma.health.findUnique({
    where: { id: id },
  });

  if (!kesehatan) {
    return res.status(404).send("Kesehatan not found");
  }

  let image = kesehatan.image;

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename; // Menyimpan nama file gambar baru
  }

  await prisma.health.update({
    where: { id: id },
    data: {
      title,
      descripton,
      image,
      link,
    },
  });

  // Menyimpan pesan sukses ke session

  await renderDashboard(
    res,
    prisma.health,
    "cms/kesehatan/dashboard-kesehatan",
    "Berhasil Edit Kesehatan"
  );
};

exports.addPostKesehatan = async (req, res) => {
  const { title, descripton, link } = req.body;

  let image = "";

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename; // Menyimpan nama file gambar baru
  }

  await prisma.health.create({
    data: {
      title,
      descripton,
      image,
      link,
    },
  });

  // Menyimpan pesan sukses ke session

  await renderDashboard(
    res,
    prisma.health,
    "cms/kesehatan/dashboard-kesehatan",
    "Berhasil Tambah Kesehatan"
  );
};
exports.deleteKesehatan = async (req, res) => {
  const eventId = parseInt(req.params.id, 10);

  try {
    // Menghapus event berdasarkan ID
    await prisma.health.delete({
      where: { id: eventId },
    });
    // Menyimpan pesan sukses ke session

    await renderDashboard(
      res,
      prisma.health,
      "cms/kesehatan/dashboard-kesehatan",
      "Berhasil Hapus Kesehatan"
    );
  } catch (error) {
    console.log(error);

    res.redirect("/dashboard-kesehatan");
  }
};
