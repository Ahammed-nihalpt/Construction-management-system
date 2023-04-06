import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountTreeSharpIcon from "@mui/icons-material/AccountTreeSharp";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";

export const comapnySidebarData = [
  {
    title: "Home",
    link: "/company/home",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "Projects",
    link: "/company/projects",
    icon: <AccountTreeSharpIcon />,
  },
  {
    title: "Users",
    link: "/company/users",
    icon: <PeopleAltSharpIcon />,
  },
  {
    title: "Messages",
    link: "/company/chat",
    icon: <MessageSharpIcon />,
  },
  {
    title: "Payment ",
    link: "/company/payment",
    icon: <PaidSharpIcon />,
  },
  {
    title: "Reports",
    link: "/company/report",
    icon: <SummarizeSharpIcon />,
  },
];

export const userSidebarData = [
  {
    title: "Home",
    link: "/user/home",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "Projects",
    link: "/user/projects",
    icon: <AccountTreeSharpIcon />,
  },
  {
    title: "Messages",
    link: "/user/chat",
    icon: <MessageSharpIcon />,
  },
  {
    title: "Payment ",
    link: "/user/payment",
    icon: <PaidSharpIcon />,
  },
];

export const adminSideData = [
  {
    title: "Home",
    link: "/admin/home",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "Companies",
    link: "/admin/companies",
    icon: <AccountTreeSharpIcon />,
  },
];
