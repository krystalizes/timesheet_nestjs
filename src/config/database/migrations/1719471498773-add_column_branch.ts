import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnBranch1719471498773 implements MigrationInterface {
  name = 'AddColumnBranch1719471498773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`branch\` ADD \`test\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`branch\` DROP COLUMN \`test\``);
  }
}
