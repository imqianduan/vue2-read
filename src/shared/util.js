/* @flow */

// ����һ����������¶��󣬴˶��󲻿ɱ��޸�
export const emptyObject = Object.freeze({})

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

// %checksΪν�ʺ���������ο�https://flow.org/en/docs/types/functions/

// �ж�δ����
export function isUndef(v: any): boolean % checks {
  return v === undefined || v === null
}

// �ж��Ѷ���
export function isDef(v: any): boolean % checks {
  return v !== undefined && v !== null
}

// �ж�ֵΪtrue
export function isTrue(v: any): boolean % checks {
  return v === true
}

// �ж�ֵΪfalse
export function isFalse(v: any): boolean % checks {
  return v === false
}

/**
 * Check if value is primitive.
 *
 * �ж�ֵ�Ǽ򵥵�ԭʼ����������
 */
export function isPrimitive(value: any): boolean % checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * �����ж��ǲ���һ��json���͵�object
 */
export function isObject(obj: mixed): boolean % checks {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 *
 * ��ȡֵ��ԭʼ�����ַ���
 */
const _toString = Object.prototype.toString

export function toRawType(value: any): string {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * �ϸ�Ķ������ͼ�飬ֻ����true
 * ��Լ򵥵�javascript����
 * ʹ�������toRawTypeҲ�����ж�
 */
export function isPlainObject(obj: any): boolean {
  // ������toRawType: return toRawType(obj) === 'Object'
  return _toString.call(obj) === '[object Object]'
}

// �ж��ǲ���������ʽ
export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 *
 * ���ֵ�ǲ���һ����Ч����������
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  // isFinite�� �ж���ֵ�ǲ���һ��������ֵ
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

// �ж��Ƿ񷵻�һ��promise
export function isPromise(val: any): boolean {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 *
 * ��ֵת������ʵ����ʾ���ַ���
 * ���ֵΪnull����ת�����ַ���
 * ��������鼰���󣬾�ʹ��JSON.strinify
 * ������ʹ��String
 * ע��������������ֱ��ʹ��{}.toString()����д���ᱨ���ɻ���({}.toString())
 */
export function toString(val: any): string {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 *
 * ��������ַ���ֵת����һ�����֣���ʵ�ֳ־���
 * ��������ֵ����ת�������֣��򷵻������ԭʼ�ַ���
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 *
 * @param {*} str �ַ��������Զ��ŷָ���ֳ����飬�����ÿ��ֵ��map��key��ֵȫ��true
 * @param {*} expectsLowerCase �Ƿ�ת����Сд
 * @return ����һ����������������һ��val����
 * eg: var map = makeMap('a,b,c,D,e'); console.log(map('a')) //true
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 *
 * ����ǩ�ǲ������õı�ǩ�������ִ�Сд
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 *
 * ��������Ƿ��Ǳ������ԣ����ִ�Сд
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
 * Remove an item from an array.
 *
 * ɾ�������е�ĳһ�������ظ����֣�ֻ��ɾ����һ����
 * @param {*} arr ����
 * @param {*} item Ҫɾ��������ֵ
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  // �ж������Ƿ�Ϊ��
  if (arr.length) {
    const index = arr.indexOf(item)
    // �ж�Ҫɾ����ֵ�Ƿ����
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 *
 * �������Ƿ����ĳ������
 * @param {*} obj �������������Object��Array����
 * @param {*} key �������ַ���
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 *
 * �Դ���������һ������汾
 * ��������ǲ��Ǿ����е㲻�����?����������ʲô?
 * ��⣺����һ������ִ�еĽ�����´���ִ����ͬ�ĺ���ʱ�����key��ͬ������ִ��ԭ������ֱ�Ӵ�cache��ͨ��keyȡֵ���ɡ�
 * �ɰ�����test���븴�Ƶ������console��ִ��
 */
  // -------------------test
  /*
  function cached(fn) {
    const cache = Object.create(null)
    return (function cachedFn(str) {
    console.log(cache)
      const hit = cache[str]
    var cc = hit || (cache[str] = fn(str))
      return cc
    })
  }

  var test = function(){
    console.log('ִ�м���');
    return 1+2;
  }

  var testCache = cached(test);
  console.log(testCache)

  console.log(testCache('sum1'))
  console.log(testCache('sum2'))
  console.log(testCache('sum1'))

  // ִ�к��ӡ���:
  {}
  ִ�м���
  3
  {sum1: 3}
  ִ�м���
  3
  {sum1: 3, sum2: 3}
  3
  // �������ӡ���Կ�����ִ�����μ��㣬�ڵڶ��ε���testCache('sum1')ʱ��û����ִ�м��㣬ֱ�Ӵӻ�����ȡ�Ľ��
  */
// -----------------test end
export function cached<F: Function>(fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 *
 * ��ͨ��"-"���ӷ����ӵ��ַ�����ת�����շ��ʽ����һ���ʲ�������
 * �� 'an-great-boy' => 'anGreatBoy','An-great-boy' => 'AnGreatBoy','An-_great-_boy' => 'An_great_boy'
 */
// ƥ�����ӷ�(-)����� A-Za-z0-9_
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 *
 * ת���ַ���������ĸ��д
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 *
 * ���շ��ַ���ת�������ӷ����ӣ�-��
 * �磺anGreatBoy => an-great-boy
 */
// ƥ��ǵ��ʱ߽����Ĵ�д��ĸ��\B:�ǵ��ʱ߽� \b:���ʱ߽磩
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 *
 * Ϊ��֧��bind�����Ļ������ṩ�򵥵�bind polyfill
 * ����:PhantomJS 1.x���Ӽ����Ͻ������ǲ�����Ҫ�����
 * ��Ϊԭ����bind �ڴ����������������Ѿ��㹻����
 * ����ɾ������ζ���ƻ��ܹ����еĴ���
 * PhantomJS 1��Ϊ�������ݣ�������뱣��
 */

/* istanbul ignore next */
function polyfillBind(fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)  // arguments��һ��������
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}

// ԭ����bind����
function nativeBind(fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

// ���ݵ�bind����
export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind

/**
 * Convert an Array-like object to a real Array.
 *
 * ת��һ��������Ϊ����������
 * @param {*} list �����������
 * @param {*} start ��ʼת����index���
 * @return {Array} ����һ��������
 */
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)  // ����һ��length����Ϊi�Ŀ�����
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 *
 * �����Ի�ϵ�Ŀ�������
 */
export function extend(to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 *
 * ����������(����[{color:'red'},{width:'230px'}])�ϲ�Ϊ��������
 * eg: toObject([{color:'red'},{width:'230px'}]) => {color: "red", width: "230px"}
 */
export function toObject(arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 *
 * ����ղ���
 */
export function noop(a?: any, b?: any, c?: any) { }

/**
 * Always return false.
 *
 * ʼ�շ���false
 */
export const no = (a?: any, b?: any, c?: any) => false

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 *
 * ����ʲô������������Ƿ��ص�ǰ����
 */
export const identity = (_: any) => _


/**
 * Generate a string containing static keys from compiler modules.
 *
 * ����һ������������ģ�龲̬��ֵ���ַ���
 */
 /*
  // eg:
  var test = genStaticKeys([{
    staticKeys:'a'
  },{
    staticKeys:'b'
  },{
    staticKeys:'c'
  }])
  console.log(test) => print: a,b,c
 */
export function genStaticKeys(modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * �ж����������ڲ��ṹ�Ƿ���ͬ���ϸ�����˵���������ǲ���ȣ����Խ�loose equal(��ɢ��ȣ�))
 */
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  // A��B���Ƕ���
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      // A��B��������
      if (isArrayA && isArrayB) {
        // �������鳤����ȣ�ѭ���ݹ�
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        // A��B��ʱ�������ȽϺ���ֵ
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        // A��B����������
        // Object.keys=>������󣬷��ض������е�KEY(������Ӷ���),���һ�����飬eg: var a = { name: {age:34}}; console.log(Object.keys(a)) // ['name']
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)

        // ��������һ��key������ȣ�ѭ���ݹ�
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    // A ��B �����Ƕ�����ת�����ַ����Ƚ�
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 *
 * ������ɢ��ȵ�����ֵ�ĵ�һ������������Ҳ����򷵻�-1
 */
export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 *
 * ȷ��һ������ֻ��������һ��
 */
export function once(fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
