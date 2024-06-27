import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteColumnClient1719464775002 implements MigrationInterface {
  name = 'DeleteColumnClient1719464775002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`column\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`client\` ADD \`column\` varchar(255) NOT NULL`,
    );
  }
}
