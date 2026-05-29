export const detectDisease = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image file." });
  }

  const result = {
    diagnosis: "No visible disease detected",
    confidence: "94%",
    notes: "Upload good-quality images for better analysis. This response is a mock result and should be replaced with a real detection model later."
  };

  return res.status(200).json({
    message: "Disease check completed",
    result
  });
};
