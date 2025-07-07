import { GroupHttpMapper } from './group-http.mapper';
import { Group } from '../../../domain/group';

describe('GroupHttpMapper', () => {
  it('should map Group to GroupResponseDto', () => {
    const group = {
      id: 'g1',
      name: { value: 'Test Group' },
      description: { value: 'A test group' },
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
    } as unknown as Group;
    const dto = GroupHttpMapper.toResponseDto(group);
    expect(dto).toEqual({
      id: 'g1',
      name: 'Test Group',
      description: 'A test group',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });
});
