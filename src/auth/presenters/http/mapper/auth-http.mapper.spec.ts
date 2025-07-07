import { AuthHttpMapper } from './auth-http.mapper';
import { Auth } from 'src/auth/domain/auth';
import { User } from 'src/user/domain/entities/user.entity';
import { NameValueObject } from 'src/user/domain/value-objects/name.value-object';

describe('AuthHttpMapper', () => {
  it('should map Auth to AuthResponseDto', () => {
    const auth = {
      id: 'a1',
      userId: 'u1',
      email: { value: 'test@example.com' },
      refreshToken: { value: 'refresh-token' },
      firstLogin: new Date('2023-01-01T00:00:00.000Z'),
      lastLogin: new Date('2023-01-02T00:00:00.000Z'),
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
    } as unknown as Auth;
    const dto = AuthHttpMapper.toResponseDto(auth);
    expect(dto).toEqual({
      id: 'a1',
      userId: 'u1',
      email: 'test@example.com',
      refreshToken: 'refresh-token',
      firstLogin: '2023-01-01T00:00:00.000Z',
      lastLogin: '2023-01-02T00:00:00.000Z',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });

  it('should map Auth and User to LoginResponseDto', () => {
    const auth = {
      id: 'a1',
      userId: 'u1',
      email: { value: 'test@example.com' },
      refreshToken: { value: 'refresh-token' },
      firstLogin: new Date('2023-01-01T00:00:00.000Z'),
      lastLogin: new Date('2023-01-02T00:00:00.000Z'),
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
    } as unknown as Auth;
    const user = new User(
      'u1',
      new NameValueObject('Test User'),
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const dto = AuthHttpMapper.toLoginResponseDto(auth, user);
    expect(dto).toMatchObject({
      id: 'a1',
      userId: 'u1',
      email: 'test@example.com',
      refreshToken: 'refresh-token',
      firstLogin: '2023-01-01T00:00:00.000Z',
      lastLogin: '2023-01-02T00:00:00.000Z',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      user: expect.objectContaining({
        id: 'u1',
        name: 'test user',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      }),
    });
  });

  it('should map accessToken and refreshToken to RefreshTokenResponseDto', () => {
    const dto = AuthHttpMapper.toRefreshTokenResponseDto('access', 'refresh');
    expect(dto).toEqual({ accessToken: 'access', refreshToken: 'refresh' });
  });
});
