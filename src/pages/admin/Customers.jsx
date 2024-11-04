import { useSelector } from "react-redux"

const Customers = () => {

  const customers=useSelector(state=>state.auth.customers)

  console.log(customers)

  return (
    <div>Customers</div>
  )
}

export default Customers