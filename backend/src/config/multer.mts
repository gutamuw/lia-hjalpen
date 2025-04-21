import multer from "multer";

// Konfigurera Multer (exempel)
const storage = multer.memoryStorage(); // Använd memoryStorage för att hantera bilder som buffert
const upload = multer({ storage: storage });

export default upload;
