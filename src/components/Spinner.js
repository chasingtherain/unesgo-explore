import spinner from "../components/assets/blue_spinner.gif"

function Spinner() {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '50%', display: 'block', margin: "auto", marginTop: "50%" }}
    />
  )
}

export default Spinner