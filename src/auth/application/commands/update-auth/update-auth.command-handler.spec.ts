import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateAuthCommandHandler } from './update-auth.command-handler';
import { AuthRepository } from '../../ports/auth.repository';
import { UpdateAuthCommand } from './update-auth.command';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthPasswordValueObject } from 'src/auth/domain/value-objects/auth-password/auth-password.value-object';
import { InvalidPasswordException } from 'src/auth/domain/exceptions/invalid-password.exception';
import { EventBus } from '@nestjs/cqrs';

// Mock del repositorio
const mockAuthRepository = () => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
});

describe('UpdateAuthCommandHandler', () => {
  let handler: UpdateAuthCommandHandler;
  let repository: jest.Mocked<AuthRepository>;
  let eventBus: EventBus;
  let mockAuth: Auth;
  let updatedAuth: Auth;

  beforeEach(() => {
    repository = mockAuthRepository() as any;
    eventBus = { publish: jest.fn() } as any;
    handler = new UpdateAuthCommandHandler(repository, eventBus);
    // Mock básico de Auth
    mockAuth = {
      id: '1',
      email: 'old@mail.com',
      password: 'hashed',
      accessToken: 'token',
      refreshToken: 'refresh',
      isActive: true,
      role: 'user',
      update: jest.fn(),
      equals: jest.fn(),
    } as any;
    updatedAuth = { ...mockAuth, role: 'admin', equals: jest.fn() } as any;
  });

  /**
   * Debe actualizar un campo correctamente y emitir el evento
   */
  it('should update a field, call update and publish event', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    (mockAuth.update as jest.Mock).mockReturnValue(updatedAuth);
    (updatedAuth.equals as jest.Mock).mockReturnValue(false);
    repository.update.mockResolvedValue(undefined);
    const command = new UpdateAuthCommand('1', { role: 'admin' });

    const result = await handler.execute(command);
    expect(repository.findById).toHaveBeenCalledWith('1');
    expect(mockAuth.update).toHaveBeenCalledWith({ role: 'admin' });
    expect(repository.update).toHaveBeenCalledWith(updatedAuth);
    expect(eventBus.publish).toHaveBeenCalled();
    expect(result).toBe(updatedAuth);
  });

  /**
   * Debe actualizar la password correctamente si es válida
   */
  it('should update password if valid', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    const updated = {
      ...mockAuth,
      password: 'hashedNew',
      equals: jest.fn().mockReturnValue(false),
    } as any;
    (mockAuth.update as jest.Mock).mockReturnValue(updated);
    (updated.equals as jest.Mock).mockReturnValue(false);
    repository.update.mockResolvedValue(undefined);
    const validPassword = 'ValidPassword!123';
    const command = new UpdateAuthCommand('1', { password: validPassword });
    jest
      .spyOn(AuthPasswordValueObject, 'fromPlain')
      .mockResolvedValue({ value: 'hashedNew' } as any);

    const result = await handler.execute(command);
    expect(repository.update).toHaveBeenCalledWith(updated);
    expect(eventBus.publish).toHaveBeenCalled();
    expect(result.password).toBe('hashedNew');
  });

  /**
   * No debe permitir cambiar el email a uno ya existente
   */
  it('should throw ConflictException if email already exists', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    repository.findByEmail.mockResolvedValue({
      id: '2',
      email: 'new@mail.com',
    } as any);
    (mockAuth.update as jest.Mock).mockReturnValue({
      ...mockAuth,
      email: 'new@mail.com',
      equals: jest.fn().mockReturnValue(false),
    });
    const command = new UpdateAuthCommand('1', { email: 'new@mail.com' });

    // Simula la lógica de validación de email en el handler real si la tienes
    await expect(handler.execute(command)).rejects.toThrow(ConflictException);
  });

  /**
   * Debe lanzar error si la password es inválida
   */
  it('should throw InvalidPasswordException if password is invalid', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    const invalidPassword = 'short';
    const command = new UpdateAuthCommand('1', { password: invalidPassword });
    jest.spyOn(AuthPasswordValueObject, 'fromPlain').mockImplementation(() => {
      throw new InvalidPasswordException('Password too short');
    });
    (mockAuth.update as jest.Mock).mockImplementation(() => {
      throw new InvalidPasswordException('Password too short');
    });

    await expect(handler.execute(command)).rejects.toThrow(
      InvalidPasswordException,
    );
  });

  /**
   * Debe lanzar NotFoundException si el Auth no existe
   */
  it('should throw NotFoundException if auth not found', async () => {
    repository.findById.mockResolvedValue(null);
    const command = new UpdateAuthCommand('1', { role: 'admin' });
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  /**
   * Si no hay cambios, debe devolver el Auth original y no llamar a update ni a publish
   */
  it('should return original Auth if no changes (equals returns true)', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    (mockAuth.update as jest.Mock).mockReturnValue(mockAuth);
    (mockAuth.equals as jest.Mock).mockReturnValue(true);
    const command = new UpdateAuthCommand('1', {});
    const result = await handler.execute(command);
    expect(repository.update).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
    expect(result).toBe(mockAuth);
  });

  /**
   * Debe actualizar varios campos a la vez
   */
  it('should update multiple fields', async () => {
    repository.findById.mockResolvedValue(mockAuth);
    const updated = {
      ...mockAuth,
      role: 'admin',
      isActive: false,
      equals: jest.fn().mockReturnValue(false),
    } as any;
    (mockAuth.update as jest.Mock).mockReturnValue(updated);
    (updated.equals as jest.Mock).mockReturnValue(false);
    repository.update.mockResolvedValue(undefined);
    const command = new UpdateAuthCommand('1', {
      role: 'admin',
      isActive: false,
    });
    const result = await handler.execute(command);
    expect(repository.update).toHaveBeenCalledWith(updated);
    expect(eventBus.publish).toHaveBeenCalled();
    expect(result.role).toBe('admin');
    expect(result.isActive).toBe(false);
  });
});
