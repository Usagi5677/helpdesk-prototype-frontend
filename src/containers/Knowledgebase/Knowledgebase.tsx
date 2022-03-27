import { useContext, useEffect, useRef, useState } from "react";
import AddKnowledgebase from "../../components/Knowledgebase/AddKnowledgebase";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_KNOWLEDGEBASE } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import KnowledgebaseModel from "../../models/Knowledgebase";
import PaginationArgs from "../../models/PaginationArgs";
import { KNOWLEDGEBASE_PAGE_LIMIT } from "../../helpers/constants";
import { Spin } from "antd";
import Search from "../../components/common/Search";
import KnowledgebasePaginationButtons from "../../components/common/KnowledgebasePaginationButtons";
import KnowledgebaseCard from "../../components/Knowledgebase/KnowledgebaseCard";
import classes from "./Knowledgebase.module.css";
import SiteFilter from "../../components/common/SiteFilter";
import UserContext from "../../contexts/UserContext";
import { useIsSmallDevice } from "../../helpers/useIsSmallDevice";

const Knowledgebase = () => {
  const { user } = useContext(UserContext);

  const [page, setPage] = useState(1);
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");

  // Filter has an intersection type as it has PaginationArgs + other args
  const [filter, setFilter] = useState<
    PaginationArgs & {
      search: string;
      siteId: number | null;
    }
  >({
    first: KNOWLEDGEBASE_PAGE_LIMIT,
    search: "",
    siteId: null,
  });

  const [allKnowledgebase, { data, loading }] = useLazyQuery(
    GET_ALL_KNOWLEDGEBASE,
    {
      onError: (err) => {
        errorMessage(err, "Error loading knowledge base.");
      },
    }
  );

  // Fetch knowledgebases when component mounts or when the filter object changes
  useEffect(() => {
    allKnowledgebase({ variables: filter });
  }, [filter, allKnowledgebase]);

  // Debounce the search, meaning the search will only execute 500ms after the
  // last input. This prevents unnecessary API calls. useRef is used to prevent
  // this useEffect from running on the initial render (which would waste an API
  // call as well).
  const searchDebounced = (value: string) => {
    if (timerId) clearTimeout(timerId);
    setTimerId(
      //@ts-ignore
      setTimeout(
        () => setFilter((filter) => ({ ...filter, search: value })),
        500
      )
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
      first: KNOWLEDGEBASE_PAGE_LIMIT,
      after: pageInfo.endCursor,
      last: null,
      before: null,
    });
    setPage(page + 1);
  };

  const back = () => {
    setFilter({
      ...filter,
      last: KNOWLEDGEBASE_PAGE_LIMIT,
      before: pageInfo.startCursor,
      first: null,
      after: null,
    });
    setPage(page - 1);
  };

  const pageInfo = data?.getAllKnowledgebase.pageInfo ?? {};

  const isSmallDevice = useIsSmallDevice();

  const filterMargin = isSmallDevice ? ".5rem 0 0 0" : ".5rem 0 0 .5rem";

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "10px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
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
            onChange={(value) => {
              setFilter({ ...filter, siteId: value });
            }}
            allowClear={true}
            sites={user?.sites}
            margin={filterMargin}
          />
        </div>
        <div>
          <AddKnowledgebase />
        </div>
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "2rem auto" }} />
        </div>
      )}
      <div className={classes["knowledgebase-card-wrapper"]}>
        {data?.getAllKnowledgebase.edges.map(
          (rec: { node: KnowledgebaseModel }) => {
            const knowledgebase = rec.node;
            return (
              <KnowledgebaseCard
                knowledgebase={knowledgebase}
                key={knowledgebase.id}
              />
            );
          }
        )}
      </div>

      <KnowledgebasePaginationButtons
        pageInfo={pageInfo}
        page={page}
        next={next}
        back={back}
      />
    </div>
  );
};

export default Knowledgebase;
