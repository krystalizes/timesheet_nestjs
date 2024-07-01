import { MigrationInterface, QueryRunner } from 'typeorm';

export class HashedRtNullable1719797934014 implements MigrationInterface {
  name = 'HashedRtNullable1719797934014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`hashedRt\` \`hashedRt\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`hashedRt\` \`hashedRt\` varchar(255) NOT NULL`,
    );
  }
}
