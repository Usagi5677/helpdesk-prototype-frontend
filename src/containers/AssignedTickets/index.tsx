import classes from "../MyTickets/MyTickets.module.css";
import Ticket from "../../components/Ticket/Ticket";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ASSIGNED_TICKETS } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import TicketModel from "../../models/Ticket";
import PaginationArgs from "../../models/PaginationArgs";
import { PAGE_LIMIT } from "../../helpers/constants";
import { Spin } from "antd";
import CategorySelector from "../../components/common/CategorySelector";
import Search from "../../components/common/Search";
import StatusFilter from "../../components/common/StatusFilter";
import PaginationButtons from "../../components/common/PaginationButtons";
import DefaultPaginationArgs from "../../models/DefaultPaginationArgs";
import UserFilter from "../../components/common/UserFilter";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";
import SiteFilter from "../../components/common/SiteFilter";

const AssignedTickets = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();

  // Redirect to home if not an agent
  if (!user?.isAgent) {
    navigate("/");
  }

  const siteParamQuery = params.get("site");
  const siteParam = user?.siteAccess.adminOrAgent.find(
    (site) => site.code === siteParamQuery
  );

  // Filter has an intersection type as it has PaginationArgs + other args
  const [filter, setFilter] = useState<
    PaginationArgs & {
      search: string;
      categoryIds: number[];
      status: any;
      createdByUserId: string | null;
      siteId: number | null;
    }
  >({
    ...DefaultPaginationArgs,
    search: "",
    categoryIds: [],
    status: params.get("status"),
    createdByUserId: null,
    siteId: siteParam ? siteParam.id : null,
  });

  // Update url search param on filter change
  useEffect(() => {
    let newParams: any = {};
    const site = user?.siteAccess.adminOrAgent.find(
      (site) => site.id === filter.siteId
    );
    if (site) newParams.site = site.code;
    if (filter.status) newParams.status = filter.status;
    setParams(newParams);
  }, [filter, setParams, params, user]);

  const [getAssignedTickets, { data, loading }] = useLazyQuery(
    ASSIGNED_TICKETS,
    {
      onError: (err) => {
        errorMessage(err, "Error loading tickets.");
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    }
  );

  // Fetch tickets when component mounts or when the filter object changes
  useEffect(() => {
    getAssignedTickets({ variables: filter });
  }, [filter, getAssignedTickets]);

  // Debounce the search, meaning the search will only execute 500ms after the
  // last input. This prevents unnecessary API calls. useRef is used to prevent
  // this useEffect from running on the initial render (which would waste an API
  // call as well).
  const searchDebounced = (value: string) => {
    if (timerId) clearTimeout(timerId);
    setTimerId(
      //@ts-ignore
      setTimeout(() => {
        setFilter((filter) => ({
          ...filter,
          search: value,
          ...DefaultPaginationArgs,
        }));
        setPage(1);
      }, 500)
    );
  };
  const initialRender = useRef<boolean>(true);
  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
      return;
    }
    searchDebounced(search);
    // eslint-disable-next-line
  }, [search]);

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

  const pageInfo = data?.assignedTickets.pageInfo ?? {};

  const isSmallDevice = useIsSmallDevice();

  const filterMargin = isSmallDevice ? ".5rem 0 0 0" : ".5rem 0 0 .5rem";

  return (
    <div className={classes["my-tickets-container"]}>
      <div
        style={{
          display: "flex",
          flexDirection: isSmallDevice ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: isSmallDevice ? "space-around" : undefined,
            margin: "-.5rem 1rem 0 0",
          }}
        >
          <Search
            searchValue={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearch("")}
            margin={filterMargin}
          />
          <SiteFilter
            value={filter.siteId}
            onChange={(siteId) => {
              setFilter({ ...filter, siteId, ...DefaultPaginationArgs });
            }}
            allowClear={true}
            sites={user?.siteAccess.agent}
            margin={filterMargin}
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
            minWidth={179}
            margin={filterMargin}
          />
          <StatusFilter
            onChange={(status) => {
              setFilter({ ...filter, status, ...DefaultPaginationArgs });
              setPage(1);
            }}
            value={filter.status}
            margin={filterMargin}
          />
          <CategorySelector
            onChange={(categoryIds) => {
              setFilter({ ...filter, categoryIds, ...DefaultPaginationArgs });
              setPage(1);
            }}
            minWidth={179}
            margin={filterMargin}
          />
        </div>
      </div>
      {loading && (
        <div>
          <Spin size="large" style={{ width: "100%", margin: "100px auto" }} />
        </div>
      )}
      {data?.assignedTickets.edges.map((rec: { node: TicketModel }) => {
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

export default AssignedTickets;
