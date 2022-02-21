import {
    IconUserCheck,
    IconUserPlus,
    IconFileText,
    IconHome,
} from "@tabler/icons";

/* Sidebar - Link, Icon, Title */

const icons = {
    IconUserCheck,
    IconUserPlus,
    IconFileText,
    IconHome,
};

const utilities = {
    id: "utilities",
    title: "Utilities",
    type: "group",
    children: [
        {
            id: "default",
            title: "개요",
            type: "item",
            url: "",
            icon: icons.IconHome,
            breadcrumbs: false,
        },
        {
            id: "util-Wallet",
            title: "후보 등록",
            type: "item",
            url: "/addcandidate",
            icon: icons.IconUserPlus,
            breadcrumbs: false,
        },
        {
            id: "util-Block",
            title: "투표",
            type: "item",
            url: "/voting",
            icon: icons.IconUserCheck,
            breadcrumbs: false,
        },
        {
            id: "util-peer",
            title: "결과",
            type: "item",
            url: "/results",
            icon: icons.IconFileText,
            breadcrumbs: false,
        },
    ],
};

export default utilities;
