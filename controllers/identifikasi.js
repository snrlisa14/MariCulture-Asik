const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi dashboard (cek session login)
exports.identifikasiPost = async (req, res) => {
  const selectedSymptomIds = req.body.symptoms; // Gejala yang dipilih
  try {
    // Cari penyakit yang berhubungan dengan gejala yang dipilih
    const diseases = await prisma.disease.findMany({
      where: {
        symptoms: {
          some: {
            id: {
              in: selectedSymptomIds.map((id) => parseInt(id)), // Pastikan id gejala yang dipilih dalam format integer
            },
          },
        },
      },
      include: {
        symptoms: true,
        causes: true,
        treatments: true,
      },
    });

    // Jika tidak ada penyakit yang cocok, tampilkan pesan
    if (diseases.length === 0) {
      res.render("hasil-identifikasi", {
        errorMessage: "Tidak ada penyakit yang cocok dengan gejala tersebut.",
        selectedSymptoms: selectedSymptomIds, // Pass the selected symptoms even if no diseases are found
      });
    } else {
      // Mendapatkan nama gejala berdasarkan ID yang dipilih
      const selectedSymptoms = await prisma.symptom.findMany({
        where: {
          id: {
            in: selectedSymptomIds.map((id) => parseInt(id)),
          },
        },
      });

      // Render halaman dengan hasil identifikasi dan gejala yang dipilih
      res.render("hasil-identifikasi", {
        diseases,
        selectedSymptoms, // Pass the full symptom details (names) to the template
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during disease identification.");
  }
};
