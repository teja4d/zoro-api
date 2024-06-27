//accept one or more and check all are not empty and null pass as arguments not as array
export const isEmptyOrNull = (...args: string[]): boolean => {
    return args.every(arg => arg !== null && arg !== undefined && arg !== '');
};