import { Typography } from "@mui/material";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { v4 as uuid } from "uuid";
import { Button } from "@mono/ui";

const Todos = () => {
  const [title, setTitle] = useState("");
  const itemsQuery = trpc.useQuery(["items.getItems"]);
  const addItemMutation = trpc.useMutation(["items.addItem"]);
  const deleteItemMutation = trpc.useMutation(["items.deleteItem"]);

  return (
    <div>
      <Typography gutterBottom>My todos</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItemMutation.mutate(
            {
              id: uuid(),
              title: title,
            },
            {
              onSuccess: async () => {
                setTitle("");
                await itemsQuery.refetch();
              },
            }
          );
        }}
      >
        <input
          title={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New item"
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
      <ul>
        {itemsQuery.data?.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              onClick={() =>
                deleteItemMutation.mutate(item.id, {
                  onSuccess: async () => {
                    await itemsQuery?.refetch();
                  },
                })
              }
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todos;
