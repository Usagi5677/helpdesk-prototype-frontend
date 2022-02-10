interface Ticket {
  icon?: any;
  fullname: string;
  email: string;
  contactNumber: string;
  createdDate: string;
  ticketID: string;
  ticketTitle: string;
  ticketDescription?: string;
  category?: any[];
  priority?: string;
  //group?: any[];
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
    category: [{ id: "C1", name: "ProblemOne" }],
    priority: "Medium",
    /*
    group: [
      {
        id: "G1",
        name: "Software",
        agents: [
          { id: "U1", name: "Ibrahim Naish" },
          { id: "U2", name: "Ibrahim Naishu" },
        ],
      },
      { id: "G2", name: "BGroup" },
    ],
    */
    agent: [
      { id: "U1", name: "Ibrahim Naish1" },
      { id: "U2", name: "Ibrahim Naish2" },
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
    category: [{ id: "C2", name: "ProblemTwo" }],
    priority: "High",
    /*
    group: [
      { id: "G3", name: "Software" },
      { id: "G4", name: "BGroup" },
      { id: "G5", name: "DGroup" },
    ],
    */
    agent: [
      { id: "U3", name: "Ibrahim Naish3" },
      { id: "U4", name: "Ibrahim Naish4" },
      { id: "U5", name: "Ibrahim Naish5" },
      { id: "U6", name: "Ibrahim Naish6" },
      { id: "U8", name: "Ibrahim Naish8" },
      { id: "U9", name: "Ibrahim Naish9" },
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
    category: [],
    priority: "Low",
    /*
    group: [],
    */
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
    category: [],
    priority: "Low",
    /*
    group: [{ id: "G6", name: "EGroup" }],
    */
    agent: [{ id: "U7", name: "Ibrahim Naish7" }],
    started: "01/01/2022",
    status: "pending",
  },
];
