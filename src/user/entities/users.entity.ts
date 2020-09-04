import { ObjectType, Field, ID } from "type-graphql";
import { Paging } from "~/commons/database/typings/Paging";
import { UserEntity } from "./user.entity";

@ObjectType()
export class UsersEntity extends Paging {
    @Field(type => [UserEntity])
    public records: UserEntity[];
}