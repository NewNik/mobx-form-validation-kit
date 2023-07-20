declare type Method<T> = (sender: T) => void;
export declare class Delegate<T> {
    private funcs;
    addListen: (method: Method<T>) => void;
    remove: (method: Method<T>) => void;
    call: (sender: T) => void;
    dispose: () => void;
}
export {};
