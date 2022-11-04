export function AutoUnsubscribe(blacklist: string[] = []) {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (const prop of Object.keys(this)) {
        const property = this[prop];
        if (!blacklist.includes(prop)) {
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      }
      original &&
        typeof original === 'function' &&
        original.apply(this, arguments);
    };
  };
}
