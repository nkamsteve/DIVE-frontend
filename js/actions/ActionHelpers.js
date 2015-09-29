export function formatTableData(columnNames, data) {
  function formatRow(columns, row) {
    var newRow = {};

    columns.forEach((column, j) =>
      newRow[column] = row[j]
    );

    return newRow;
  }

  return data.map((row) =>
    formatRow(columnNames, row)
  );
}
