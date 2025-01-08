import { expect, test } from 'vitest';
import { getFormatTagsObj } from './utils';

test('test getFormatTagsObj', () => {
  expect(getFormatTagsObj("a,b")).toStrictEqual({ a: "A", b: "B" });
});
