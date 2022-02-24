import classes from "../MyTickets/MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ASSIGNED_TICKETS, FOLLOWING_TICKETS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import TicketModel from "../../models/Ticket";
import PaginationArgs from "../../models/PaginationArgs";
import { PAGE_LIMIT } from "../../helpers/constants";
import { Spin } from "antd";
import CategorySelector from "../../components/common/CategorySelector";
import Search from "../../components/common/Search";
import { Status } from "../../models/Enums";
import StatusFilter from "../../components/common/StatusFilter";
import PaginationButtons from "../../components/common/PaginationButtons";
import DefaultPaginationArgs from "../../models/DefaultPaginationArgs";
import UserFilter from "../../components/common/UserFilter";

const FollowingTickets = () => {
  const [page, setPage] = useState(1);
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");

  // Filter has an intersection type as it has PaginationArgs + other args
  const [filter, setFilter] = useState<
    PaginationArgs & {
      search: string;
      categoryIds: number[];
      status: Status | null;
      createdByUserId: string | null;
    }
  >({
    ...DefaultPaginationArgs,
    search: "",
    categoryIds: [],
    status: null,
    createdByUserId: null,
  });

  const [getFollowingTickets, { data, loading }] = useLazyQuery(
    FOLLOWING_TICKETS,
    {
      onError: (err) => {
        errorMessage(err, "Error loading tickets.");
      },
    }
  );

  // Fetch tickets when component mounts or when the filter object changes
  useEffect(() => {
    getFollowingTickets({ variables: filter });
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
    setTimerId(
      //@ts-ignore
      setTimeout(() => {
        setFilter({ ...filter, search: value, ...DefaultPaginationArgs });
        setPage(1);
      }, 500)
    );
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

  const pageInfo = data?.followingTickets.pageInfo ?? {};

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
          <UserFilter
            onChange={(val) => {
              setFilter({
                ...filter,
                createdByUserId: val ? val.userId : null,
                ...DefaultPaginationArgs,
              });
              setPage(1);
            }}
          />
          <CategorySelector
            onChange={(categoryIds) => {
              setFilter({ ...filter, categoryIds, ...DefaultPaginationArgs });
              setPage(1);
            }}
            minWidth={179}
            marginLeft="1rem"
          />
          <StatusFilter
            onChange={(status) => {
              setFilter({ ...filter, status, ...DefaultPaginationArgs });
              setPage(1);
            }}
          />
        </div>
      </div>
      {loading && (
        <div>
          <Spin size="large" style={{ width: "100%", margin: "100px auto" }} />
        </div>
      )}
      {data?.followingTickets.edges.map((rec: { node: TicketModel }) => {
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

export default FollowingTickets;
