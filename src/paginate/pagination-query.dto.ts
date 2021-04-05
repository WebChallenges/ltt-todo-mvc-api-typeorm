import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(10)
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  readonly page?: number;
}
