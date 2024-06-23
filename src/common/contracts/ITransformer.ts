
export interface ITransformer<T> {
    transform(item: T)
    collection(item: T[])
}