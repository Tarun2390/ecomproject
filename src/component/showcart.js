// import { useContext } from "react"
import { useEffect, useState } from "react"
// import usercontext from "./usercontext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import {AiOutlineMinusSquare,AiOutlinePlusSquare} from "react-icons/ai";
import { useSelector } from "react-redux";
 

const  Showcart = () => {
	 
	const [noofitem, setnoofitem] = useState([])
	const [cartlist, setcartlist] = useState([])
	const [carttotal, setcarttotal] = useState()
	const [quantity, setquantity] = useState()
	const [flag, setflag] = useState(true)
    // const{user}=useContext(usercontext)
	const navigate=useNavigate()
    
	const {LoggedIn,username}=useSelector((state)=>
	{
		return state.userslice
	})
	useEffect(() => {
		if(LoggedIn)
		{
			fetchcart()
		}
		
	},[LoggedIn])
	 
	useEffect(()=>
	{
		var carttotal=0
		for(var i=0;i<cartlist.length;i++)
		{
			carttotal=carttotal+cartlist[i].tcost
		}
		setcarttotal(carttotal)
		sessionStorage.setItem("billamt",JSON.stringify(carttotal))
	},[cartlist])

	const dec=(qty)=>
	{
		setquantity(qty)
		 quantity>1?setquantity(parseInt(quantity-1)):setquantity(0)
	}
	const inc=(qty)=>
	{
		setquantity(qty)
		var stock = cartlist.stock
		quantity<stock?setquantity(parseInt(quantity+1)):setquantity(stock)	 
	}

	// const update=(qty,id)=>
	// {
	// 	setquantity(qty)
	// 	alert(id)
	// 	alert(qty)
	// 	setflag(false)
	// }
	const cancel=()=>
	{
	  setflag(true)
	}
	const ok=()=>
	{
	  
	}

	const checkout=()=>
	{
		navigate("/checkout")
	}

	const fetchcart = async () =>
	 {
		try 
		{
			const res = await fetch(`http://localhost:9000/api/fetchcart/${username}`)
			if (res.ok)
				var result = await res.json()
			 
			if (result.statuscode === 1)
		    {
				setnoofitem(result.arraylength)
				setcartlist(result.cartdata)
			}
			
		}
		catch(err)
		{
			alert(err)
		}

	}

	const del = async (id) => 
	{
		const conf = window.confirm("are you sure to delete it")
		if (conf === true)
		 {
			try
			{
				const res = await fetch(`http://localhost:9000/api/delcart/${id}`,
				{
					method: "delete"
				})
			if (res.ok) 
			{
				const result = await res.json()
				if (result.statuscode === 1)
			    { 
				  setcartlist([])
				  fetchcart()
				  toast.success("item deleted")
				}
				else
			    {
				   toast.error("error occur")
				}
			}
			}
			catch(err)
			{
				alert(err)
			}
			
		}
	}


	
	const update = async (qty,id) => 
	{
		 setflag(true)
		 
			try
			{
				const res = await fetch(`http://localhost:9000/api/updatecart/${id}`)
			if (res.ok) 
			{
				const result = await res.json()
				if (result.statuscode === 1)
			    { 
				//   setcartlist([])
				//   fetchcart()
				//   toast.success("item deleted")
				setflag(false)
				}
				else
			    {
				   toast.error("error occur")
				}
			}
			}
			catch(err)
			{

			}
			
		
	}

	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
						<li><a href="index.html"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</a></li>
						<li className="active">Cart</li>
					</ol>
				</div>
			</div>

			<div className="login">
				<div className="container">
					
					{
						cartlist.length>0?
							<div>
								<h2>List of items</h2><br />

								<table className="timetable_sub">
									<tbody>
										<tr>
											<th>Name</th>
											<th>Picture</th>
											<th>Rate</th>
											<th>Totalcost</th>
											<th>Quantity</th>
											<th>Delete</th>
										</tr>
										{
											cartlist.map((data, i) =>
												<tr key={i}>
													<td>{data.name}</td>
													<td><img src={`uploads/${data.prodpic}`} alt="prod pic" height="150"></img></td>
													<td>{data.rate}</td>
													<td>{data.tcost}</td>
													<td>{data.qty}</td>
													
													{/* <td>													 
													<button onClick={()=>dec(data.qty)} className="btn btn-link"><AiOutlineMinusSquare/></button>
													<p style={{ fontSize:25 }}></p>
													<button onClick={()=>inc(data.qty)} className="btn btn-link"><AiOutlinePlusSquare/></button>
													</td> */}
													{/* <td>
													{
														flag?<>{data.qty}<br/>
														<button onClick={()=>update(data.qty,data._id)}>Update quantity</button></>:
														<>
														<button onClick={()=>dec(data.qty)} className="btn btn-link"><AiOutlineMinusSquare/></button>
														{quantity}
														<button onClick={()=>inc(data.qty)} className="btn btn-link"><AiOutlinePlusSquare/></button><br/>

														<button onClick={()=>ok(data.qty)}>Ok</button>&nbsp;
													    <button onClick={cancel}>Cancel</button>
														</>
													}
													</td> */}

													<td><button onClick={()=>del(data._id)} className="btn btn-danger" >Delete</button>
													</td>
												</tr>)
										}
									</tbody>
								</table>
					<br/>
					<b>{noofitem} product found in your cart</b><br />
					<b>YOUR CART TOTAL IS Rs-{carttotal}/-</b><br/><br/>
					<button className="btn btn-primary" onClick={checkout}>Checkout</button>
					</div> : <h2>YOUR CART IS EMPTY</h2>
					}
					
				 
				</div>
			</div>
		</>
	)
}
export default Showcart