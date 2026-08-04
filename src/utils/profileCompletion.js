export function calculateProfileCompletion(profile) {

    if (!profile) return 0;

    const requiredFields = [

        profile.full_name,

        profile.username,

        profile.bio,

        profile.country,

        profile.education_level,

        profile.field,

    ];

    const completed = requiredFields.filter(

        (value) => value && String(value).trim() !== ""

    ).length;

    return Math.round(

        (completed / requiredFields.length) * 100

    );

}