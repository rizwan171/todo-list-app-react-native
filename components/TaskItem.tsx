import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TaskItemProps } from "../types/props/TaskItemProps";

const TaskItem = ({ task, index, completeTask }: TaskItemProps) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.complete}>
        <TouchableOpacity style={styles.completeTouchable} onPress={() => completeTask(index)} />
        <Text style={styles.taskText}>{task.text}</Text>
      </View>
      <View style={styles.circle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#ffff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  complete: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  completeTouchable: {
    width: 24,
    height: 24,
    backgroundColor: "#55bcf6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  taskText: {
    maxWidth: "80%",
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: "#55bcf6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default TaskItem;
