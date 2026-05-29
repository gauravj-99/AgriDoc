export const statusHandler = (req, res) => {
  res.json({ status: "ok", message: "AgriDoc backend is running" });
};
