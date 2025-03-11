export const splitTimeClean = (timeClean: string): { value: string; unit: string } => {
    const match = timeClean.match(/(\d+)\s*(.*)/);
    if (match) {
        return { value: match[1], unit: match[2] };
    }
    return { value: timeClean, unit: '' };
};