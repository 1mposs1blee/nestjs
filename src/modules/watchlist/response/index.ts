import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, isString } from 'class-validator';

export class CreateAssetResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;
}
