import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dto1719906861508 implements MigrationInterface {
  name = 'Dto1719906861508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`work_time\` \`work_time\` varchar(255) NOT NULL DEFAULT '08:30-17:30'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`work_time\` \`work_time\` varchar(255) NOT NULL`,
    );
  }
}
