import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMerge1719820720757 implements MigrationInterface {
  name = 'FixMerge1719820720757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('Dev', 'HR', 'PM', 'CEO', 'Admin') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
