import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CurrentUser } from "~/auth/decorators/current-user.decorator";
import { IUser } from "../interfaces/user.interface";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "~/auth/guards/auth-guard";
import { UserEntity } from "~/user/entities/user.entity";
import { UsersEntity } from "../entities/users.entity";
import { UserService } from "../services/user.service";
import { UserRoles } from "../enums/user-roles.enum";
import { UserState } from "../enums/user-state.enum";

@UseGuards(AuthGuard)
@Resolver()
export class UserResover {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(returns => UserEntity)
    fetchCurrentUser(
        @CurrentUser() currentUser: IUser
    ): IUser {
        return currentUser;
    }

    @Query(returns => UsersEntity)
    fetchAdmins(): Promise<UsersEntity> {
        return this.userService.findMany({ role: UserRoles.ADMIN });
    }

    @Query(returns => UsersEntity)
    fetchClients(): Promise<UsersEntity> {
        return this.userService.findMany({ role: UserRoles.USER });
    }

    @Mutation(returns => Boolean)
    async updateCurrentUserPassword(
        @Args({ name: 'oldPassword', type: () => String }) oldPassword: string,
        @Args({ name: 'newPassword', type: () => String }) newPassword: string,
        @CurrentUser() currentUser: IUser,
    ): Promise<boolean> {
        await this.userService.findOneOrFail({ email: currentUser.email, password: oldPassword });
        await this.userService.updateOneById(currentUser._id, { password: newPassword });
        return true;
    }

    @Mutation(returns => Boolean)
    async closeAccount(
        @CurrentUser() currentUser: IUser,
    ): Promise<boolean> {
        await this.userService.updateOneById(currentUser._id, { state: UserState.CLOSED });
        return true;
    }
}   