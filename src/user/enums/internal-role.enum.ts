import { registerEnumType } from 'type-graphql';

export enum InternalRole {
    STRATEGIC = "STRATEGIC",
    FINANCE = "FINANCE",
    MARKETING = "MARKETING",
    STANDARD = "STANDARD"
}

registerEnumType(InternalRole, {
    name: 'InternalRole',
});