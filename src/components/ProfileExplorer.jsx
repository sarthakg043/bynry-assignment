import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, MapPin, User, X, Plus, Loader } from 'lucide-react';

// Main App Component
const ProfileExplorer = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentProfileToEdit, setCurrentProfileToEdit] = useState(null);
  const [mapError, setMapError] = useState(null);

  // Fetch profiles data
  useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      const sampleProfiles = [
        {
          id: 1,
          name: 'Emma Johnson',
          photo: 'https://img.freepik.com/free-photo/portrait-expressive-young-woman_1258-48167.jpg?t=st=1743512561~exp=1743516161~hmac=455889964dff6037dbeb917ae4ef7a12a0b3a4511f0f9442962028616e78531c&w=2000',
          description: 'Software Engineer with expertise in React and Node.js',
          address: '123 Tech Avenue, San Francisco, CA',
          coordinates: { lat: 37.7749, lng: -122.4194 },
          email: 'emma.johnson@example.com',
          phone: '(555) 123-4567',
          interests: ['Coding', 'Hiking', 'Photography']
        },
        {
          id: 2,
          name: 'Liam Williams',
          photo: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1743511280~exp=1743514880~hmac=d985cbea6be7bfb99393441e40c1a106fdd51d78c03fbbd7a04b978a5bb573a0&w=2000',
          description: 'UX Designer focused on creating intuitive user experiences',
          address: '456 Design Street, New York, NY',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          email: 'liam.williams@example.com',
          phone: '(555) 234-5678',
          interests: ['Design', 'Art', 'Travel']
        },
        {
          id: 3,
          name: 'Sophia Chen',
          photo: 'https://img.freepik.com/free-photo/smiling-woman-standing-supermarket_107420-96366.jpg?t=st=1743512655~exp=1743516255~hmac=45d0576a4b7e3c84168e9b66ea75f2149f07c3b569dde95dcab35e39bdeb6e76&w=2000',
          description: 'Data Scientist specializing in machine learning algorithms',
          address: '789 Data Drive, Seattle, WA',
          coordinates: { lat: 47.6062, lng: -122.3321 },
          email: 'sophia.chen@example.com',
          phone: '(555) 345-6789',
          interests: ['AI', 'Mathematics', 'Reading']
        },
        {
          id: 4,
          name: 'Noah Rodriguez',
          photo: 'https://img.freepik.com/free-photo/confused-shocked-guy-raising-eyebrows-standing-stupor_176420-19590.jpg?t=st=1743512596~exp=1743516196~hmac=ad3783138a1890805d53db9913097571221c71a5583d40efa827a33297954df0&w=2000',
          description: 'Full-stack developer with 5+ years of experience',
          address: '321 Code Blvd, Austin, TX',
          coordinates: { lat: 30.2672, lng: -97.7431 },
          email: 'noah.rodriguez@example.com',
          phone: '(555) 456-7890',
          interests: ['JavaScript', 'Cycling', 'Music']
        },
        {
          id: 5,
          name: 'Olivia Kim',
          photo: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?t=st=1743512732~exp=1743516332~hmac=cb265e038136b9cf18226898e5c5a09ba292b279cb21fb874fa3e2647eae50f0&w=2000',
          description: 'Product Manager with strong technical background',
          address: '654 Product Lane, Boston, MA',
          coordinates: { lat: 42.3601, lng: -71.0589 },
          email: 'olivia.kim@example.com',
          phone: '(555) 567-8901',
          interests: ['Strategy', 'Cooking', 'Yoga']
        }
      ];
      
      setProfiles(sampleProfiles);
      setFilteredProfiles(sampleProfiles);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter profiles based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = profiles.filter(profile => 
        profile.name.toLowerCase().includes(lowercaseQuery) || 
        profile.description.toLowerCase().includes(lowercaseQuery) ||
        profile.address.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredProfiles(filtered);
    }
  }, [searchQuery, profiles]);

  // Handle profile selection
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowProfileDetail(false);
  };

  // Show profile details
  const handleShowProfileDetail = (profile) => {
    setSelectedProfile(profile);
    setShowProfileDetail(true);
  };

  // Add new profile
  const handleAddProfile = () => {
    setCurrentProfileToEdit({
      id: profiles.length + 1,
      name: '',
      photo: '/api/placeholder/100/100',
      description: '',
      address: '',
      coordinates: { lat: 0, lng: 0 },
      email: '',
      phone: '',
      interests: []
    });
    setShowAddEditForm(true);
  };

  // Edit profile
  const handleEditProfile = (profile) => {
    setCurrentProfileToEdit({...profile});
    setShowAddEditForm(true);
  };

  // Delete profile
  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
      setProfiles(updatedProfiles);
      setFilteredProfiles(updatedProfiles);
      
      if (selectedProfile && selectedProfile.id === profileId) {
        setSelectedProfile(null);
      }
    }
  };

  // Save profile (add or edit)
  const handleSaveProfile = (profileData) => {
    // Check if editing existing profile or adding new one
    if (profiles.some(p => p.id === profileData.id)) {
      // Edit existing profile
      const updatedProfiles = profiles.map(profile => 
        profile.id === profileData.id ? profileData : profile
      );
      setProfiles(updatedProfiles);
      setFilteredProfiles(updatedProfiles);
      
      // Update selected profile if it's the one being edited
      if (selectedProfile && selectedProfile.id === profileData.id) {
        setSelectedProfile(profileData);
      }
    } else {
      // Add new profile
      const newProfiles = [...profiles, profileData];
      setProfiles(newProfiles);
      setFilteredProfiles(newProfiles);
    }
    
    setShowAddEditForm(false);
    setCurrentProfileToEdit(null);
  };

  // Map error handler
  const handleMapError = (error) => {
    setMapError(`Error loading map: ${error.message}`);
    setTimeout(() => setMapError(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Explorer</h1>
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`px-4 py-2 rounded-md transition-colors ${isAdminMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-800'}`}
          >
            {isAdminMode ? 'Exit Admin Mode' : 'Admin Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-72px)] container mx-auto flex-grow p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Left Side - Profiles List */}
        <div className="w-full h-full md:w-1/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Admin Controls */}
          {isAdminMode && (
            <div className="mb-4">
              <button 
                onClick={handleAddProfile}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
              >
                <Plus size={18} />
                Add New Profile
              </button>
            </div>
          )}

          {/* Profiles List */}
          <div className="h-full flex-grow overflow-auto">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin text-blue-500" size={40} />
              </div>
            ) : filteredProfiles.length > 0 ? (
              <div className="space-y-4">
                {filteredProfiles.map((profile) => (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                    isSelected={selectedProfile && selectedProfile.id === profile.id}
                    onSelect={handleProfileSelect}
                    onShowDetail={handleShowProfileDetail}
                    isAdminMode={isAdminMode}
                    onEdit={handleEditProfile}
                    onDelete={handleDeleteProfile}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No profiles match your search.
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map or Profile Detail */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
          {showProfileDetail && selectedProfile ? (
            <ProfileDetail 
              profile={selectedProfile} 
              onClose={() => setShowProfileDetail(false)}
              onShowMap={() => setShowProfileDetail(false)}
            />
          ) : (
            <MapView 
              selectedProfile={selectedProfile}
              onError={handleMapError}
            />
          )}
          
          {/* Map Error Display */}
          {mapError && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
              {mapError}
            </div>
          )}
        </div>
      </main>

      {/* Profile Add/Edit Modal */}
      {showAddEditForm && (
        <ProfileForm 
          profile={currentProfileToEdit}
          onSave={handleSaveProfile}
          onCancel={() => {
            setShowAddEditForm(false);
            setCurrentProfileToEdit(null);
          }}
        />
      )}
    </div>
  );
};

// Profile Card Component
const ProfileCard = ({ profile, isSelected, onSelect, onShowDetail, isAdminMode, onEdit, onDelete }) => {
  return (
    <div 
      className={`p-4 border rounded-md transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{profile.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{profile.description}</p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            <MapPin size={12} /> {profile.address}
          </p>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between">
        <div>
          <button 
            onClick={() => onSelect(profile)}
            className={`text-sm px-3 py-1 rounded-md mr-2 ${
              isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            View on Map
          </button>
          <button 
            onClick={() => onShowDetail(profile)}
            className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Details
          </button>
        </div>
        
        {isAdminMode && (
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(profile);
              }}
              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
              title="Edit Profile"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(profile.id);
              }}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
              title="Delete Profile"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Map View Component
const MapView = ({ selectedProfile, onError }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate map loading
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      // Simulate occasional map loading error for demonstration
      if (Math.random() < 0.05) {
        onError(new Error("Failed to load map resources"));
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedProfile, onError]);

  return (
    <div className="relative h-full min-h-96">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Loader className="mx-auto animate-spin text-blue-500 mb-2" size={40} />
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="h-full">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-blue-50 opacity-50" />
          
          {/* Map Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {selectedProfile ? (
              <div className="relative w-4/5 h-4/5">
                {/* Simulated Map */}
                <div className="absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center max-w-md p-6">
                    <div className="inline-block p-2 bg-white rounded-full mb-4">
                      <MapPin size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{selectedProfile.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedProfile.address}</p>
                    <div className="text-sm text-gray-500">
                      <p>Latitude: {selectedProfile.coordinates.lat.toFixed(4)}</p>
                      <p>Longitude: {selectedProfile.coordinates.lng.toFixed(4)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Map Overlay Elements */}
                <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md text-xs">
                  <p>Map data would be loaded from external service like Google Maps or Mapbox</p>
                </div>
              </div>
            ) : (
              <div className="text-center max-w-md p-6">
                <div className="inline-block p-4 bg-gray-200 rounded-full mb-4">
                  <MapPin size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Profile Selected</h3>
                <p className="text-gray-600">
                  Select a profile from the list to view their location on the map.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Detail Component
const ProfileDetail = ({ profile, onClose, onShowMap }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-semibold">Profile Details</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-grow p-6 overflow-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Image */}
          <div className="text-center">
            <img 
              src={profile.photo} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
          
          {/* Profile Information */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
            <p className="text-gray-600 mb-4">{profile.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span>{profile.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{profile.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{profile.email}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onShowMap}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <MapPin size={18} />
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile Add/Edit Form Component
const ProfileForm = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});
  const [interestInput, setInterestInput] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: {
        ...formData.coordinates,
        [name]: parseFloat(value) || 0
      }
    });
  };
  
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()]
      });
      setInterestInput('');
    }
  };
  
  const handleRemoveInterest = (index) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {profile.name ? `Edit Profile: ${profile.name}` : 'Add New Profile'}
          </h2>
          <button 
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Basic Information</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
            
            {/* Contact and Location */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Contact & Location</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Latitude</label>
                  <input
                    type="number"
                    name="lat"
                    value={formData.coordinates.lat}
                    onChange={handleCoordinateChange}
                    step="0.0001"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Longitude</label>
                  <input
                    type="number"
                    name="lng"
                    value={formData.coordinates.lng}
                    onChange={handleCoordinateChange}
                    step="0.0001"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Interests */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-4">Interests</h3>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add an interest"
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md"
                >
                Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {interest}
                  <button 
                    onClick={() => handleRemoveInterest(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
        </div>

        {/* Error Display */}
        {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
                <p>Please fix the following errors:</p>
                <ul className="list-disc list-inside">
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
            
            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
                <button 
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                >
                Cancel
                </button>
                <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                Save Profile
                </button>
            </div>
        </form>
        </div>
    </div>
    );
}
// Export the main component
export default ProfileExplorer;
// Note: The ProfileExplorer component is the main component that combines all the other components.
// The ProfileCard, MapView, ProfileDetail, and ProfileForm components are used within it.
// The code is structured to allow for easy modification and extension in the future.