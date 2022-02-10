import classes from "./MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NewTicket from "../../components/Ticket/NewTicket";
import { useLazyQuery } from "@apollo/client";
import { MY_TICKETS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import TicketModel from "../../models/Ticket";
import PaginationArgs from "../../models/PaginationArgs";
import { PAGE_LIMIT } from "../../helpers/constants";
import { Button, Spin } from "antd";
import CategorySelector from "../../components/common/CategorySelector";
import Search from "../../components/common/Search";
import { Status } from "../../models/Enums";
import StatusSelector from "../../components/common/StatusSelector";
import PaginationButtons from "../../components/common/PaginationButtons";

const MyTickets = () => {
  const [page, setPage] = useState(1);
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");

  // Filter has an intersection type as it has PaginationArgs + other args
  const [filter, setFilter] = useState<
    PaginationArgs & {
      search: string;
      categoryIds: number[];
      status: Status | null;
    }
  >({
    first: PAGE_LIMIT,
    search: "",
    categoryIds: [],
    status: null,
  });

  const [getMyTickets, { data, loading }] = useLazyQuery(MY_TICKETS, {
    onError: (err) => {
      errorMessage(err, "Error loading tickets.");
    },
  });

  // Fetch tickets when component mounts or when the filter object changes
  useEffect(() => {
    getMyTickets({ variables: filter });
  }, [filter]);

  // Debounce the search, meaning the search will only execute 500ms after the
  // last input. This prevents unnecessary API calls. useRef is used to prevent
  // this useEffect from running on the initial render (which would waste an API
  // call as well).
  const initialRender = useRef<boolean>(true);
  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
      return;
    }
    searchDebounced(search);
  }, [search]);
  const searchDebounced = (value: string) => {
    if (timerId) clearTimeout(timerId);
    //@ts-ignore
    setTimerId(setTimeout(() => setFilter({ ...filter, search: value }), 500));
  };

  // Pagination functions
  const next = () => {
    setFilter({
      ...filter,
      first: PAGE_LIMIT,
      after: pageInfo.endCursor,
      last: null,
      before: null,
    });
    setPage(page + 1);
  };

  const back = () => {
    setFilter({
      ...filter,
      last: PAGE_LIMIT,
      before: pageInfo.startCursor,
      first: null,
      after: null,
    });
    setPage(page - 1);
  };

  const pageInfo = data?.myTickets.pageInfo ?? {};

  return (
    <div className={classes["my-tickets-container"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            searchValue={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearch("")}
          />
          <CategorySelector
            onChange={(categoryIds) => setFilter({ ...filter, categoryIds })}
            minWidth={179}
            marginLeft="1rem"
          />
          <StatusSelector
            onChange={(status) => setFilter({ ...filter, status })}
          />
        </div>
        <div>
          <NewTicket />
        </div>
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
        </div>
      )}
      {data?.myTickets.edges.map((rec: { node: TicketModel }) => {
        const ticket = rec.node;
        return (
          <Link to={"/ticket/" + ticket.id} key={ticket.id}>
            <Ticket ticket={ticket} />
          </Link>
        );
      })}
      <PaginationButtons
        pageInfo={pageInfo}
        page={page}
        next={next}
        back={back}
      />
    </div>
  );
};

export default MyTickets;
