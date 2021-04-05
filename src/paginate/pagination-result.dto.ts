import { ApiProperty } from '@nestjs/swagger';

export class PaginationResultRO<Entity> {
  @ApiProperty({ type: Object, isArray: true }) // will be overwritten
  public items: Entity[];

  @ApiProperty()
  public totalCount: number;

  @ApiProperty()
  public page: number;
}
