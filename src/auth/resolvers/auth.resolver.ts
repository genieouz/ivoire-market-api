import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "~/user/services/user.service";
import { LoginDto } from "~/auth/dto/login.dto";
import { RegisterDto } from "~/auth/dto/register.dto";
import { SessionEntity } from "~/auth/entities/session.entity";
import { AuthService } from "~/auth/services/auth.service";
import { UserRoles } from "~/user/enums/user-roles.enum";
import { TokenService } from "~/auth/services/token.service";
import { NotFoundException } from "@nestjs/common";
import { UpdatePasswordDto } from "../dto/update-password.dto";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    @Query(returns => SessionEntity)
    login(
        @Args({ name: 'loginInput', type: () => LoginDto }) loginInput: LoginDto
    ): Promise<SessionEntity> {
        return this.authService.signin({ role: UserRoles.USER, ...loginInput });
    }

    @Mutation(returns => SessionEntity)
    register(
        @Args({ name: 'registerInput', type: () => RegisterDto }) registerDto: RegisterDto
    ): Promise<SessionEntity> {
        return this.authService.signup({ role: UserRoles.USER, ...registerDto }); 
    }

    @Query(returns => String)
    async resetPassword(
        @Args({ name: 'email', type: () => String }) email: string,
    ): Promise<string> {
        await this.userService.findOneOrFail({ email });
        return this.authService.sendResetPasswordEmail(email);
    }

    @Mutation(returns => Boolean)
    async updatePassword(
        @Args({ name: 'updatePasswordDto', type: () => UpdatePasswordDto }) updatePasswordDto: UpdatePasswordDto,
    ): Promise<boolean> {
        const payload = this.tokenService.verify(updatePasswordDto.resetToken);
        console.log(payload)
        if(!payload || payload.sub.code !== updatePasswordDto.resetCode) {
            throw new NotFoundException('Token expiré');
        } else {
            const user  = await this.userService.findOneOrFail({ email: payload.sub.email });
            await this.userService.updateOneById(user._id, { password: updatePasswordDto.password });
        }
        return true; 
    }

}