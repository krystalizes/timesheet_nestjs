import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMerge1719820612901 implements MigrationInterface {
  name = 'FixMerge1719820612901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('Dev', 'HR', 'PM', 'CEO', 'Admin') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('Admin', 'User') NOT NULL DEFAULT 'User'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`position\` enum ('Dev', 'HR', 'PM', 'CEO') NOT NULL`,
    );
  }
}
