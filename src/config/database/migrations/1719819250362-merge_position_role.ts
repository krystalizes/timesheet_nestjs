import { MigrationInterface, QueryRunner } from 'typeorm';

export class MergePositionRole1719819250362 implements MigrationInterface {
  name = 'MergePositionRole1719819250362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`position\` \`position\` enum ('Dev', 'HR', 'PM', 'CEO', 'Admin') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`position\` \`position\` enum ('Dev', 'HR', 'PM', 'CEO') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('Admin', 'User') NOT NULL DEFAULT 'User'`,
    );
  }
}
