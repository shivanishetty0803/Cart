import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/profile.css';
 
 const countryCodes = [
       { code: '+91', country: 'India' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+971', country: 'United Arab Emirates' }
    ];
 
    const countryList = [
    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Germany",
    "United Arab Emirates"
];
 
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
   
    const navigate = useNavigate();
 
    const [selectedCode, setSelectedCode] = useState('+91'); // State for Alt Phone Prefix
 
 
   
    const userEmail = localStorage.getItem("userEmail");
 
 
    /**
 * Retrieves the current user's profile data from the backend.
 * Parses phone numbers to separate country codes and populates the form state.
 */
   const fetchProfile = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8082/api/customers/profile/${userEmail}`);
            const data = res.data;
           
            // Logic to separate code from number if it already exists (e.g., +919876543210)
            if (data.altPhone && data.altPhone.startsWith('+')) {
                const code = countryCodes.find(c => data.altPhone.startsWith(c.code));
                if (code) {
                    setSelectedCode(code.code);
                    data.altPhone = data.altPhone.replace(code.code, '');
                }
            }
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
 
    /**
 * Updates the user state in real-time as the user types.
 * Includes specific logic for numeric validation and automatic country code selection.
 * @param {Event} e - Input change event
 */
    const handleChange = (e) => {
        const { name, value } = e.target;
 
        // --- VALIDATION LOGIC ---
        if (name === 'altPhone') {
            // This regex allows ONLY digits (0-9).
            // If the value is empty, we allow it (so users can delete numbers).
            if (value !== '' && !/^\d+$/.test(value)) {
                return; // Exit early so state doesn't update if character is not a digit
            }
           
            // Limit the length to 10-15 digits
            if (value.length > 10) return;
        }
        // ----------------------------
 
        // 2.Automatic Country Code Logic
    if (name === "country") {
        // Find the code where the country name matches the selection
        //  use .includes or exact match depending on your list
        const matchedCountry = countryCodes.find(c =>
            value.toLowerCase().includes(c.country.toLowerCase()) ||
            c.country.toLowerCase().includes(value.toLowerCase())
        );
 
        if (matchedCountry) {
            setSelectedCode(matchedCountry.code);
        }
    }
 
        setUser({ ...user, [name]: value });
    };
 
 
 
/**
 * Submits the updated profile data to the server.
 * Combines selected country prefix with the phone number before sending.
 * @param {Event} e - Form submission event
 */
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Combine the prefix and the 10 digits before sending to backend
            const updatedUser = {
                ...user,
                altPhone: user.altPhone ? `${selectedCode}${user.altPhone}` : ''
            };
            await axios.put(`http://localhost:8082/api/customers/update-profile/${userEmail}`, updatedUser);
            alert("Profile updated successfully!");
            fetchProfile(); // Refresh to update the photo based on gender logic
        } catch (err) {
            console.error("Update failed:", err);
            alert("Update failed. Please try again.");
        }
    };
 
 
    /**
 * Triggers a confirmation dialog and deletes the user's account permanently.
 * Redirects the user to the signup page upon successful deletion.
 */
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
                        onError={(e) => {
                         // If the database path fails, force a fallback to a known working file
                        console.log("Image failed to load, falling back...");
                         e.target.src = user.gender === 'Female' ? '/assets/avatars/female.jpg' : '/assets/avatars/male.jpg';
    }}
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
                            <div className="phone-input-row">
                                <select
                                    className="country-prefix-select"
                                    value={selectedCode}
                                    onChange={(e) => setSelectedCode(e.target.value)}
                                >
                                    {countryCodes.map(c => (
                                        <option key={c.code} value={c.code}>{c.code} ({c.country})</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="altPhone"
                                    placeholder="10-digit number"
                                    value={user.altPhone || ''}
                                    onChange={handleChange}
                                />
                            </div>
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
                        <input
                            type="text"
                            name="zipCode"
                            placeholder="ZIP Code"
                            value={user.zipCode || ''}
                            onChange={handleChange}
                        />
                       
                     
                        <select
                            name="country"
                            value={user.country || ''}
                            onChange={handleChange}
                            className="country-dropdown"
                        >
                            <option value="">Select Country</option>
                            {countryList.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
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