import { useLazyQuery, useMutation } from "@apollo/client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { ADD_TICKET_CATEGORY } from "../../api/mutations";
import { CATEGORIES_QUERY } from "../../api/queries";
import { errorMessage } from "../../helpers/gql";
import Category from "../../models/Category";
import Ticket from "../../models/Ticket";

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
      getCategories({ variables: { first: 500 } });
    }
  }, [ticket?.categories]);

  useEffect(() => {
    if (selection) {
      addTicketCategory({
        variables: { categoryId: selection, ticketId: ticket.id },
      });
    }
  }, [selection]);

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
        options={data?.categories.edges
          .map((c: { node: Category }) => ({
            value: c.node.id,
            label: c.node.name,
          }))
          .filter(
            (c: any) => !ticket?.categories.map((cc) => cc.id).includes(c.value)
          )}
        placeholder="Add category"
        value={selection}
        onChange={setSelection}
        showSearch
        optionFilterProp="label"
        filterOption={(input, option: any) => {
          return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
      />
    </div>
  );
};

export default CategoryAdder;
