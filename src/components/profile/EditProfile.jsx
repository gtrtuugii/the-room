import React, { useState } from 'react';
import { updateProfile, updatePassword } from 'firebase/auth';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebase';
import './editprofile.css';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const EditProfile = ({ currentUser, setTrigger }) => {
    const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName || '');
    const [newPhotoURL, setNewPhotoURL] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('')

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
          const selectedImage = e.target.files[0];
          
          setNewPhotoURL(URL.createObjectURL(selectedImage));
        }
      };
      // Validation Check for input
    const validateRegistrationInput = async (username, password) => {
        const errors = {};
  
        // Check for illegal usernames or if username is taken
        const illegalUsernames = ['admin', 'root', 'superuser', 'Admin', 'Moderator', 'Root', 'Superuser', 'SuperUser', 'Anonymous', 'Anon' ]; // Initial list
  
        // Fetch all display names from the Firestore collection 'users'
        const usersCollectionRef = collection(db, 'users'); 
        const querySnapshot = await getDocs(usersCollectionRef);
        const allDisplayNames = querySnapshot.docs.map((doc) => doc.data().displayName);
  
        // Add allDisplayNames to the illegalUsernames list
        illegalUsernames.push(...allDisplayNames);
  
        if (illegalUsernames.includes(newDisplayName)) {
          errors.username = 'Username is not allowed';
        }
  
        // Check password requirements
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
          errors.password = 'Password must have at least 8 characters, 1 uppercase letter, and 1 number';
        }
  
        return errors;
        };

    const handleSubmit = async (e) => {
      e.preventDefault();
          
            // Validation checks
      const validationErrors = validateRegistrationInput(newDisplayName, newPassword);
          
      if (Object.keys(validationErrors).length > 0) {
              // There are validation errors, handle them
        setErrorMessage('Validation errors encountered');
        setSuccessMessage('');
        return; // Exit early
      }
          
      try {
        setLoadingMessage("Please wait while we are updating your information")
              if (newDisplayName !== currentUser.displayName) {
                await updateProfile(auth.currentUser, {
                  displayName: newDisplayName,
                });
                await updateDoc(doc(db, 'users', currentUser.uid), {
                  displayName: newDisplayName,
                });
              }
          
              if (newPhotoURL) {
                
                const response = await fetch(newPhotoURL); // Download the image
                const blob = await response.blob(); // Convert the response to a Blob
                const storageRef = ref(storage, 'user-profiles/' + `${auth.currentUser.email + Date.now()}`);
                await uploadBytesResumable(storageRef, blob); // Upload the Blob
                
          
                const downloadURL = await getDownloadURL(storageRef);
                
                await updateProfile(auth.currentUser, {
                    photoURL: downloadURL,
                  });

                


                await updateDoc(doc(db, 'users', currentUser.uid), {
                  photoURL: downloadURL,
                });

                
              }
          
              if (newPassword) {
                await updatePassword(auth.currentUser, newPassword);
              }
          
              setSuccessMessage('Profile updated successfully!');
              setErrorMessage('');
            } catch (error) {
              setErrorMessage('Error updating profile: ' + error.message);
              setSuccessMessage('');
            }
            setLoadingMessage('')
            setTrigger(false); // Close the edit profile popup
          };
          

  return (
    setTrigger ? ( // Fix here
      <div className="edit-profile">
        <div className="edit-profile-popup">
            <div className="card-header">
                <h2>Edit Profile</h2>
                <button className="close-button" onClick={() => setTrigger(false)}>
                    X
                </button>
            </div>
            <div className="card-body">
              {successMessage && <div className="success-message">{successMessage}</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                <label>
                  Display Name:
                  <input
                    className="form-control"
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                  />
                </label>
                <label>
                  Upload New Photo:
                  <input className="form-control" type="file" accept="image/*" onChange={handlePhotoChange} />
                  {newPhotoURL && <img src={newPhotoURL} alt="New Profile" />}
                </label>
                <label>
                  New Password:
                  <input
                    className="form-control"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                {loadingMessage && <div className="loading">{loadingMessage}</div>}
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
              </form>
            </div>
            <div className="card-footer">
            
              {successMessage && <div className="success-message">{successMessage}</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          

        </div>
      </div>
    ) : (
      ''
    )
  );
};

export default EditProfile;
