export interface ListOptions {
    id: number,
    icon: string,
    label: string,
    roles?: string[],
    url: string,
    options: Options[]
}

export interface Options {
    id: number,
    icon: string,
    label: string,
    url: string,
    roles?: string[],
}

export interface Option {
    id: number,
    label: string,
    icon?: string,
    url?: string,
    description: string,
}