
import { mockSingleUser } from "../mocks/reels.mocks";
import ReelsService from "../../../src/modules/reels/services";
import ReelsRepository from "../../../src/modules/reels/repositories";


jest.mock('../../../src/modules/reels/repositories');

describe("ReelsService", () => {
    let reelsService: ReelsService;
    let reelsRepositoryMock: jest.Mocked<ReelsRepository>;


    beforeEach(() => {
        reelsRepositoryMock = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<ReelsRepository>;
        reelsService = new ReelsService({ reelsRepository: reelsRepositoryMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('It Should successfull upload message with status code 200', async () => {
        const payload = {};

        reelsRepositoryMock.insertOne.mockResolvedValue(mockSingleUser);

        const result = await reelsService.upload(payload);

        expect(result?.data).toEqual(mockSingleUser);
        expect(result?.error).toBeNull();
    });
});