import spinner from "../components/assets/blue_spinner.gif"

function Spinner() {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '150px', margin: 'auto', display: 'block', marginTop: "350px" }}
    />
  )
}

export default Spinner