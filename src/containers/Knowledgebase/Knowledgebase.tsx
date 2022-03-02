import { useEffect, useRef, useState } from "react";
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

const Knowledgebase = () => {
  const [page, setPage] = useState(1);
  const [timerId, setTimerId] = useState(null);
  const [search, setSearch] = useState("");

  // Filter has an intersection type as it has PaginationArgs + other args
  const [filter, setFilter] = useState<
    PaginationArgs & {
      search: string;
    }
  >({
    first: KNOWLEDGEBASE_PAGE_LIMIT,
    search: "",
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

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "20px",
      }}
    >
      <div className={classes["knowledgebase-options-wrapper"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            searchValue={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearch("")}
          />
        </div>
        <div>
          <AddKnowledgebase />
        </div>
      </div>
      {loading && (
        <div>
          <Spin style={{ width: "100%", margin: "0 auto" }} />
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
