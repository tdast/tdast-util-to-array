# tdast-util-to-array

[**tdast**][tdast] utility to transform from tdast to JS array.

---

## Install

```sh
npm install tdast-util-to-array
```

## Use

```js
import toArray from 'tdast-util-to-array';

const tdast = {
  type: 'table',
  children: [
    {
      type: 'row',
      index: 0,
      children: [
        {
          type: 'column',
          index: 0,
          value: 'col1',
        },
        {
          type: 'column',
          index: 1,
          value: 'col2',
        },
        {
          type: 'column',
          index: 2,
          value: 'col3',
        },
      ],
    },
    {
      type: 'row',
      index: 1,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 1,
          value: 'row1col1',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 1,
          value: 'row1col2',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 1,
          value: 'row1col3',
        },
      ],
    },
    {
      type: 'row',
      index: 2,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 2,
          value: 'row2col1',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 2,
          value: 'row2col2',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 2,
          value: 'row2col3',
        },
      ],
    },
  ],
};

expect(toArray(tdast)).toEqual({
  { col1: 'row1col1', col2: 'row1col2', col3: 'row1col3' },
  { col1: 'row2col1', col2: 'row2col2', col3: 'row2col3' },
});
```

## API

### `toArray(array[, options])`

#### Interface
```ts
function toArray(
  // tdast Table node
  tdast: Table,
  // options to configure transformer
  options?: Options,
): Array<Record<string, any>>;
```

Transforms a [tdast][] `Table` node into a JS array of objects.

If columns and row cell cardinality do not match, an error will be thrown to inform that the JS array cannot be transformed.

By default, `toArray` will infer `Column` node values to use as keys for the JS array objects.  If the tdast node does not contain `Column` nodes, or you wish to use explicit column keys, you can specify these with the `options.columns` property as detailed in the example below.

#### Example
Using the same tdast tree in the earlier example

```js
import toArray from 'tdast-util-to-array';

const options = {
  columns ['Col A', 'Col B', 'Col C'],
};

expect(toArray(tdast, options)).toEqual([
  { 'Col A': 'row1col1', 'Col B': 'row1col2', 'Col C': 'row1col3' },
  { 'Col A': 'row2col1', 'Col B': 'row2col2', 'Col C': 'row2col3' },
]);
```

#### Related interfaces
```ts
interface Options {
  // array of column strings that will be used as object keys.  Overrides the column values detected in the tdast tree.
  columns?: string[];
}
```

<!-- Definitions -->
[tdast]: https://github.com/tdast/tdast
