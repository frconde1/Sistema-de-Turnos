class HealthController {
  health = (req, res) => {
    res.status(200).json({ statusss: "ok" });
  }
}

export const healthController = new HealthController();