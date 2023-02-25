import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import TaskItem from "./components/TaskItem";
import { useState } from "react";
import { Task } from "./types/model/Task";

export default function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    const newTask = {
      text: newTaskText,

      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const completeTask = (index: number) => {
    // TODO instead of removing task, update the completed property
    // TODO and also introduce a way to view completed tasks (maybe via side menu or filter button at the top right, maybe both)
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tasks list</Text>
        <View style={styles.tasks}>
          {tasks.map((task, index) => {
            return (
              // TODO update this to complete when the square icon on left is pressed instead of whole thing
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <TaskItem task={task} />
              </TouchableOpacity>
            );
          })}
        </View>
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
  tasks: {
    marginTop: 30,
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
