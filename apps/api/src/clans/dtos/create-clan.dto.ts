import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateClanDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  logo_url: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  x_url?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website_url?: string;
}
