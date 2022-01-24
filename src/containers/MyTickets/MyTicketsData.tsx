interface Ticket {
  icon: any;
  fullname: string;
  email: string;
  createdDate: string;
  ticketID: string;
  ticketTitle: string;
  titleDescription?: string;
  category: string;
  priority?: string;
  group?: string;
  agent?: string[];
  started?: string;
  status: string;
}

export const MyTicketData: Ticket[] = [
  {
    ticketID: "T01",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "Naishu@gmail.com",
    createdDate: "01/01/2022",
    ticketTitle: "Change password",
    category: "Problem",
    priority: "Medium",
    group: "Software",
    agent: ["Unassigned"],
    started: "01/01/2022",
    status: "open",
  },
  {
    ticketID: "T02",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "Naishu@gmail.com",
    createdDate: "01/01/2022",
    ticketTitle: "Change account",
    category: "Problem",
    priority: "High",
    group: "Software",
    agent: ["Unassigned"],
    started: "01/01/2022",
    status: "closed",
  },
  {
    ticketID: "T03",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "Naishu@gmail.com",
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
    ticketID: "T04",
    icon: "./avatar.jpg",
    fullname: "Ibrahimu naishu",
    email: "Naishu@gmail.com",
    createdDate: "01/01/2022",
    ticketTitle: "Change keyboard",
    category: "Problem",
    priority: "Low",
    group: "Software",
    agent: ["Unassigned"],
    started: "01/01/2022",
    status: "pending",
  },
];
