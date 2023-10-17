export interface RecipeDto {
    title: string;
    ingredients: string;
    preparation: string;
    difficulty: 'Easy' | 'Medium' | 'Difficult';
    picture?: string;
}