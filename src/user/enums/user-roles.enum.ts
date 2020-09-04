import { registerEnumType } from 'type-graphql';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER'
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});