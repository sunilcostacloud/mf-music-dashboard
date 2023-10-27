import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { useRefreshMutation } from "../redux/features/auth/authApiSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const token = useSelector(selectCurrentToken)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
                setTrueSuccess(true)
            }
            catch (err) {
                console.error(err)
            }
        }

        if (!token) verifyRefreshToken()

        // eslint-disable-next-line
    }, [])

    let content
    if (isLoading) { // token: no
        //  console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) { // token: no
        //   console.log('error')
        content = (
            <p className='errmsg'>
                {`${error.data?.message} - `}
                <Link to="/auth/signin">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { // token: yes
        //  console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //, token: yes
        //   console.log('token and uninit')
        //  console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin