import { AccountController } from '../../src/controllers/AccountController';
import { AccountService } from '../../src/services/AccountService';
import { Request, Response } from 'express';

jest.mock('../../src/services/AccountService');

describe('AccountController', () => {
  let controller: AccountController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new AccountController();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn(() => mockRes) as any;

    mockRes = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new account', async () => {
    const fakeAccount = { id: 1, name: 'Test', type: 'Corrente', balance: 100 };
    (AccountService.prototype.create as jest.Mock).mockResolvedValue(fakeAccount);

    mockReq = { body: fakeAccount };

    await controller.create(mockReq as Request, mockRes as Response);

    expect(AccountService.prototype.create).toHaveBeenCalledWith(fakeAccount);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(fakeAccount);
  });

  it('should handle create errors', async () => {
    (AccountService.prototype.create as jest.Mock).mockRejectedValue(new Error('fail'));

    mockReq = { body: {} };

    await controller.create(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'fail' });
  });

  it('should list accounts', async () => {
    const fakeAccounts = [{ id: 1 }, { id: 2 }];
    (AccountService.prototype.list as jest.Mock).mockResolvedValue(fakeAccounts);

    mockReq = {};

    await controller.list(mockReq as Request, mockRes as Response);

    expect(AccountService.prototype.list).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(fakeAccounts);
  });

  it('should update account', async () => {
    const updated = { id: 1, name: 'Updated' };
    (AccountService.prototype.update as jest.Mock).mockResolvedValue(updated);

    mockReq = { params: { id: '1' }, body: { name: 'Updated' } };

    await controller.update(mockReq as Request, mockRes as Response);

    expect(AccountService.prototype.update).toHaveBeenCalledWith(1, { name: 'Updated' });
    expect(jsonMock).toHaveBeenCalledWith(updated);
  });

  it('should delete account', async () => {
    (AccountService.prototype.delete as jest.Mock).mockResolvedValue(undefined);

    mockReq = { params: { id: '1' } };

    await controller.delete(mockReq as Request, mockRes as Response);

    expect(AccountService.prototype.delete).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(204);
    expect(sendMock).toHaveBeenCalled();
  });
});
