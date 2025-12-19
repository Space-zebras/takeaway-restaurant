export type MenuItem = {
    id: string,
    name: string,
    category: string[],
    ingredients: Record<string, number>,
    description: string,
    price: number, 
    image: string,
}

export type UpdateMenuItemBody = Partial<{
    name: string,
    category: string[],
    ingredients: Record<string, number>,
    description: string,
    price: number, 
    image: string,
}>
