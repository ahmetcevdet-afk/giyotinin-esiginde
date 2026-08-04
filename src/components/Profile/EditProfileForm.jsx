import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

import Button from "../Button/Button";
import ProfileBasicSection from "./ProfileBasicSection";
import ProfileContactSection from "./ProfileContactSection";

import useUnsavedChanges from "../../hooks/useUnsavedChanges";

import "./EditProfileForm.css";

function EditProfileForm() {

    const {
        user,
        profile,
        refreshProfile,
    } = useAuth();

    const initialized = useRef(false);

    const [loading, setLoading] = useState(false);

    const [isDirty, setIsDirty] = useState(false);

    const [form, setForm] = useState({

        full_name: "",

        username: "",

        bio: "",

        country: "",

        education_level: "",

        field: "",

        institution: "",

        website: "",

        linkedin: "",

        orcid: "",

    });

    useUnsavedChanges(isDirty);

    useEffect(() => {

        if (!profile || initialized.current) return;

        setForm({

            full_name: profile.full_name || "",

            username: profile.username || "",

            bio: profile.bio || "",

            country: profile.country || "",

            education_level: profile.education_level || "",

            field: profile.field || "",

            institution: profile.institution || "",

            website: profile.website || "",

            linkedin: profile.linkedin || "",

            orcid: profile.orcid || "",

        });

        initialized.current = true;

    }, [profile]);

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

        setIsDirty(true);

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);

        const toastId = toast.loading(
            "Profil güncelleniyor..."
        );

        try {

            const { error } = await supabase

                .from("profiles")

                .update({

                    full_name: form.full_name.trim(),

                    username: form.username
                        .trim()
                        .toLowerCase(),

                    bio: form.bio.trim(),

                    country: form.country.trim(),

                    education_level: form.education_level,

                    field: form.field.trim(),

                    institution: form.institution.trim(),

                    website: form.website.trim(),

                    linkedin: form.linkedin.trim(),

                    orcid: form.orcid.trim(),

                    updated_at: new Date().toISOString(),

                })

                .eq("id", user.id);

            if (error) throw error;

            await refreshProfile();

            setIsDirty(false);

            toast.success(

                "Profil başarıyla güncellendi.",

                {

                    id: toastId,

                }

            );

        } catch (error) {

            console.error(error);

            toast.error(

                error.message ||

                "Profil güncellenemedi.",

                {

                    id: toastId,

                }

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <form
            className="edit-profile-form"
            onSubmit={handleSubmit}
        >

            <ProfileBasicSection

                form={form}

                onChange={handleChange}

            />

            <ProfileContactSection

                form={form}

                onChange={handleChange}

            />

            <Button

                type="submit"

                disabled={loading}

            >

                <Save size={18} />

                {

                    loading

                        ? "Kaydediliyor..."

                        : "Profili Kaydet"

                }

            </Button>

        </form>

    );

}

export default EditProfileForm;