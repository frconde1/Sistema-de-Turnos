class HealthController {
  health = (req, res) => {
    res.status(200).json({ statuss: "ok" });
  }
}

export const healthController = new HealthController();