class HealthController {
  health = (req, res) => {
    res.status(200).json({ status: "ok" });
  }
}

export const healthController = new HealthController();