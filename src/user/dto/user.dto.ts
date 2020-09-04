import { UserGender } from '~/user/enums/user-gender';
import { UserRoles } from '~/user/enums/user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, ID } from 'type-graphql';
import { IsOptional } from 'class-validator';
import { InternalRole } from '~/user/enums/internal-role.enum';
import { ImageSizes } from '~/commons/graphql/types-and-inputs/image-sizes.type';

@InputType()
export class UserDto {
    @ApiProperty()
    @Field()
    @IsOptional()
    public countryCode: string;

    @ApiProperty({ enum: UserRoles })
    @Field(type => UserRoles)
    @IsOptional()
    public role: UserRoles;

    @ApiProperty({ enum: UserGender })
    @Field(type => UserGender)
    @IsOptional()
    public gender?: UserGender;

    @ApiProperty()
    @Field()
    @IsOptional()
    public birthDate?: Date;

    @ApiProperty()
    @Field()
    @IsOptional()
    public phoneNumber: string;

    @ApiProperty()
    @Field()
    public lastName: string;

    @ApiProperty()
    @Field()
    public firstName: string;

    @ApiProperty()
    public password: string;

    @ApiProperty()
    @Field()
    public email: string;

    @ApiProperty({ enum: InternalRole })
    @Field(type => InternalRole)
    @IsOptional()
    public internalRole: InternalRole;
}