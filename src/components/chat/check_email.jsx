import React, { useEffect } from 'react';
import './styling/check_email.css'; // Create this CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';

const CheckEmail = ({ user }) => {

    const navigate = useNavigate();
    const handleResendVerification = async () => {
        try {
          await sendEmailVerification(user);
          alert('Verification email sent');
        } catch (error) {
          alert('Error sending verification email:', error);
        }
      };

    useEffect(() => {
      if (user && user.emailVerified){
        navigate('/home');
      }
        //if (!user) return navigate("/login");
    }, [user]);

    
    return (
        <div className='check-email'>
            <div className='check-email-container'>
                <h2>Check Your Email</h2>
                <p>A verification email has been sent to your inbox. 
                    Please follow the instructions in the email to verify your account.

                </p>
                <button  className='btn' onClick={handleResendVerification}>Resend Verification Email</button>.
                <h5>
                <Link to='/login'>Return to Login</Link>
                </h5>
            </div>
        </div>
    );
};

export default CheckEmail;
