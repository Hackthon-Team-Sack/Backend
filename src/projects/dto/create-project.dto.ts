import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Project 5',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 10000.0,
  })
  @IsNumber()
  budget: number;

  @ApiProperty({
    example: 'Token Name',
  })
  @IsString()
  tokenName: string;

  @ApiProperty({
    example: 1000000.0,
  })
  @IsNumber()
  tokenQuantity: number;

  @ApiProperty({
    example: 'TKN',
  })
  @IsString()
  tokenSymbol: string;

  @ApiProperty({
    example: 'Real Estate Property',
  })
  @IsString()
  rwaRepresentation: string;

  @ApiProperty({
    example: 'This is a project description.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsString()
  contractAddress: string;
}
