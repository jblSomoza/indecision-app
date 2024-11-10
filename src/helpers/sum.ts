export function sum(a: number, b: number) {
    return a + b
}

export const addArray = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0)