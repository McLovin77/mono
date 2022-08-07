import { Typography } from "@mui/material";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { v4 as uuid } from "uuid";
import { Button } from "@mono/ui";

const Todos = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const itemsQuery = trpc.useQuery(["items.getItems"]);
  const addItemMutation = trpc.useMutation(["items.addItem"]);
  const deleteItemMutation = trpc.useMutation(["items.deleteItem"]);
  const authToken = localStorage.getItem("auth-token");

  if (!authToken)
    return (
      <>
        <Typography>Please sign in</Typography>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button
          onClick={() => {
            localStorage.setItem("auth-token", username);
            window.location.reload();
          }}
        >
          Sign in
        </button>
      </>
    );

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
                await itemsQuery.refetch();
                setTitle("");
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
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("auth-token");
          window.location.reload();
        }}
      >
        Sign out
      </button>
    </div>
  );
};
export default Todos;
