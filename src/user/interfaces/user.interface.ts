import { UserGender } from '~/user/enums/user-gender';
import { UserRoles } from '~/user/enums/user-roles.enum';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';
import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  countryCode: string;
  role: UserRoles;
  gender?: UserGender;
  birthDate?: Date;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  password: string;
  email: string;
  avatar: ImageSizes;
  city: string;
  district: string;
}