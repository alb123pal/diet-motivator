import { Meal } from './meal.model';

export class Diet {
    id: string;
    name: string;
    calories: number;
    meals: Meal[];
    userId: string;
}
