import { MigrationInterface, QueryRunner } from 'typeorm';

export class HashedRt1719567832377 implements MigrationInterface {
  name = 'HashedRt1719567832377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`hashedRt\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hashedRt\``);
  }
}
