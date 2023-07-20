
import { Modal } from "./Modal"
import { checkEmail, checkPassword, checkUsername } from "../../utils/checkPassword"
import { useCallback, useState } from "react"
import { ValidationErrs } from "../../utils/APITypes"
import { checkEmailUnique, createAccount, loginToAccount } from "../../utils/APICalls"
import { User } from "../../utils/APITypes"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const LoginModal = ({
    closeModal,
    setUser
}:{
    closeModal: () => void,
    setUser: (user1:User) => void
}) => {
    const inputStyles = `
        focus:outline-none 
        focus:ring-0
        w-full
    `
    const inputWrapperStyles = `
        focus-within:border-twitter-blue
        border-2
        border-gray-200
        rounded-lg
        flex
        justify-between
        px-3
        py-2
        gap-3
        items-center
    `
    // const allInputsFilled = true; //need to somehow onChange the form inputs
        //to check whenever an input is changed to enable/disable the submit button
    
    const navigate = useNavigate();
    // const closeSidebarThenLink = useCallback((route: string) => {
    //     navigate(route, { replace: true })
    // }, [navigate]);

    const [isEmail, setIsEmail] = useState(true)
    const [failedLogin, setFailedLogin] = useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement; 
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email as string;
        const password = formJson.password as string;

        //check email is valid 
        const emailValid = checkEmail(email)
        setIsEmail(emailValid)
        if (!emailValid) { return; }
        
        setFailedLogin(false)

        loginToAccount(email, password)
            .then(d => {
                if ( d.success ){
                    // setUserID(d.message)
                    setUser(d.message)
                    navigate("/", {replace: true})
                } else {
                    setFailedLogin(true)
                }
            })
    }

    const [showPass, setShowPass] = useState(false);

    return (
        <Modal onClick={closeModal}>
            <div className="flex justify-center">
                <div className="w-1/2 py-6">
                    <form action="" className="flex text-center flex-col space-y-3" onSubmit={handleSubmit}>
                        <div className={inputWrapperStyles}>
                            <label htmlFor="email"> Email </label>
                            <input type="text" name="email" id="email" className={inputStyles}/>
                        </div>
                        {
                            !isEmail ?
                            <div className="text-xs text-red-600">
                                invalid email
                            </div>
                            :<></>
                        }
                        <div className={inputWrapperStyles}>
                            <label htmlFor="password"> Password </label>
                            <input type={showPass ? "text" : "password"} name="password" id="password" className={inputStyles} />
                            {
                                showPass ?
                                <button type="button" onClick={() => setShowPass(false)}>
                                    <AiOutlineEyeInvisible/>
                                </button>
                                :
                                <button type="button" onClick={() => setShowPass(true)}>
                                    <AiOutlineEye/>
                                </button>
                            }
                        </div>
                        {
                            failedLogin ? 
                            <div className="text-xs text-red-600">
                                Invalid email and/or password. Please try again.
                            </div>
                            :
                            <></>
                        }
                        <button type="submit" value="Sign Up" 
                            className="
                                rounded-full 
                                px-3 
                                py-2 
                                disabled:bg-gray-300
                                bg-twitter-blue
                                text-white
                                btn-std
                            "
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal
