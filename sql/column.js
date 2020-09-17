const COLUMN_SQL = {
    // 关联查询不符合需求
    // queryALl:'select * from column_main left join column_child on column_main.column_name = column_child.column_parent',
    queryParentColumn: 'select * from column_main',
}
module.exports = COLUMN_SQL