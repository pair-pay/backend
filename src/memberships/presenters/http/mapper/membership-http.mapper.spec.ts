import { MembershipHttpMapper } from './membership-http.mapper';
import { Membership } from '../../../domain/entities/membership.entity';

describe('MembershipHttpMapper', () => {
  it('should map Membership to MembershipResponseDto', () => {
    const membership = new Membership(
      'm1',
      'g1',
      'u1',
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const dto = MembershipHttpMapper.toResponseDto(membership);
    expect(dto).toEqual({
      id: 'm1',
      groupId: 'g1',
      userId: 'u1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });
});
