import type { InferGetServerSidePropsType } from "next";

type User = {
  id: string;
  name: string;
};

export const getStaticProps = async () => {
  console.log("getServerSideProps");
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
    },
  ];

  return { props: { users } };
};

export default function Page({
  users,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log("Page");
  return (
    <main>
      <div>
        <h1>Users</h1>
        <div>
          {users.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
