const authMiddleware = require("../middlewares/authMiddleware");
const { verifySignature } = require("../utils/signatureUtils");

jest.mock("../utils/signatureUtils");

describe("authMiddleware", () => {
  it("should verify a valid signature", async () => {
    verifySignature.mockReturnValue(true);
    const req = {
      headers: {
        authorization: 'Signature keyId="example-bap.com|bap1234|ed25519",algorithm="ed25519",created="1641287875",expires="1641291475",headers="(created)(expires)digest",signature="validSignature"',
      },
      body: { context: { domain: "nic2004:60212" } },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});