
const transformDate = (date) => {
    const currentDate = new Date(date)  
    const newDateOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
    }
    const newDate = currentDate.toLocaleString("fr-FR", newDateOptions );
    return newDate
}
  
export default transformDate;
