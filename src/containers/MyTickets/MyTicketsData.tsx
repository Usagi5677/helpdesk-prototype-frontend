interface Ticket {
  icon: any;
  fullname: string;
  email: string;
  contactNumber: string;
  createdDate: string;
  ticketID: string;
  ticketTitle: string;
  ticketDescription?: string;
  category: string;
  priority?: string;
  group?: string;
  agent?: string[];
  started?: string;
  status: string;
}

export const MyTicketData: Ticket[] = [
  {
    ticketID: "T1",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "ibrahim.naish@mtcc.com.mv",
    contactNumber: "7777767",
    createdDate: "01/01/2022",
    ticketTitle: "Change password",
    category: "Problem",
    priority: "Medium",
    group: "Software",
    agent: ["Ibrahim Naish", "Ibrahim Naish"],
    started: "01/01/2022",
    status: "open",
  },
  {
    ticketID: "T2",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "ibrahim.naish@mtcc.com.mv",
    contactNumber: "7777767",
    createdDate: "01/01/2022",
    ticketTitle: "Change account",
    category: "Problem",
    priority: "High",
    group: "Software",
    agent: ["Ibrahim Naish", "Ibrahim Naish" , "Ibrahim Naish" , "Ibrahim Naish", "Ibrahim Naish"],
    started: "01/01/2022",
    status: "closed",
  },
  {
    ticketID: "T3",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "ibrahim.naish@mtcc.com.mv",
    contactNumber: "7777767",
    createdDate: "01/01/2022",
    ticketTitle: "Change mouse",
    category: "Problem",
    priority: "Low",
    group: "Software",
    agent: ["Unassigned"],
    started: "01/01/2022",
    status: "solved",
  },
  {
    ticketID: "T4",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "naish@mtcc.com.mv",
    contactNumber: "7777767",
    createdDate: "01/01/2022",
    ticketTitle: "Change keyboard",
    category: "Problem",
    priority: "Low",
    group: "Software",
    agent: ["Ibrahim Naish"],
    started: "01/01/2022",
    status: "pending",
  },
];
