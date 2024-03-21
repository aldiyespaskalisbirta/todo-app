import axios from "axios";
import { Task } from "./task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type TODO = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

const fetchTask = async () => {
  try {
    const res = await axios.get(`${process.env.DEV_APP_DOMAIN}/api/task`);
    return res.data;
  } catch (err) {
    console.log("[AXIOS-ERROR] ", err);
  }
};

export default async function Home() {
  const allTask: TODO[] = await fetchTask();
  console.log("[ALL TASKS] ", allTask);
  return (
    <main className="flex items-center justify-center h-full flex-col">
      <div className="w-1/3 p-4">
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <Task />
        </div>
        <div className="bg-gray-100 w-full">
          <ScrollArea className="h-72 full rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                ALL TASK
              </h4>
              {allTask.map((todo, i) => (
                <>
                  <ul
                    key={todo.id}
                    className="text-sm bg-gray-200 p-2 rounded-md"
                  >
                    <li className="flex w-full justify-between">
                      <p>{i + 1}</p>
                      <h1>{todo.title}</h1>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
