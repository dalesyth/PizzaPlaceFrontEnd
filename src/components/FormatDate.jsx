

const FormatDate = ({ dateString }) => {
    console.log("dateString from FormatDate:", dateString)
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default FormatDate