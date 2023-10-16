export interface IRecipe {
    title: string;
    ingredients: string;
    preparation: string;
    picture?: string;
    difficulty: 'Easy' | 'Medium' | 'Difficult';
    createdAt: Date;
    isDeleted: boolean;
}