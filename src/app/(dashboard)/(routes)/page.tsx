import { UserButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
export default async function Home() {
  const tasks = await db.task.findMany({
    where: {
      // title:{
      //   contains:"Two"
      // }
    },
  });
  return (
    <div>
      {/* <UserButton afterSignOutUrl="/"/> */}
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
