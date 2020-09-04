import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { UserEntity } from "~/user/entities/user.entity";
import { UserService } from "~/user/services/user.service";
import { IUser } from "~/user/interfaces/user.interface";

@Resolver(of => UserEntity)
export class UserPropertyResolver {
}
