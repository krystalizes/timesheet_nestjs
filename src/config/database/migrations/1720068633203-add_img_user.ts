import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImgUser1720068633203 implements MigrationInterface {
  name = 'AddImgUser1720068633203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`image\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`image\``);
  }
}
