export const getDateTitle = () => {
    const currentDate = new Date();

    const startOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
    });
    const startOfWeekFormatted = dateFormatter.format(startOfWeek);
    const endOfWeekFormatted = dateFormatter.format(endOfWeek);

    const title = `Week of ${startOfWeekFormatted} - ${endOfWeekFormatted}`;

    return title;
}