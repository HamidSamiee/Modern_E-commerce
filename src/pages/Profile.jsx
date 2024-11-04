import Container from "@/components/Container"
import { useSelector } from "react-redux"


const Profile = () => {

    const {user}=useSelector(state=>state.auth)

  return (
    <div>
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
                <h3 className="">
                    {
                        `${user.firstname } ${user.lastname} عزیز خوش آمدید`
                    }
                </h3>
        </Container>
    </div>
  )
}

export default Profile