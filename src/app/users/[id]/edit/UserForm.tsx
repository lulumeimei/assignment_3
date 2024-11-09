import { User } from "@/types/user";
import { useState } from "react";

export default function UserForm({
  user,
  onSubmit,
}: {
  user: User;
  onSubmit: (user: User) => void;
}) {
  const [formData, setFormData] = useState(user);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [existingPassword, setExistingPassword] = useState<string>(
    user?.password || ""
  );
  const [newPassword, setNewPassword] = useState<string>("");
  const [isExistingPasswordVisible, setIsExistingPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate phone number if it's being changed
    if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }

    // Validate password if it's being changed
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Example regex for a 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = (password: string) => {
    // Password must:
    // - Be at least 8 characters long
    // - Include at least one uppercase letter
    // - Include at least one lowercase letter
    // - Include at least one digit
    // - Include at least one special character from the set [@#$%^&+=!]
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!passwordRegex.test(password)) {
      console.log("Password does not meet criteria");
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!phoneError && !passwordError) {
      onSubmit(formData);
    }
  };

  const toggleExistingPasswordVisibility = () => {
    setIsExistingPasswordVisible((prevState) => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {phoneError && (
          <p className="text-red-500 text-sm mt-1">{phoneError}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Existing Password
        </label>
        <div className="flex items-center">
          <input
            type={isExistingPasswordVisible ? "text" : "password"}
            value={existingPassword}
            name="existingPassword"
            readOnly={true}
            onChange={(e) => setExistingPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={toggleExistingPasswordVisibility}
            className="ml-2 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
          >
            {isExistingPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          New Password
        </label>
        <div className="flex items-center">
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            name="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              handleChange(e);
            }}
            placeholder="Enter new password"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="ml-2 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
          >
            {isNewPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
