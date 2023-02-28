import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity } from "react-native";
import TaskItem from "./TaskItem";
import { Task } from "../types/model/Task";
import { TaskListProps } from "../types/props/TaskListProps";

const TaskList = ({ tasks, completeTask }: TaskListProps) => {
  const renderItem = (itemData: ListRenderItemInfo<Task>) => {
    return (
      <TouchableOpacity key={itemData.index}>
        <TaskItem task={itemData.item} index={itemData.index} completeTask={completeTask} />
      </TouchableOpacity>
    );
  };

  return <FlatList data={tasks} renderItem={renderItem} style={styles.tasks} />;
};

const styles = StyleSheet.create({
  tasks: {
    marginTop: 30,
    marginBottom: 180,
  },
});

export default TaskList;
