import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJwtColumn1719544131802 implements MigrationInterface {
  name = 'AddJwtColumn1719544131802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`hash\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`hashedRt\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedRt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hash\``);
  }
}
