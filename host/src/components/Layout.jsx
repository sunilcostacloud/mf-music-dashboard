import { Outlet, useLocation } from "react-router-dom";
import { saveToken, selectCurrentToken } from "../redux/features/auth/authSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../redux/features/auth/authApiSlice";
import Header from "./header/Header";
import SideMenu from "./sidebar/SideMenu";

export function Layout() {
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken);

  const { pathname } = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (pathname.toLowerCase() == "/auth/signin" || pathname.toLowerCase() == "/auth/signup" || pathname.toLowerCase() == "/unauthorized") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname])



  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh] = useRefreshMutation()

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.detail.type === 'authType') {
        dispatch(saveToken(event.detail.data))
      }
    };

    window.addEventListener('tokenEvent', handleEvent);

    return () => {
      window.removeEventListener('tokenEvent', handleEvent);
    };
  }, []);

  // console.log("checkTokenHost", token)

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

  return (
    <>
      {show === true && (
        <div>
          <Header />
        </div>
      )}
      <div style={{ display: show ? "flex" : "block" }}>
        {show === true && (
          <div>
            <SideMenu />
          </div>
        )}
        <div style={{ width: "100%" }} >
          <Outlet />
        </div>
      </div>
    </>
  );
}
