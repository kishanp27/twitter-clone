'use client'

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import Input from "../Input";
import Modal from "./Modal";
import useRegiserModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegiserModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const toggleModal = () =>{
        if(isLoading){
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();
    }

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                email: email,
                password: password,
            })
            loginModal.onClose();
            // currentUserMutate();
        }catch(error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }, [loginModal, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
            <Input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
        </div>
    )

    const footerContent =(
        <div>
            <p className="text-neutral-400 text-xl text-center">Don't have an account? <span className="text-white hover:underline hover:cursor-pointer" onClick={toggleModal}>Sign up</span></p>
        </div>
    )
    
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Sign in" onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent}/>
    )
}

export default LoginModal;