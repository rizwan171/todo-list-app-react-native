import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Task } from "./types/model/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./src/components/TaskList";

export default function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem("@tasks");
      if (tasksJson === null) {
        setTasks([]);
      } else {
        const tasks = JSON.parse(tasksJson);
        setTasks([...tasks]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (e) {
      console.log(e);
    }
    setTasks(tasks);
  };

  const saveTask = async (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    try {
      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
    } catch (e) {
      console.log(e);
    }
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    const newTask = {
      text: newTaskText,

      completed: false,
    };
    saveTask(newTask);
    setNewTaskText("");
  };

  const completeTask = (index: number) => {
    // TODO instead of removing task, update the completed property
    // TODO and also introduce a way to view completed tasks (maybe via side menu or filter button at the top right, maybe both)
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    updateTasks(updatedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks list</Text>
        <TaskList tasks={tasks} completeTask={completeTask} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={styles.newTaskWrapper}>
        <TextInput
          placeholder="Add a task"
          style={styles.newTaskInput}
          value={newTaskText}
          onChangeText={(text) => setNewTaskText(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addTaskContainer}>
            <Text style={styles.addTaskButton}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  newTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  newTaskInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addTaskContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addTaskButton: {},
});
