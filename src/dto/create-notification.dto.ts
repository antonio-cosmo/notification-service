import { IsNotEmpty, IsUUID} from "class-validator"

export class CreateNotificationDto{
    @IsNotEmpty()
    @IsUUID()
    recipientId: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    category: string
}