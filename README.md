# Gonfalon.js

```js
> var flags = new Gonfalon('foo', 'bar', 'baz');
> var mask = flags.mask('foo');
> mask.has('foo');
true
> mask.has('bar');
false
> mask.or('bar');
3
> mask.has('bar');
true
> mask.toggle('foo', 'bar', 'baz');
4
> mask.has('foo');
false
> mask.has('baz');
true
```

## Gonfalon(flags [, flag, flag, ...])

### value(key)
Returns the mask value of `key`.

### mask(flags [, flag, flag, ...])
Takes an array or comma-separated list of flags

**returns:** Gonfalon.Mask

## Gonfalon.Mask

### value
Returns bitmask value of current object

### and(mask)
Returns boolean whether `mask` value is contained in current object's mask

**aliases:** has  
**returns:** Boolean

### or(mask)
Flips bits matched by `mask` to 1. Returns new mask value

**aliases:** on  
**returns:** Integer

### xor(mask)
Flips bits matched by `mask` from 0 to 1 and vice versa. Returns new mask value

**aliases:** toggle  
**returns:** Integer

### nand(mask)
Flips bits matched by `mask` to 0. Returns new mask value

**aliases:** off  
**returns:** Integer
