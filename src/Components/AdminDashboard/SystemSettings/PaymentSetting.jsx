import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../../../Utilities/BaseUrl';


const PaymentSetting = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all settings
  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/settings`);
      // Filter only doctor and pharmacist certificate fees
      const filtered = res.data.filter(
        (s) =>
          s.setting_key === 'doctor_certificate_fee' ||
          s.setting_key === 'pharmacist_certificate_fee'
      );
      setSettings(filtered || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      alert('Failed to fetch settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Update single setting
  const updateSetting = async (key, value) => {
    try {
      await axios.put(`${BaseUrl}/${key}`, { value });
      alert(`${key.replace('_', ' ')} updated successfully!`);
      // Update local state
      setSettings((prev) =>
        prev.map((s) => (s.setting_key === key ? { ...s, setting_value: value } : s))
      );
    } catch (error) {
      console.error('Error updating setting:', error);
      alert('Failed to update setting.');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>

      {settings.map((setting) => (
        <div key={setting.setting_key} className="mb-4">
          <label className="block mb-1 font-medium">{setting.description}</label>
          <input
            type="number"
            value={setting.setting_value}
            onChange={(e) =>
              setSettings((prev) =>
                prev.map((s) =>
                  s.setting_key === setting.setting_key
                    ? { ...s, setting_value: e.target.value }
                    : s
                )
              )
            }
            placeholder="Enter value"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() => updateSetting(setting.setting_key, setting.setting_value)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentSetting;
