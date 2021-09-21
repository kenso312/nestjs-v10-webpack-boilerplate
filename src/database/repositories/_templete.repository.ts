import { EntityRepository, Repository } from 'typeorm';
import { TempleteEntity } from '@entity/_templete.entity';

@EntityRepository(TempleteEntity)
export class TempleteRepository extends Repository<TempleteEntity> {}
