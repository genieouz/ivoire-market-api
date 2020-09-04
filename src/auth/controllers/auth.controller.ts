import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '~/auth/services/auth.service';
import { LoginDto } from '~/auth/dto/login.dto';
import { SessionEntity } from '~/auth/entities/session.entity';
import { RegisterDto } from '~/auth/dto/register.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() user: RegisterDto): Promise<SessionEntity> {
        return this.authService.signup(user);
    }

    @Post('signin')
    signin(@Body() credentials: LoginDto): Promise<SessionEntity> {
        return this.authService.signin(credentials);
    }
}
