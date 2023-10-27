import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import jwtDecode from "jwt-decode";

const Header = () => {
    const token = useSelector(selectCurrentToken)

    const [username, setUsername] = useState("")

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded?.UserInfo?.username)
        } else {
            setUsername("")
        }
    }, [token])

    const navigate = useNavigate();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error,
        reset
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate('/auth/signin')
            reset()
        } else if (isError) {
            alert(JSON.stringify(error.data?.message))
            reset()
        }
    }, [isSuccess, navigate])

    return (
        <div className={styles.HeaderParent} >
            <div style={{ width: "99%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className={styles.heading} onClick={() => navigate('/')} >
                    Dashboard
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div>
                        <h3 style={{ color: "#ff014f" }} >{username}</h3>
                    </div>
                    <div>
                        {token ?
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={sendLogout}
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging Out..." : "Logout"}
                            </Button> : <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => navigate('/auth/signin')}
                            >
                                Sign In
                            </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header