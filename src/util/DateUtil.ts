export function formatDate(d: string): string {
    return new Date(d).toLocaleDateString('de-de', { weekday: 'long', year: undefined, month: 'long', day: 'numeric' });
}
