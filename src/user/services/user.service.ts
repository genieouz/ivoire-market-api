import { userModelName } from '~/user/user.model-name';
import { IUser } from '~/user/interfaces/user.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '~/commons/services/abstract.service';
import { UserEntity } from '~/user/entities/user.entity';

@Injectable()
export class UserService extends AbstractService<UserEntity> {
    constructor(
        @InjectModel(userModelName) private readonly userModel: Model<IUser>,
    ) {
        super(userModel);
    }
}
