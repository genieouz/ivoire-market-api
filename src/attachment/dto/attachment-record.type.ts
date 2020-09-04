import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class AttachmentRecord {
  @Field(type =>  ID)
  public id: string;

  @Field(type => Int)
  public sizeB: string;

  @Field()
  public extension: string;
}
