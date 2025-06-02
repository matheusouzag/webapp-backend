import { TransactionController } from '../../src/controllers/TransactionController';
import { TransactionService } from '../../src/services/TransactionService';
import { Request, Response } from 'express';

jest.mock('../../src/services/TransactionService');

describe('TransactionController', () => {
  let controller: TransactionController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new TransactionController();
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;
    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transaction', async () => {
    const fakeTransaction = { id: 1, type: 'credito', value: 100 };
    (TransactionService.prototype.create as jest.Mock).mockResolvedValue(fakeTransaction);

    mockReq = { body: fakeTransaction };

    await controller.create(mockReq as Request, mockRes as Response);

    expect(TransactionService.prototype.create).toHaveBeenCalledWith(fakeTransaction);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(fakeTransaction);
  });

  it('should handle create errors', async () => {
    (TransactionService.prototype.create as jest.Mock).mockRejectedValue(new Error('fail'));

    mockReq = { body: {} };

    await controller.create(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'fail' });
  });

  it('should list transactions', async () => {
    const fakeTransactions = [{ id: 1 }, { id: 2 }];
    (TransactionService.prototype.list as jest.Mock).mockResolvedValue(fakeTransactions);

    mockReq = {};

    await controller.list(mockReq as Request, mockRes as Response);

    expect(TransactionService.prototype.list).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(fakeTransactions);
  });
});
