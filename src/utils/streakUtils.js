const calculateCurrentStreak = (completionHistory) => {
    if (!completionHistory || completionHistory.length === 0) return 0;
    const sortedDates = completionHistory
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => b - a);

    let streak = 0;
    let lastDate = null;
    let uniqueDays = new Set();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const date of sortedDates) {
        const dateKey = date.toDateString();

        if (uniqueDays.has(dateKey)) continue;
        uniqueDays.add(dateKey);

        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        if (!lastDate) {
            lastDate = dayStart;

            if (dayStart.getTime() === today.getTime()) {
                streak = 1;
            } else {
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (dayStart.getTime() === yesterday.getTime()) {
                    streak = 1;
                } else {
                    streak = 0;
                }
            }
            continue;
        }

        const expectedPreviousDay = new Date(lastDate);
        expectedPreviousDay.setDate(lastDate.getDate() - 1); 

        if (dayStart.getTime() === expectedPreviousDay.getTime()) {
            streak++;
            lastDate = dayStart;
        } else if (dayStart.getTime() < expectedPreviousDay.getTime()) {
            break;
        }
    }

    return streak;
};

export default calculateCurrentStreak;