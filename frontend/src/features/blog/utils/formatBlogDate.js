export const formatBlogDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    const pad = (number) => String(number).padStart(2, "0");
    const hours = date.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(displayHours)}:${pad(date.getMinutes())} ${meridiem}`;
};

export const formatBlogDateOnly = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    const pad = (number) => String(number).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
