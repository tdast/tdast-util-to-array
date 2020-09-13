export default function fromArray(tdast, options = {}) {
  const rows = tdast.children;

  if (tdast.type !== 'table' || rows.length === 0) {
    return [];
  }

  const [firstRow, ...restRows] = rows;
  let hasColumns = false;
  let columns = firstRow.children.reduce((acc, cell) => {
    if (cell.type === 'column' && cell.value) {
      hasColumns = true;
      acc.push(cell.value);
    }
    return acc;
  }, []);

  columns = options.columns || columns; // overwrite if explicitly provided

  if (columns.length === 0) {
    throw new Error(
      'Columns must be specified to transform to array of objects.',
    );
  }

  const cellRows = hasColumns ? restRows : rows;
  return cellRows.reduce((acc, cellRow) => {
    const cells = cellRow.children;
    if (columns.length !== cells.length) {
      throw new Error('Row cardinality must match length of columns.');
    }
    const record = columns.reduce((acc, column, i) => {
      acc[column] = cells[i].value;
      return acc;
    }, {});
    acc.push(record);
    return acc;
  }, []);
}
