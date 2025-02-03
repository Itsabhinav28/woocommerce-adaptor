const { verifySignature } = require("../utils/signatureUtils");
const config = require("../config/config");
const logger = require("../utils/logger");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["x-gateway-authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  try {
    // Extract signature parameters
    const signatureParams = {};
    authHeader.replace(/Signature\s+/i, "").split(",").forEach((param) => {
      const [key, value] = param.split("=");
      signatureParams[key.trim()] = value.replace(/"/g, "").trim();
    });

    const { keyId, algorithm, created, expires, signature } = signatureParams;

    // Verify algorithm
    if (algorithm !== "ed25519") {
      return res.status(401).json({ error: "Unsupported algorithm" });
    }

    // Verify timestamp
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < parseInt(created) || currentTime > parseInt(expires)) {
      return res.status(401).json({ error: "Signature expired or not yet valid" });
    }

    // Generate digest
    const digest = generateDigest(req.body);

    // Generate signing string
    const signingString = generateSigningString(created, expires, digest);

    // Verify signature
    const [subscriberId, uniqueKeyId] = keyId.split("|");
    const publicKey = await getPublicKeyFromRegistry(subscriberId, uniqueKeyId); // Fetch public key
    if (!verifySignature(signingString, signature, publicKey)) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    next();
  } catch (error) {
    logger.error("Error verifying signature", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch public key from ONDC Registry
const getPublicKeyFromRegistry = async (subscriberId, uniqueKeyId) => {
  try {
    const response = await axios.get(config.registry.lookup, {
      params: { subscriber_id: subscriberId, unique_key_id: uniqueKeyId },
    });

    if (response.data && response.data.signing_public_key) {
      return response.data.signing_public_key;
    } else {
      throw new Error("Public key not found in registry");
    }
  } catch (error) {
    logger.error("Error fetching public key from registry", error);
    throw new Error("Failed to fetch public key");
  }
};

module.exports = authMiddleware;