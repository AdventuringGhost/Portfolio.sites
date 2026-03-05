declare module "json-stable-stringify-without-jsonify" {
  interface Options {
    cmp?: (
      a: { key: string; value: any },
      b: { key: string; value: any },
    ) => number;
    space?: string | number;
    replacer?: (key: string, value: any) => any;
  }
  function stringify(obj: any, opts?: Options): string;
  export = stringify;
}
