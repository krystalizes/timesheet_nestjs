import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteHashUser1719566932805 implements MigrationInterface {
  name = 'DeleteHashUser1719566932805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`branch\` DROP COLUMN \`test\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hash\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`hash\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branch\` ADD \`test\` varchar(255) NOT NULL`,
    );
  }
}
