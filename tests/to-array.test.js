import td from 'tdastscript';

import toArray from '../lib/to-array';

describe(toArray, () => {
  it('should transform empty trees to empty array', () => {
    expect(toArray(td())).toEqual([]);
    expect(toArray(td('table'))).toEqual([]);
    expect(toArray(td('table', []))).toEqual([]);
  });

  it('should transform rows into array if columns are present', () => {
    expect(
      toArray(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toEqual([
      { col1: 'row1col1', col2: 'row1col2', col3: 'row1col3' },
      { col1: 'row2col1', col2: 'row2col2', col3: 'row2col3' },
    ]);
  });

  it('should apply options.columns to override column keys', () => {
    expect(
      toArray(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: ['Col A', 'Col B', 'Col C'] },
      ),
    ).toEqual([
      { 'Col A': 'row1col1', 'Col B': 'row1col2', 'Col C': 'row1col3' },
      { 'Col A': 'row2col1', 'Col B': 'row2col2', 'Col C': 'row2col3' },
    ]);
  });

  it('should throw an error if no columns are found or provided', () => {
    expect(() =>
      toArray(
        td('table', [
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toThrow('Columns must be specified to transform to array of objects.');
    expect(() =>
      toArray(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: [] },
      ),
    ).toThrow('Columns must be specified to transform to array of objects.');
  });

  it('should throw an error if no row and column cardinality does not match', () => {
    expect(() =>
      toArray(
        td('table', [
          td('row', [td('column', 'col1'), td('column', 'col2')]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toThrow('Row cardinality must match length of columns.');
    expect(() =>
      toArray(
        td('table', [
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: ['Col A', 'Col B', 'Col C', 'Col D'] },
      ),
    ).toThrow('Row cardinality must match length of columns.');
  });
});
