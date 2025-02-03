const { handleSearchRequest } = require("../controllers/searchController");
const { sendAuthenticatedRequest } = require("../services/wooCommerceService");

jest.mock("../services/wooCommerceService");

describe("handleSearchRequest", () => {
  it("should process a search request successfully", async () => {
    sendAuthenticatedRequest.mockResolvedValue({ message: "Catalog data" });
    const req = { body: { context: {}, message: {} } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await handleSearchRequest(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Catalog data" });
  });
});