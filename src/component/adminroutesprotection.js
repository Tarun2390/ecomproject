import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
// import usercontext from "./usercontext"
import { useNavigate } from "react-router"

const AdminRoutesProtection=(props)=>
{
    // const{user}=useContext(usercontext)
    const{LoggedIn,usertype}=useSelector((state)=>
    {
        return state.userslice
    })
    const navigate=useNavigate()

    useEffect(()=>
    {
            if(!LoggedIn)
            {
                navigate("/login")
            }
            else
            {
                if(usertype!=="admin")
                {
                    navigate("/login")
                }
            }
    },[])
   
    return(
        <>
            <props.mycomp/>
        </>
    )
}
export default AdminRoutesProtection