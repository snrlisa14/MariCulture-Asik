const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi helper untuk render dashboard akuakultur
const renderDashboardAkuakultur = async (
  res,
  successMessage = null,
  errorMessage = null
) => {
  try {
    const akuakultur = await prisma.akuakultur.findMany();
    res.render("cms/akuakultur/dashboard-akuakultur", {
      akuakultur,
      successMessage,
      errorMessage,
    });
  } catch (error) {
    console.error("Error fetching akuakultur data:", error);
    res.status(500).send("Error fetching data");
  }
};

// Fungsi dashboard (cek session login)
exports.dashboardAkuakultur = async (req, res) => {
  await renderDashboardAkuakultur(res);
};

exports.editPostAkuakultur = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, descripton } = req.body;

  // Ambil data event berdasarkan ID
  const akuakultur = await prisma.akuakultur.findUnique({
    where: { id: id },
  });

  if (!akuakultur) {
    return res.status(404).send("Akuakultur not found");
  }

  let image = akuakultur.image;

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename; // Menyimpan nama file gambar baru
  }

  await prisma.akuakultur.update({
    where: { id: id },
    data: {
      title,
      descripton,
      image,
    },
  });

  await renderDashboardAkuakultur(res, "Berhasil Edit Akuakultur");
};

exports.editAkuakultur = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Mengonversi id ke integer
  try {
    const akuakultur = await prisma.akuakultur.findUnique({
      where: { id: id },
    });
    if (akuakultur) {
      res.render("cms/akuakultur/edit-akuakultur", { akuakultur });
    } else {
      res.status(404).send("Akuakultur not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching Akuakultur");
  }
};

exports.addPostAkuakultur = async (req, res) => {
  const { title, descripton } = req.body;

  let image = "";

  // Jika ada gambar baru yang diupload
  if (req.file) {
    image = req.file.filename; // Menyimpan nama file gambar baru
  }

  await prisma.akuakultur.create({
    data: {
      title,
      descripton,
      image,
    },
  });

  // Menyimpan pesan sukses ke session
  await renderDashboardAkuakultur(res, "Berhasil Tambah Akuakultur");
};
exports.deleteAkuakultur = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    // Menghapus event berdasarkan ID
    await prisma.akuakultur.delete({
      where: { id: id },
    });
    // Menyimpan pesan sukses ke session
    await renderDashboardAkuakultur(res, "Berhasil Menghapus Akuakultur");
  } catch (error) {
    console.log(error);

    res.redirect("/dashboard-akuakultur");
  }
};
