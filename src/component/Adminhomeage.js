import { Link } from "react-router-dom"

const Adminhomepage=()=>
{
    return(
        <>
        <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order Summary</li>
                    </ol>
                </div>
            </div>

         <div className="container">
                <div className="login">
                    <h3 align="center"> welcome admin</h3>
                </div>
             </div>
        </>
    )
}
export default Adminhomepage