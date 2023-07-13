import { useState } from "react";
import { config } from "../utils/config";
import { create } from "domain";
import CreateAccountModal from "../components/modals/CreateAccountModal";
import LoginModal from "../components/modals/LoginModal";
import { User } from "../utils/APITypes";

const API_BASE = config.API_BASE;
const Login = ({
  setUser
}: {
  setUser : React.Dispatch<React.SetStateAction<User>>
}) => {
  const handleGoogleLogin = () => {
    window.open(API_BASE + "/auth/google", "_self");
  }

  const [createAccountModal, setCreateAccountModal] = useState(false);
  const showCreateAccountModal = () => {
    setCreateAccountModal(true);
  }

  const [loginModal, setLoginModal] = useState(false);
  const showLoginModal = () => {
    setLoginModal(true);
  }

  return (
    <>
    <div className="bg-black w-screen h-screen text-white flex items-center justify-between">
      <div className="bg-twitter-blue w-1/2 h-screen">
      </div>
      <div className="h-full w-1/2 flex flex-col align-center py-10 px-6 space-y-20">
          <h1 className="text-6xl"> Happening now</h1>
          <h2 className="text-white text-4xl"> Join Twitter today. </h2>
          <div className="w-1/2 text-center space-y-8">
            <div>
              <button className="btn-std border-transparent bg-white text-black w-full"
                onClick={handleGoogleLogin}> 
                Login with Google 
              </button>
              <div className="text-center">or</div>
              <button className="btn-std border-transparent bg-twitter-blue text-white w-full"
                onClick={showCreateAccountModal}
              > 
                Create an account 
              </button>
            </div>
            <div className="w-full">
              <h3 className="text-white mb-2"> Already have an account? </h3>
              <button className="btn-std bg-black text-twitter-blue border-2 w-full" 
                onClick={showLoginModal}
              > 
                Sign In
              </button>
            </div>
          </div>
      </div>
    </div>
    {
      createAccountModal && <CreateAccountModal closeModal={() => setCreateAccountModal(false)} setUser={setUser}/>
    }
    {
      loginModal && <LoginModal closeModal={() => setLoginModal(false)}  setUser={setUser}/>
    }
    </>
  )
}

export default Login
