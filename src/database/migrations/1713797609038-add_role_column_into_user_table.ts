import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRoleColumnIntoUserTable1713797609038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        length: '6'
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['role'],
        referencedColumnNames: ['code'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role') !== -1,
    );

    await queryRunner.dropForeignKey('users', foreignKey);

    await queryRunner.dropColumn('users', 'role');
  }
}
