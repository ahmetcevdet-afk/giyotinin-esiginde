import {
    Home,
    BookOpen,
    FolderOpen,
    Users,
    Info,

    LayoutDashboard,
    User,
    FileText,
    Bookmark,

} from "lucide-react";

/* ==========================================
   PLATFORM LINKS
========================================== */

export const platformLinks = [

    {
        title: "Ana Sayfa",
        to: "/",
        icon: Home,
    },

    {
        title: "Araştırmalar",
        to: "/articles",
        icon: BookOpen,
    },

    {
        title: "Kategoriler",
        to: "/categories",
        icon: FolderOpen,
    },

    {
        title: "Yazarlar",
        to: "/authors",
        icon: Users,
    },

    {
        title: "Hakkımızda",
        to: "/about",
        icon: Info,
    },

];

/* ==========================================
   ACCOUNT LINKS
========================================== */

export const accountLinks = [

    {
        title: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Profil",
        to: "/profile",
        icon: User,
    },

    {
        title: "Yazılarım",
        to: "/my-pages",
        icon: FileText,
    },

    {
        title: "Kaydedilenler",
        to: "/saved",
        icon: Bookmark,
    },

];