import { UserService } from '~/user/services/user.service';
import { AnyObject } from '~/commons/typings/typescript';
import { TOKEN_SECRET } from '~/commons/config/env';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '~/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_SECRET,
    });
  }

  async validate(payload: AnyObject): Promise<UserEntity> {
    return this.userService.findOneById(payload.sub);
  }
}
