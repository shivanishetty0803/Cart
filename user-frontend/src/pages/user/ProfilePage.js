import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/profile.css'; // We will create this next

const ProfilePage = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phone: '',
        altPhone: '',
        gender: '',
        age: '',
        dob: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        profilePhoto: ''
    });

    const [loading, setLoading] = useState(true);
   // const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Change this to the email of the logged-in user (usually from localStorage)
    const userEmail = localStorage.getItem("userEmail");

   const fetchProfile = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8082/api/customers/profile/${userEmail}`);
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching profile", err);
            setLoading(false);
        }
    }, [userEmail]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // --- NEW VALIDATION LOGIC ---
        if (name === 'altPhone') {
            // This regex allows ONLY digits (0-9). 
            // If the value is empty, we allow it (so users can delete numbers).
            if (value !== '' && !/^\d+$/.test(value)) {
                return; // Exit early so state doesn't update if character is not a digit
            }
            
            // Optional: Limit the length to 10-15 digits
            if (value.length > 10) return; 
        }
        // ----------------------------

        setUser({ ...user, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8082/api/customers/update-profile/${userEmail}`, user);
            alert("Profile updated successfully!");
            fetchProfile(); // Refresh to update the photo based on gender logic
        } catch (err) {
            console.error("Update failed:", err);
            alert("Update failed. Please try again.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure? This will permanently delete your account.")) {
            try {
                await axios.delete(`http://localhost:8082/api/customers/delete-account/${userEmail}`);
                alert("Account deleted.");
                navigate('/signup');
            } catch (err) {
                alert("Delete failed.");
            }
        }
    };

    if (loading) return <div className="loader">Loading Profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <div className="profile-header">
                    {/* Requirement: Photo changes based on gender from backend */}
                    <img 
                        src={user.profilePhoto || (user.gender === 'Female' ? '/assets/avatars/female.jpg' : '/assets/avatars/male.jpg')} 
                        alt="Profile" 
                        className="profile-avatar" 
                    />
                </div>

                <form onSubmit={handleUpdate} className="profile-form">
                    <div className="form-section">
                        <h3>Personal Information:</h3>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" value={user.fullName} readOnly className="read-only" />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" value={user.email} readOnly className="read-only" />
                        </div>
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input type="text" value={user.phone} readOnly className="read-only" />
                        </div>
                        <div className="input-group">
                            <label>Alternate Phone Number</label>
                            <input type="text" name="altPhone" value={user.altPhone || ''} onChange={handleChange} />
                        </div>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Gender</label>
                                <select name="gender" value={user.gender || ''} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Age</label>
                                <input type="number" name="age" value={user.age || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Shipping Address</h3>
                        <div className="input-row">
                        <input type="text" name="street" placeholder="Street" value={user.street || ''} onChange={handleChange} />
                        </div>
                        <div className="input-row">
                            <input type="text" name="city" placeholder="City" value={user.city || ''} onChange={handleChange} />
                            <input type="text" name="state" placeholder="State" value={user.state || ''} onChange={handleChange} />
                        </div>
                        <div className="input-row">
                            <input type="text" name="zipCode" placeholder="ZIP Code" value={user.zipCode || ''} onChange={handleChange} />
                            <input type="text" name="country" placeholder="Country" value={user.country || ''} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" onClick={handleDelete} className="delete-btn">Delete Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;