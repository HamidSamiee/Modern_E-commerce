export default function toLocalDate(date,monthFormat = "numeric") {
    const options = {
        year: "numeric",
        month: monthFormat, // 'numeric' یا 'long'
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("fa-IR",options);
}