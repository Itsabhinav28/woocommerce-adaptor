const { generateDigest, generateSigningString, sign, verifySignature } = require("../utils/signatureUtils");

describe("signatureUtils", () => {
  it("should generate a valid BLAKE-512 digest", () => {
    const digest = generateDigest({ context: { domain: "nic2004:60212" } });
    expect(digest).toBeDefined();
  });

  it("should generate a valid signing string", () => {
    const signingString = generateSigningString(1641287875, 1641291475, "digestValue");
    expect(signingString).toBe("(created): 1641287875\n(expires): 1641291475\ndigest: BLAKE-512=digestValue");
  });
});