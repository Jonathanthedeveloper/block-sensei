import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateClanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  logo_url?: string;

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
