import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTempleteDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
