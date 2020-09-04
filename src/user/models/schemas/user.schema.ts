import { UserGender } from '~/user/enums/user-gender';
import { UserRoles } from '~/user/enums/user-roles.enum';
import { Schema } from 'mongoose';
import { imageSizesNestedObject } from '~/commons/database/field-types/image-size-refs-hash.type';
import { InternalRole } from '~/user/enums/internal-role.enum';
import { UserState } from '~/user/enums/user-state.enum';

export const UserSchema = new Schema({
  phoneNumber: {
    type: Number,
  },
  countryCode: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: UserGender,
  },
  birthDate: {
    type: Date,
  },
  role: {
    type: String,
    default: UserRoles.ORGANIZER,
  },
  internalRole: {
    type: String,
    enum: Object.keys(InternalRole),
    default: InternalRole.STANDARD,
  },
  state: {
    type: String,
    enum: Object.keys(UserState),
    default: UserState.FONCTIONNAL,
  },
  avatar: imageSizesNestedObject, 
  city: {
    type: String,
  },
  district: {
    type: String,
  },
}, { timestamps: true });
