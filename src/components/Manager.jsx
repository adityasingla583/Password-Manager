import React, { useEffect, useRef, useState } from 'react'
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
    const ref = useRef(null);
    const passwordRef = useRef(null);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getpasswords = async () => {
    try {
        let req = await fetch("http://localhost:5000/");
        let passwords = await req.json();
        console.log(passwords);
        setPasswordArray(passwords);
    } catch (error) {
        console.error("Failed to fetch passwords:", error);
    }
};
    
    useEffect(() => {
        getpasswords()
    }, [])


    const savePassword = async() => {
        if (form.site.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
            alert("Field can't be empty!");
            return;
        }
        await fetch("http://localhost:5000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
        setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
        await fetch("http://localhost:5000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
        setform({ site: "", username: "", password: "" });
    }
    const deletePassword = async(id) => {
        let c=confirm("Do you really want to delete this PassOP!")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!=id));
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
            await fetch("http://localhost:5000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
        }
    }

    const editPassword = (id) => {
        setform({...passwordArray.filter(item=>item.id===id)[0],id:id});
        setPasswordArray(passwordArray.filter(item=>item.id!=id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const showPassword = () => {
        // alert("Pass")
        console.log(ref.current.src)
        if (ref.current.src.includes("assets/close_eye.jpeg")) {
            passwordRef.current.type = "text"
            ref.current.src = "../src/assets/Eye.jpeg"
        }
        else {
            passwordRef.current.type = "password"
            ref.current.src = "../src/assets/close_eye.jpeg"
        }
    }
    const copyText = (e, text) => {
        alert("Copied to Clipboard!")
        navigator.clipboard.writeText(text);
    }
    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,244,170,0.5)] opacity-50 blur-[80px]"></div></div>

            <div className="mx-auto max-w-7xl md:px-40 md:py-16">

                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-700"> &lt;</span>
                    <span>Pass</span>
                    <span className="text-green-700">OP &gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-3">
                    <input name='site' value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1 outline-none' type="text" />
                    <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row w-full justify-evenly">
                        <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='mx-auto rounded-full border border-green-500 lg:w-[35%] w-full  px-4 py-1 outline-none' type="text" />
                        <div className="relative w-full lg:max-w-[35%] mx-auto">
                            <input ref={passwordRef} name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1 outline-none' id="password" type="password" />
                            <span className='absolute right-3 cursor-pointer top-1' onClick={showPassword}><img ref={ref} className='w-6' src="../src/assets/close_eye.jpeg" alt="" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full p-2 w-fit px-8 mx-auto hover:bg-green-500 gap-2'><img className='h-8' src="../src/assets/add.svg" alt="" />Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='max-w-[45vw] py-2'>Site</th>
                                    <th className='max-w-[20vw] py-2'>Username</th>
                                    <th className='max-w-[20vw] py-2'>Password</th>
                                    <th className='max-w-[15vw] py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='gap-1 mx-auto max-w-[45vw] text-wrap relative flex items-center justify-center '>
                                                <a className='max-w-[80%] text-ellipsis break-words' target='_blank' href={item.site}>{item.site}</a>
                                                <div className='lordCopyIcon cursor-pointer' onClick={(e) => copyText(e, item.site)}> <lord-icon className={"w-5"}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">
                                                </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='gap-1 mx-auto max-w-[20vw] text-wrap relative flex items-center justify-center'>
                                                <div className='max-w-[80%] text-ellipsis break-words'>{item.username}</div>
                                                <div className='lordCopyIcon cursor-pointer max-w-[80%] ' onClick={(e) => copyText(e, item.username)}> <lord-icon className={"w-5"}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">
                                                </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='gap-1 mx-auto max-w-[20vw] text-wrap flex items-center justify-center'>
                                                <div className='max-w-[80%] text-ellipsis break-words'>{item.password}</div>
                                                <div className='lordCopyIcon cursor-pointer max-w-[20%] ' onClick={(e) => copyText(e, item.password)}> <lord-icon className={"w-5"}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">
                                                </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='max-w-[15vw] flex justify-center items-center'>
                                            <span onClick={()=>editPassword(item.id)} className=''>
                                                <img className='w-5' src="../src/assets/edit.png" alt="Edit" />
                                            </span>
                                                <span onClick={()=>deletePassword(item.id)} className='m-1'><lord-icon className={"w-5"}
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover">
                                            </lord-icon></span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
