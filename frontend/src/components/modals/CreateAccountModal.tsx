
import { Modal } from "./Modal"
import { checkEmail, checkPassword, checkUsername } from "../../utils/checkPassword"
import { useState } from "react"
import { ValidationErrs } from "../../utils/APITypes"
import { checkEmailUnique, createAccount } from "../../utils/APICalls"
import { User } from "../../utils/APITypes"
import { useNavigate } from "react-router-dom"
const CreateAccountModal = ({
    closeModal,
    setUser
}: {
    closeModal: () => void,
    setUser: React.Dispatch<React.SetStateAction<User>>
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
    const allInputsFilled = true;
    
    const [passErrs, setPassErrs] = useState<ValidationErrs[]>([])
    const [nameErrs, setNameErrs] = useState<ValidationErrs[]>([])
    const [isEmail, setIsEmail] = useState(true)
    const [failedCreation, setFailedCreation] = useState(false)
    const navigate = useNavigate();
    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement; 
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email as string;
        const password = formJson.password as string;
        const username = formJson.username as string;
        //check password is valid 
        const passChecks = checkPassword(password);
        setPassErrs(passChecks)

        //check email is valid and unique
        const emailValid = checkEmail(email)
        checkEmailUnique(email)
            .then(d => {
                setIsEmail(emailValid && d)
            })
            .catch(e => console.error("Error", e))
        
        //check username
        const usernameChecks = checkUsername(username)
        setNameErrs(usernameChecks)

        //create account in backend if no issues
        if ( !isEmail || passChecks.length || usernameChecks.length ){
            return;
        }

        createAccount(email, password, username)
            .then(d => {
                if (d.success) {
                    // setUserID(d.message)
                    setUser(d.message)
                    navigate("/", { replace: true })
                } else {
                    setFailedCreation(true)
                }
            })
    }

    return (
        <Modal onClick={closeModal}>
            <div className="flex justify-center">
                <div className="w-1/2 py-6">
                    <form action="" className="flex text-center flex-col space-y-3" onSubmit={handleSignUpSubmit}>
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
                            <label htmlFor="username"> Username </label>
                            <input type="text" name="username" id="username" className={inputStyles} />
                        </div>
                        {
                            nameErrs.length ? 
                            <div>
                                {nameErrs.map(d => {
                                    let temp = d.message.split("should ")
                                    let fixedString = temp[1];
                                    fixedString = fixedString.replace("have a ", "")
                                    fixedString = fixedString.replace("not have", "no")
                                    return <div className="text-red-600 text-xs" key={d.validation}>
                                        {fixedString}
                                    </div>
                                })
                                }
                            </div>
                            : <></>
                        }
                        <div className={inputWrapperStyles}>
                            <label htmlFor="password"> Password </label>
                            <input type="password" name="password" id="password" className={inputStyles} />
                        </div>
                        {
                            passErrs.length ?
                            <div>
                                {passErrs.map(d => {
                                    let temp = d.message.split("should ")
                                    let fixedString = temp[1];
                                    fixedString = fixedString.replace("have a ", "")
                                    fixedString = fixedString.replace("not have", "no")
                                    return <div className="text-red-600 text-xs" key={d.validation}>
                                        {fixedString}
                                    </div>
                                })
                                }
                            </div>
                            : <></>
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
                            disabled={!allInputsFilled}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CreateAccountModal
