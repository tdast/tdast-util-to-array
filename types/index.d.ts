import { Table } from 'tdast-types';

export interface Options {
  // array of column strings that will be used as object keys.  Overrides the column values detected in the tdast tree.
  columns?: string[];
}

/**
 * Transforms a tdast tree into an JS array of objects.
 */
export default function toArray(
  // tdast Table node
  tdast: Table,
  // options to configure transformer
  options?: Options,
): Array<Record<string, any>>;
