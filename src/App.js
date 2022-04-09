import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const transformTask = (data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://react-tasks-tracker-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTask
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); //? functions are objects in JavaScript. And every time a function is recreated even if it contains the same logic, it's a brand new object in memory and therefore "useEffect" would treat it as a new value, even if it's technically the same function and it would re execute it.So to avoid this, we should go to "useHttp" and wrap "sendRequest" with use "callback()"

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
