export function getObjectCopy(obj){
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
export function truncate(n, useWordBoundary){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
}