
import { Modal } from "./Modal"
import { checkEmail, checkPassword, checkUsername } from "../../utils/checkPassword"
import { useState } from "react"
import { ValidationErrs } from "../../utils/APITypes"
const CreateAccountModal = ({
    closeModal
}:{
    closeModal: () => void,
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
    const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement; 
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        //check password is valid 
        const passChecks = checkPassword(formJson.password as string);
        setPassErrs(passChecks)

        //check email is valid
        setIsEmail(checkEmail(formJson.email as string));

        //check that email hasn't been used

        //check username
        const usernameChecks = checkUsername(formJson.username as string)
        console.log(usernameChecks)
        setNameErrs(usernameChecks)

        //create account in backend
        if ( !isEmail || passChecks.length || usernameChecks.length ){
            return;
        }

        console.log("MAKE THE ACCOUNT MAN")
    }

    return (
        <Modal onClick={closeModal}>
            <div className="flex justify-center">
                <div className="w-1/2 py-6">
                    <form action="/createAccount" className="flex text-center flex-col space-y-3" onSubmit={handleSignUpSubmit}>
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
