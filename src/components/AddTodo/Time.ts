const Time = (): string => {
    const time = new Date();
    const get_year = time.getFullYear()
    const get_month = time.getMonth()
    const get_date = time.getDate()
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${month[get_month]} ${get_date}, ${get_year}`
}
export default Time;