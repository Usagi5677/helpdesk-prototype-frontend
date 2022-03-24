import { useLazyQuery, useMutation } from "@apollo/client";
import { Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { ADD_TICKET_CATEGORY } from "../../api/mutations";
import { CATEGORIES_QUERY } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import { stringToColor } from "../../helpers/style";
import Category from "../../models/Category";
import Ticket from "../../models/Ticket";
import SiteWithIcon from "./SiteWithIcon";

const CategoryAdder = ({
  ticket,
}: {
  onChange?: (val: number[]) => void;
  ticket: Ticket;
}) => {
  const [selection, setSelection] = useState<number | null>(null);
  const [getCategories, { data, loading }] = useLazyQuery(CATEGORIES_QUERY);

  useEffect(() => {
    if (ticket?.categories) {
      getCategories({ variables: { first: 500, siteId: ticket.site.id } });
    }
  }, [ticket, getCategories]);

  const [addTicketCategory, { loading: loadingAddTicketCategory }] =
    useMutation(ADD_TICKET_CATEGORY, {
      onCompleted: () => {
        setSelection(null);
      },
      onError: (error) => {
        errorMessage(error, "Unexpected error while adding category.");
      },
      refetchQueries: ["ticket"],
    });

  useEffect(() => {
    if (selection) {
      addTicketCategory({
        variables: { categoryId: selection, ticketId: ticket.id },
      });
    }
  }, [selection, addTicketCategory, ticket]);

  const onPreventMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 20,
        padding: "1px 5px 1px 5px",
        alignItems: "center",
        width: 150,
      }}
    >
      <Select
        showArrow
        loading={loading || loadingAddTicketCategory}
        style={{ width: "100%" }}
        bordered={false}
        placeholder="Add category"
        value={selection}
        onChange={setSelection}
        showSearch
        optionFilterProp="label"
        filterOption={(input, option: any) => {
          return option.id.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      >
        {data?.categories.edges
          .filter(
            (c: { node: Category }) =>
              !ticket?.categories.map((cc) => cc.id).includes(c.node.id)
          )
          .map((c: { node: Category }) => (
            <Select.Option value={c.node.id} key={c.node.id} id={c.node.name}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: ".25rem" }}>
                  <SiteWithIcon site={c.node.site} small />
                </div>
                <Tag
                  color={stringToColor(c.node.name)}
                  onMouseDown={onPreventMouseDown}
                  style={{ marginRight: 3 }}
                >
                  {c.node.name}
                </Tag>
              </div>
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default CategoryAdder;
