export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string | null;
    categoryId: string;
    category: string;
}
