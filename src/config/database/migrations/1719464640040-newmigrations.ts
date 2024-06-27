import { MigrationInterface, QueryRunner } from 'typeorm';

export class Newmigrations1719464640040 implements MigrationInterface {
  name = 'Newmigrations1719464640040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`timesheet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`note\` varchar(255) NOT NULL, \`day\` date NOT NULL, \`work_time\` int NOT NULL, \`work_type\` enum ('Normal Working Hours', 'Overtime') NOT NULL, \`status\` enum ('New', 'Pending', 'Approved', 'Rejected') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userProjectId\` int NULL, \`taskId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client\` ADD \`column\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_5eeba4a693910520a0acccee3ff\` FOREIGN KEY (\`userProjectId\`) REFERENCES \`user_project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`timesheet\` ADD CONSTRAINT \`FK_a147ecd5c870c35058f8437b425\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_a147ecd5c870c35058f8437b425\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`timesheet\` DROP FOREIGN KEY \`FK_5eeba4a693910520a0acccee3ff\``,
    );
    await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`column\``);
    await queryRunner.query(`DROP TABLE \`timesheet\``);
  }
}
