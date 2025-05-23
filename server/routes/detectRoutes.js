const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multerConfig");
const uploadToS3 = require("../utils/s3Upload");
const User = require("../model/User");

router.post(
  "/detectcancer",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await uploadToS3(req.file);
      const imageUrl = result.Location;

      const user = await User.findById(req.userId);
      const { age, gender } = user;

      const prompt = `You are a medical assistant AI. Analyze the provided image of a skin lesion for possible signs of skin cancer. The patient is a ${age}-year-old ${gender}. Based on the image, estimate the percentage chance (from 0 to 100) that this lesion is cancerous. Only respond with the number without any explanation or extra text.`;

      const aiResponse = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout:free",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: prompt,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageUrl,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await aiResponse.json();

      const cancerChance = data?.choices?.[0]?.message?.content?.trim();

      if (!cancerChance || isNaN(cancerChance)) {
        return res
          .status(500)
          .json({ msg: "Failed to interpret AI response", raw: data });
      }

      res.status(200).json({
        success: true,
        imageUrl,
        cancerChance: parseFloat(cancerChance),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
  }
);

module.exports = router;
