'use client'

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import useRegiserModal from "@/hooks/useRegisterModal";
import axios from "axios";
import toast from "react-hot-toast";

import { signIn } from 'next-auth/react'

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegiserModal();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () =>{
        if(isLoading){
            return;
        }
        registerModal.onClose();;
        loginModal.onOpen();
    }

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            const res = await axios.post('/api/register', {
                email, password, username, name
            })

            await signIn('credentials', {
                // redirect: false,
                email,
                password,
            })
            toast.success('User Registered Successfully!')

            registerModal.onClose();
        }catch(error) {
            console.log(error);
            toast.error('Something went wrong!')
        }finally{
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">

            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>

            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading}/>

            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading}/>

            <Input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>

        </div>
    )

    const footerContent =(
        <div>
            <p className="text-neutral-400 text-xl text-center">Already have an account? <span className="text-white hover:underline hover:cursor-pointer" onClick={toggleModal}> Sign in</span></p>
        </div>
    )
    
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Create an account" actionLabel="Sign up" onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    )
}

export default RegisterModal;