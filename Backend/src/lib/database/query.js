
const sequelize = require('../database/connection')
const { QueryTypes } = require('sequelize')

module.exports = {

  search_one: async (table, column, data) => {
    let result = await sequelize.query(`SELECT * FROM ${table} WHERE ${column} = ?`, {
      replacements: [data],
      type: QueryTypes.SELECT
    })
    return result
  },

  select_columns_with_condictions: async (columns, table, column, data) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(", ")} FROM ${table} WHERE ${column} = ?`,
      {
        replacements: [data],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  /**
   * @desc Returns one record from a table by condition
   * @query SELECT * FROM table WHERE condition
   */

  select_one: async (table, condition, column) => {
    let result = await sequelize.query(`SELECT * FROM ${table} WHERE ${column} = ?`, {
      replacements: [condition],
      type: QueryTypes.SELECT
    })
    return result
  },

  select_one_with_2conditions: async (table, condition1, column1) => {
    return await sequelize.query(`SELECT * FROM ${table} WHERE ${column1} = ${condition1}`, {
      type: QueryTypes.SELECT
  })

  },

  select_with_date_2conditions: async (table, condition1, column1) => {
    return await sequelize.query(`SELECT * FROM ${table} WHERE DATE(${column1}) = "${condition1}"`, {
      type: QueryTypes.SELECT
    })
  },



  select_all_from_join2_with_2conditions: async (
    table1,
    table2,
    joint1,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} WHERE ? OR ?`,
      {
        replacements: [condition1, condition2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join_with_2conditions: async (
    table1,
    table2,
    joint1,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} WHERE ? AND ?`,
      {
        replacements: [condition1, condition2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_one_from_join3_with_1conditions: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    condition1
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2}=${table3}.${joint2} WHERE ${table1}.${joint1}=${condition1}`
    )
    return result
  },

  select_all: async (table) => {
    let result = await sequelize.query(`SELECT * FROM ${table}`, {
      type: QueryTypes.SELECT
    })
    return result
  },

  select_many: async (table, columns) => {
    let result = await sequelize.query(`SELECT ${columns.join(", ")} FROM ${table}`, {
      type: QueryTypes.SELECT
    })
    return result
  },

  select_many_from_join_with_condition: async (table1, table2, joint, columns, condition) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(
        ", "
      )} FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join: async (table1, table2, joint) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint}`, {
      type: QueryTypes.SELECT
    }
    )
    return result
  },

  select_all_from_join3: async (table1, table2, table3, joint1, joint2) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2}`
    )
    return result
  },

  select_all_from_join_with_condition: async (table1, table2, joint, condition, column) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE  ${column} = ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join_with_2condition: async (
    table1,
    table2,
    joint,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE ${condition1} = ${condition2}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join3_with_condition: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    condition
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} WHERE ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join3_with_2condition: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table2}.${joint2} = ${table3}.${joint2} WHERE ? AND ?`,
      {
        replacements: [condition1, condition2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join2_with_condition: async (table1, table2, joint1, condition, order_by) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} WHERE ${table2}.${joint1} < ? ORDER BY ${order_by}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join2_with_condition_order: async (table1, table2, joint1, condition) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} WHERE ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join3_with_condition_and_order: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    condition,
    order_by
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} WHERE ? ORDER BY ${order_by} DESC`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join4: async (table1, table2, table3, table4, joint1, joint2, joint3) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join4_with_conditions: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${condition1} AND ${condition2}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join4_with_condition: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    column,
    condition
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${column} =  ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join4_with_2conditions: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition1,
    condition2
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${condition1} AND ?`,
      {
        replacements: [condition2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join4_with_conditionB: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table3}.${joint3} = ${table4}.${joint3} WHERE ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join4_with_conditionB_and_order: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition,
    order_by,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table3}.${joint3} = ${table4}.${joint3} WHERE ? ORDER BY ${order_by} ${dir}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join5_with_conditionB_and_order: async (
    table1,
    table2,
    table3,
    table4,
    table5,
    joint1,
    joint2,
    joint3,
    joint4,
    condition,
    order_by,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table3}.${joint3} = ${table4}.${joint3} JOIN ${table5} ON ${table2}.${joint4} = ${table5}.${joint4} WHERE ? ORDER BY ${order_by} ${dir}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join4_with_conditions_and_order: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition1,
    condition2,
    order_by,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${condition1} AND ${condition2} ORDER BY ${order_by} ${dir}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join4_with_condition_order_and_limit: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition1,
    condition2,
    order_by,
    lim,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${condition1} AND ${condition2} ORDER BY ${order_by} ${dir} LIMIT ${lim}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join4_with_condition_and_orderB: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition,
    order_by,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table3}.${joint3} = ${table4}.${joint3} WHERE ? ORDER BY ${table2}.${order_by} ${dir}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_all_from_join4_with_conditions_and_order_and_limit: async (
    table1,
    table2,
    table3,
    table4,
    joint1,
    joint2,
    joint3,
    condition1,
    condition2,
    order_by,
    lim,
    dir
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} JOIN ${table4} ON ${table2}.${joint3} = ${table4}.${joint3} WHERE ${condition1} AND ${condition2} ORDER BY ${order_by} ${dir} LIMIT ${lim}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join3: async (table1, table2, table3, joint1, joint2) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join_with_regex: async (table1, table2, joint, target, regex) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE ${target} REGEXP ?`,
      {
        replacements: [regex],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join3_with_regex: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    target,
    regex
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} WHERE ${target} REGEXP ?`,
      {
        replacements: [regex],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_from_join_with_condition_and_regex: async (
    table1,
    table2,
    joint,
    condition,
    target,
    regex
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE ? AND ${target} REGEXP ?`,
      {
        replacements: [condition, regex],
        type: QueryTypes.SELECT
      }
      
    )
    return result
  },

  select_all_from_join3_with_condition_and_regex: async (
    table1,
    table2,
    table3,
    joint1,
    joint2,
    condition,
    target,
    regex
  ) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table1} JOIN ${table2} ON ${table1}.${joint1} = ${table2}.${joint1} JOIN ${table3} ON ${table1}.${joint2} = ${table3}.${joint2} WHERE ? AND ${target} REGEXP ?`,
      {
        replacements: [condition, regex],
        type: QueryTypes.SELECT
      }
    )
    
    return result
  },

  select_many_from_join_with_condition_and_regex: async (
    table1,
    table2,
    joint,
    columns,
    condition,
    target,
    regex
  ) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(
        ", "
      )} FROM ${table1} JOIN ${table2} ON ${table1}.${joint} = ${table2}.${joint} WHERE ? AND ${target} REGEXP ?`,
      {
        replacements: [condition, regex],
        type: QueryTypes.SELECT
      }
    )
    return result
    
  },

  select_all_with_condition: async (table, condition) => {
    let result = await sequelize.query(`SELECT * FROM ${table} WHERE ?`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },


  select_one_with_condition: async (table, column, condition) => {
    let result = await sequelize.query(
      `SELECT ${column} FROM ${table} WHERE ? ORDER BY ${column}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_many_with_condition: async (table, columns, condition) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(", ")} FROM ${table} WHERE ? ORDER BY ${columns[0]}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  /**
   * @desc Returns one column from a table with condition and orders
   * @query SELECT target FROM table WHERE condition ORDER BY order_by dir
   */

  select_one_with_condition_and_order: async (table, target, condition, order_by, dir) => {
    let result = await sequelize.query(
      `SELECT ${target} FROM ${table} WHERE ? ORDER BY ${order_by} ${dir}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_with_condition_and_order: async (table, column, condition, dir) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ? ORDER BY ${column} ${dir}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_with_condition_order_and_limit: async (table, column, condition, lim, dir) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ? ORDER BY ${column} ${dir} LIMIT ${lim}`,
      {
        replacements: [condition],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_all_and_order: async (table, column, dir) => {
    let result = await sequelize.query(`SELECT * FROM ${table} ORDER BY ${column} ${dir}`,
      {
        type: QueryTypes.SELECT
      })
    return result
  },

  select_and_limit: async (table, column, index, lim, filter, offset) => {
    let result = await sequelize.query(
      `SELECT ${filter} FROM ${table} WHERE ${column} > ${index} ORDER BY ${column} LIMIT ${lim} OFFSET ${offset}`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_with_condition_and_limit: async (table, column, condition, index, lim) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ? AND ${column} > ? ORDER BY ${column} LIMIT ?`,
      {
        replacements: [condition, index, lim],
        type: QueryTypes.SELECT
      }
      
    )
    return result
  },

  select_one_with_condition_and_limit: async (table, column, condition, index, lim) => {
    let result = await sequelize.query(
      `SELECT ${column} FROM ${table} WHERE ? AND ${column} > ? ORDER BY ${column} LIMIT ?`,
      {
        replacements: [condition, index, lim],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_many_with_condition_and_limit: async (table, columns, condition, index, lim) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(", ")} FROM ${table} WHERE ? AND ${columns[0]} > ? ORDER BY ${columns[1]
      } LIMIT ?`,
      {
        replacements: [condition, index, lim],
        type: QueryTypes.SELECT
      }
    )
    
    return result
  },

  search_get_one_column: async (table, column) => {
    let result = await sequelize.query(`SELECT ${column} FROM ${table}`, {
      type: QueryTypes.SELECT
    })
    
    return result
  },

  search_two: async (table, column_one, column_two, data1, data2) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ${column_one} = ? AND ${column_two} = ?`,
      {
        replacements: [data1, data2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  search_two_Or: async (table, column_one, column_two, data1, data2) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ${column_one} = ? OR ${column_two} = ?`,
      {
        replacements: [data1, data2],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_oneColumn: async (table, column1, column2, data) => {
    let result = await sequelize.query(
      `SELECT ${column1} FROM ${table} WHERE ${column2} = ?`,
      {
        replacements: [data],
        type: QueryTypes.SELECT
      }
    )

    return result
  },

  select_with_regex: async (table, column, data) => {
    let result = await sequelize.query(`SELECT * FROM ${table} WHERE ${column} REGEXP ?`, {
      replacements: [data],
      type: QueryTypes.SELECT
    })
    return result
  },

  select_with_regex_and_limit: async (table, sort, target, regex, limit) => {
    let result = await sequelize.query(
      `SELECT * FROM ${table} WHERE ${target} REGEXP ? AND ${sort} > ? LIMIT ?`,
      {
        replacements: [regex, sort, limit],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_many_with_regex_and_limit: async (table, columns, target, regex, limit) => {
    let result = await sequelize.query(
      `SELECT ${columns.join(", ")} FROM ${table} WHERE ${target} REGEXP ? AND ${columns[0]
      } > ? LIMIT ?`,
      {
        replacements: [regex, limit],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  select_one_with_condition_regex_and_limit: async (
    table,
    target,
    condition,
    column,
    regex,
    index,
    lim
  ) => {
    const result = await sequelize.query(
      `SELECT ${target} FROM ${table} WHERE ? AND ${column} REGEXP ? AND ${target} > ? ORDER BY ${target} LIMIT ?`,
      {
        replacements: [condition, regex, index, lim],
        type: QueryTypes.SELECT
      }
    )

    return result
  },

  select_one_with_regex_and_limit: async (table, target, column, regex) => {
    const result = await sequelize.query(
      `SELECT ${target} FROM ${table} WHERE ${column} REGEXP ?`,
      {
        replacements: [regex],
        type: QueryTypes.SELECT
      }
    )

    return result
  },

  select_sum_of_1column_1condition: async (table, column, condition) => {
    let result = await sequelize.query(`SELECT sum(${column}) AS total FROM ${table} WHERE?`, {
      replacements: [condition],
      type: QueryTypes.SELECT
    })
    return result
  },

  insert_new: async (data, Model) => {
    let result = null;
    console.log(data)
    Model.build(data).then(() => {
      result = data
    }).catch((err) => {
      console.log(err)

    })

    return result;
  },

  search_get_one_column_oncondition: async (table, column1, column2, data) => {
    let result = await sequelize.query(
      `SELECT ${column1} FROM ${table} WHERE ${column2} = ?`,
      {
        replacements:[data],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  delete_all: async (table) => {
    const result = await sequelize.query(`DELETE FROM ${table}`,{
        type: QueryTypes.DELETE
      })
    return result
  },

  delete_one: async (table, column, data) => {
    const result = await sequelize.query(`DELETE FROM ${table} WHERE ${column} = ?`, {
        replacements:[data],
        type: QueryTypes.DELETE
      })
    return result
  },

  delete_with_condition: async (table, condition) => {
    const result = await sequelize.query(`DELETE FROM ${table} WHERE ?`, {
        replacements:[condition],
        type: QueryTypes.DELETE
      })
    return result
  },

  update_one: async (table, updated_data, column, condition) => {
    const result = await sequelize.query(`UPDATE ${table} SET ${column} = ${column} + ${updated_data} WHERE  ${column}  < ?`,
      {
        replacements: [condition],
        type: QueryTypes.UPDATE
      })
    return result
  },

  update_one_without_condition: async (table, updated_data, column, column2, condition2) => {
    const result = await sequelize.query(`UPDATE ${table} SET ${column} = ${updated_data} WHERE ${column2} = ?`,
      {
        replacements: [condition2],
        type: QueryTypes.UPDATE
      })
    return result
  },

  update_one_without_2condition: async (table, updated_data, column, column2, column3, condition1, condition2) => {
    const result = await sequelize.query(`UPDATE ${table} SET ${column} = ${updated_data} WHERE ${column2} = ? AND ${column3} = ?`,
      {
        replacements: [condition1, condition2],
        type: QueryTypes.UPDATE
      })
    return result
  },


  /**
   * @desc Updates one record in a table by condition
   * @query UPDATE table SET update WHERE condition
   * @usage await db.update_with_condition(table: string, update: object, condition: object)
   */

  update_with_2condition: async (table, update, column, condition, column1, column2, column3, condition2) => {
    sequelize.query(`UPDATE ${table} SET ${column1} = ? , ${column2} = ? WHERE ${column} >= ${condition} AND  ${column3} = ${condition2} `, {
      replacements: update,
      type: QueryTypes.UPDATE
    })

  },

  join_two_tables: async (tableOne, tableTwo, condition, columns) => {
    const result = await sequelize.query(
      `SELECT ${columns.join(
        ", "
      )} FROM ${tableOne} JOIN ${tableTwo} ON ${tableOne}.${condition}=${tableTwo}.${condition}`
    )
    return result
  },

  insert_new_on_condition: async (data, table, column) => {
    const result = await sequelize.query(`INSERT INTO ${table} SET ? WHERE ${column} =?`, {
        replacements:[data],
        type: QueryTypes.INSERT
      })
    return result
  },

  select_one_with_condition_regex: async (table, target, condition, column, regex) => {
    const result = await sequelize.query(
      `SELECT ${target} FROM ${table} WHERE ? AND ${column} REGEXP ? ORDER BY ${target}`,
      {
        replacements:[condition, regex],
        type: QueryTypes.SELECT
      }
    )
    return result
  },

  count: async (table, column, index) => {
    let result = await sequelize.query(
      `SELECT COUNT(${column}) AS no_courts FROM ${table} WHERE ${column} > ${index} `,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  },
  
}
