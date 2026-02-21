import { IsArray, IsBoolean, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateZoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [Object] })
  @IsArray()
  @IsNotEmpty()
  polygon: { lat: number; lng: number }[];

  @ApiProperty({ example: '#FF0000' })
  @IsOptional()
  @IsString()
  @IsHexColor()
  color?: string;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
