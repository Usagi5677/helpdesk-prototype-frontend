interface Ticket {
  icon?: any;
  fullname: string;
  email: string;
  contactNumber: string;
  createdDate: string;
  ticketID: string;
  ticketTitle: string;
  ticketDescription?: string;
  category: string;
  priority?: string;
  group?: any[];
  agent?: any[];
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
    group: [
      { name: "Software", id: "G1" },
      { name: "BGroup", id: "G2"},
    ],
    agent: [
      { name: "Ibrahim Naish", id: "U1" },
      { name: "Ibrahim Naish", id: "U2"},
    ],
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
    group: [
      { name: "Software", id: "G3" },
      { name: "BGroup", id: "G4"},
      { name: "DGroup", id: "G5"}
    ],
    agent: [
      { name: "Ibrahim Naish1", id: "U3" },
      { name: "Ibrahim Naish2", id: "U4"},
      { name: "Ibrahim Naish3", id: "U3" },
      { name: "Ibrahim Naish4", id: "U4"},
     
    ],
    started: "01/01/2022",
    status: "closed",
  },
  {
    ticketID: "T3",
    
    fullname: "Ibrahimu naishu",
    email: "ibrahim.naish@mtcc.com.mv",
    contactNumber: "7777767",
    createdDate: "01/01/2022",
    ticketTitle: "Change mouse",
    category: "Problem",
    priority: "Low",
    group: [],
    agent: [],
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
    group: [
      { name: "EGroup", id: "G6"},
    ],
    agent: [
      { name: "Ibrahim Naish5", id: "U5"}
    ],
    started: "01/01/2022",
    status: "pending",
  },
];
