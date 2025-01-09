import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";

export const EmailVerificationLandingPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('/api/verify-email', { verificationString });
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
            } 
            catch (error) {
                setIsSuccess(false);
                console.log(error);
            }

            setIsLoading(false);
        };

        loadVerification();
    }, [verificationString, setToken]);

    if (isLoading) return <div>Loading...</div>;
    if (!isSuccess) return <EmailVerificationFail />;
    return <EmailVerificationSuccess />;

}

