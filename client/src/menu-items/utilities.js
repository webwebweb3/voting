import {
    IconUserCheck,
    IconUserPlus,
    IconFileText,
    IconHome,
    IconWallet,
} from "@tabler/icons";

/* Sidebar - Link, Icon, Title */

const icons = {
    IconUserCheck,
    IconUserPlus,
    IconFileText,
    IconHome,
    IconWallet,
};

const utilities = {
    id: "utilities",
    title: "Utilities",
    type: "group",
    children: [
        {
            id: "util-AddCandidate",
            title: "후보 등록",
            type: "item",
            url: "",
            icon: icons.IconUserPlus,
            breadcrumbs: false,
        },
        {
            id: "util-Voting",
            title: "투표",
            type: "item",
            url: "/voting",
            icon: icons.IconUserCheck,
            breadcrumbs: false,
        },
        {
            id: "util-Results",
            title: "결과",
            type: "item",
            url: "/results",
            icon: icons.IconFileText,
            breadcrumbs: false,
        },
        {
            id: "util-Test",
            title: "실험!",
            type: "item",
            url: "/test",
            icon: icons.IconWallet,
            breadcrumbs: false,
        },
    ],
};

export default utilities;
