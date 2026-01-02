import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  Mail,
  Layers,
  MessageSquare,
  LogOut,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/auth/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setProfile(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const remainingCredits =
    profile.monthlyCredits - profile.creditsUsed;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <ProfileItem icon={Mail} label="Email" value={profile.email} />
          <ProfileItem
            icon={Building2}
            label="Company"
            value={profile.companyName || "—"}
          />
          <ProfileItem
            icon={Layers}
            label="Platforms"
            value={
              profile.platforms.length
                ? profile.platforms.join(", ")
                : "—"
            }
          />
          <ProfileItem
            icon={MessageSquare}
            label="Brand Tone"
            value={profile.brandVoice?.tone || "—"}
          />

        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Brand Description
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            {profile.brandVoice?.description || "—"}
          </p>
        </div>

        {/* Credits */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Credits Remaining
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {remainingCredits}
          </p>
        </div>

        {/* Meta */}
        <p className="text-xs text-slate-400">
          Account created on{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
};

const ProfileItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-slate-400 mt-1" />
    <div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </p>
      <p className="text-slate-600 dark:text-slate-400">{value}</p>
    </div>
  </div>
);

export default Profile;
