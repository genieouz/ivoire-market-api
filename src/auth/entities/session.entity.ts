import { UserEntity } from "~/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SessionEntity {
    @ApiProperty()
    @Field()
    token: string;

    @ApiProperty({ type: UserEntity })
    @Field(type => UserEntity)
    user: UserEntity;
}